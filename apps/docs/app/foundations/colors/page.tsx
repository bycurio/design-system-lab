// Shades that are actually defined in tailwind.css — gaps intentional (design palette subset)
const primitiveScales = [
  { name: 'Slate',  prefix: 'slate',  shades: ['50','100','150','200','300','400','500','600','700','750','800','850','900','950'] },
  { name: 'Blue',   prefix: 'blue',   shades: ['50','100','200','300','400','500','600','700','800','900'] },
  { name: 'Green',  prefix: 'green',  shades: ['50','100','200','500','600','700','900'] },
  { name: 'Red',    prefix: 'red',    shades: ['50','100','200','400','500','600','700','800','900'] },
  { name: 'Amber',  prefix: 'amber',  shades: ['50','100','200','500','600','700','900'] },
  { name: 'Sky',    prefix: 'sky',    shades: ['50','100','200','500','600','700','900'] },
]

const alphaTokens = [
  { token: '--color-black-a6',  label: 'black / 6%',  bg: '#94a3b8' },
  { token: '--color-black-a12', label: 'black / 12%', bg: '#94a3b8' },
  { token: '--color-white-a8',  label: 'white / 8%',  bg: '#475569' },
  { token: '--color-white-a15', label: 'white / 15%', bg: '#475569' },
]

const surfaceGroups = [
  {
    label: 'Page canvas',
    usage: 'The absolute base layer. Full-bleed page backgrounds, app shell body.',
    tokens: [
      { token: '--color-bg', label: 'bg' },
    ],
  },
  {
    label: 'Inset surface',
    usage: 'Recessed areas built into the layout. Sidebars, table row stripes, code blocks, section backgrounds. Never casts a shadow.',
    tokens: [
      { token: '--color-surface',         label: 'surface' },
      { token: '--color-surface-hover',   label: 'surface / hover' },
      { token: '--color-surface-pressed', label: 'surface / pressed' },
    ],
  },
  {
    label: 'Raised surface',
    usage: 'Elevated panels that float above the canvas. Cards, modals, drawers, popovers, dropdowns. Always paired with a shadow or border.',
    tokens: [
      { token: '--color-surface-raised',         label: 'surface-raised' },
      { token: '--color-surface-raised-hover',   label: 'surface-raised / hover' },
      { token: '--color-surface-raised-pressed', label: 'surface-raised / pressed' },
    ],
  },
]

const semanticGroups = [
  {
    label: 'Brand',
    tokens: [
      { token: '--color-brand',         label: 'brand' },
      { token: '--color-brand-hover',   label: 'brand / hover' },
      { token: '--color-brand-pressed', label: 'brand / pressed' },
    ],
  },
  {
    label: 'Danger',
    tokens: [
      { token: '--color-danger',         label: 'danger' },
      { token: '--color-danger-hover',   label: 'danger / hover' },
      { token: '--color-danger-pressed', label: 'danger / pressed' },
    ],
  },
  {
    label: 'Status',
    tokens: [
      { token: '--color-success', label: 'success' },
      { token: '--color-warning', label: 'warning' },
      { token: '--color-info',    label: 'info' },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { token: '--color-text-primary',   label: 'text / primary' },
      { token: '--color-text-secondary', label: 'text / secondary' },
      { token: '--color-text-inverse',   label: 'text / inverse' },
    ],
  },
  {
    label: 'Border',
    tokens: [
      { token: '--color-border', label: 'border' },
    ],
  },
]

function Swatch({ token, size = 'md' }: { token: string; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
  return (
    <div
      style={{ backgroundColor: `var(${token})` }}
      className={`${dim} rounded-(--radius-md) border border-(--color-border) shrink-0`}
    />
  )
}

function TokenRow({ token, label }: { token: string; label: string }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-(--color-border) last:border-0">
      <Swatch token={token} />
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-(--color-brand)">{token}</p>
        <p className="text-xs text-(--color-text-secondary) mt-0.5">{label}</p>
      </div>
    </div>
  )
}

export default function ColorsPage() {
  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Colors</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Three-tier token system: <strong className="text-(--color-text-primary)">Primitives</strong> (raw palette values) →{' '}
        <strong className="text-(--color-text-primary)">Semantic</strong> (intent, responds to light/dark mode) →{' '}
        <strong className="text-(--color-text-primary)">Component</strong> (scoped overrides).
        Always use semantic tokens in components, never primitives directly.
      </p>

      {/* ── PRIMITIVES ─────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-1">Primitives</h2>
        <p className="text-sm text-(--color-text-secondary) mb-6">
          Raw named values — the palette these tokens draw from. Not all shades are included; only those used by semantic tokens are defined.
        </p>

        <div className="space-y-6">
          {primitiveScales.map(({ name, prefix, shades }) => (
            <div key={prefix}>
              <p className="text-sm font-medium text-(--color-text-primary) mb-2">{name}</p>
              <div className="flex flex-wrap gap-1">
                {shades.map((shade) => (
                  <div key={shade} className="flex flex-col items-center gap-1">
                    <div
                      style={{ backgroundColor: `var(--color-${prefix}-${shade})` }}
                      className="w-9 h-9 rounded-(--radius-sm) border border-(--color-border)"
                    />
                    <span className="text-[10px] text-(--color-text-secondary)">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="text-sm font-medium text-(--color-text-primary) mb-2">Alpha</p>
            <p className="text-xs text-(--color-text-secondary) mb-3">
              Transparency primitives used for surface-agnostic hover and pressed overlays. Shown against a mid-tone background to illustrate opacity.
            </p>
            <div className="flex flex-wrap gap-3">
              {alphaTokens.map(({ token, label, bg }) => (
                <div key={token} className="flex flex-col items-center gap-1">
                  <div style={{ backgroundColor: bg }} className="w-9 h-9 rounded-(--radius-sm) border border-(--color-border) relative overflow-hidden">
                    <div style={{ backgroundColor: `var(${token})` }} className="absolute inset-0" />
                  </div>
                  <span className="text-[10px] text-(--color-text-secondary) text-center max-w-[40px] leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEMANTIC: SURFACES ─────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-1">Semantic — Surfaces</h2>
        <p className="text-sm text-(--color-text-secondary) mb-6">
          Three elevation layers. In light mode, raised surfaces are brighter (white); in dark mode they are lighter (less dark).
          The rule: does it cast a shadow? No → bg or surface. Yes → surface-raised.
        </p>

        <div className="space-y-6">
          {surfaceGroups.map(({ label, usage, tokens }) => (
            <div key={label} className="rounded-(--radius-lg) border border-(--color-border) overflow-hidden">
              <div className="px-4 py-3 bg-(--color-surface) border-b border-(--color-border)">
                <p className="text-sm font-semibold text-(--color-text-primary)">{label}</p>
                <p className="text-xs text-(--color-text-secondary) mt-0.5">{usage}</p>
              </div>
              <div className="px-4 divide-y divide-(--color-border)">
                {tokens.map(({ token, label: tLabel }) => (
                  <TokenRow key={token} token={token} label={tLabel} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEMANTIC: OTHER GROUPS ─────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-1">Semantic — Other</h2>
        <p className="text-sm text-(--color-text-secondary) mb-6">
          Brand, status, text, and border tokens. All respond to light/dark mode automatically.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {semanticGroups.map(({ label, tokens }) => (
            <div key={label} className="rounded-(--radius-lg) border border-(--color-border) overflow-hidden">
              <div className="px-4 py-2.5 bg-(--color-surface) border-b border-(--color-border)">
                <p className="text-sm font-semibold text-(--color-text-primary)">{label}</p>
              </div>
              <div className="px-4 divide-y divide-(--color-border)">
                {tokens.map(({ token, label: tLabel }) => (
                  <TokenRow key={token} token={token} label={tLabel} />
                ))}
              </div>
            </div>
          ))}

          {/* Interaction tokens — alpha overlays need special display */}
          <div className="rounded-(--radius-lg) border border-(--color-border) overflow-hidden">
            <div className="px-4 py-2.5 bg-(--color-surface) border-b border-(--color-border)">
              <p className="text-sm font-semibold text-(--color-text-primary)">Interaction</p>
            </div>
            <div className="px-4 divide-y divide-(--color-border)">
              {[
                { token: '--color-interaction-hover',   label: 'interaction / hover',   bg: '#94a3b8' },
                { token: '--color-interaction-pressed', label: 'interaction / pressed',  bg: '#94a3b8' },
              ].map(({ token, label, bg }) => (
                <div key={token} className="flex items-center gap-3 py-2.5 border-b border-(--color-border) last:border-0">
                  <div style={{ backgroundColor: bg }} className="w-10 h-10 rounded-(--radius-md) border border-(--color-border) shrink-0 relative overflow-hidden">
                    <div style={{ backgroundColor: `var(${token})` }} className="absolute inset-0" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-(--color-brand)">{token}</p>
                    <p className="text-xs text-(--color-text-secondary) mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
