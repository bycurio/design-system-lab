#!/usr/bin/env node
/**
 * Syncs primitive color tokens from packages/tokens/tailwind.css
 * to the "Primitives" variable collection in Figma.
 *
 * Requires: FIGMA_ACCESS_TOKEN env var
 */
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const FILE_KEY = 'ITyTagLQEj5b75iqsmPyl6'
const TOKEN = process.env.FIGMA_ACCESS_TOKEN
if (!TOKEN) throw new Error('FIGMA_ACCESS_TOKEN is not set')

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const css = readFileSync(join(root, 'packages/tokens/tailwind.css'), 'utf8')

// Extract only vars with literal hex values (primitives — not semantic var() references)
function parsePrimitiveColors(css) {
  const result = {}
  const re = /--color-([\w-]+):\s*(#[0-9a-fA-F]{6})\b/g
  let m
  while ((m = re.exec(css)) !== null) {
    // Convert "blue-600" → "blue/600", "white" → "white"
    const figmaName = m[1].replace(/-(\d+)$/, '/$1')
    result[figmaName] = m[2]
  }
  return result
}

function hexToRgba(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255,
    a: 1,
  }
}

async function figmaGet(path) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { 'X-Figma-Token': TOKEN },
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

async function figmaPost(path, body) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    method: 'POST',
    headers: { 'X-Figma-Token': TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

const primitives = parsePrimitiveColors(css)
console.log(`Parsed ${Object.keys(primitives).length} primitive color tokens from tailwind.css`)

const { meta } = await figmaGet(`/files/${FILE_KEY}/variables/local`)
const { variables, variableCollections } = meta

const primCollection = Object.values(variableCollections).find(c => c.name === 'Primitives')
if (!primCollection) throw new Error('Primitives collection not found in Figma — was it renamed?')

const modeId = primCollection.modes[0].modeId

const variableModeValues = []
for (const variable of Object.values(variables)) {
  if (variable.variableCollectionId !== primCollection.id) continue
  const hex = primitives[variable.name]
  if (!hex) {
    console.warn(`  skipped: no CSS token for Figma variable "${variable.name}"`)
    continue
  }
  variableModeValues.push({ variableId: variable.id, modeId, value: hexToRgba(hex) })
}

console.log(`Updating ${variableModeValues.length} variables in Figma...`)
await figmaPost(`/files/${FILE_KEY}/variables`, {
  variableCollections: [],
  variableModes: [],
  variables: [],
  variableModeValues,
})

console.log('Token sync complete.')
