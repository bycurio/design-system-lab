const primitiveScales = [
  { name: 'Blue', prefix: 'blue', shades: ['50','100','200','300','400','500','600','700','800','900'] },
  { name: 'Slate', prefix: 'slate', shades: ['50','100','200','300','400','500','600','700','800','900','950'] },
  { name: 'Green', prefix: 'green', shades: ['50','100','200','300','400','500','600','700','800','900'] },
  { name: 'Red', prefix: 'red', shades: ['50','100','200','300','400','500','600','700','800','900'] },
  { name: 'Amber', prefix: 'amber', shades: ['50','100','200','300','400','500','600','700','800','900'] },
  { name: 'Sky', prefix: 'sky', shades: ['50','100','200','300','400','500','600','700','800','900'] },
]

const semanticTokens = [
  { token: '--color-bg', description: 'Page background' },
  { token: '--color-surface', description: 'Card / sidebar background' },
  { token: '--color-brand', description: 'Primary brand (interactive)' },
  { token: '--color-text-primary', description: 'Primary text' },
  { token: '--color-text-secondary', description: 'Muted / helper text' },
  { token: '--color-border', description: 'Default border' },
  { token: '--color-danger', description: 'Destructive actions & errors' },
  { token: '--color-success', description: 'Positive feedback' },
  { token: '--color-warning', description: 'Caution feedback' },
  { token: '--color-info', description: 'Informational feedback' },
]

export default function ColorsPage() {
  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Colors</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Three-tier token system: Primitives (raw palette) → Semantic (intent) → Component (scoped).
        Always use semantic tokens in components.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Semantic tokens</h2>
        <div className="grid grid-cols-2 gap-3">
          {semanticTokens.map(({ token, description }) => (
            <div key={token} className="flex items-center gap-3 p-3 rounded-(--radius-md) border border-(--color-border)">
              <div
                style={{ backgroundColor: `var(${token})`, border: '1px solid var(--color-border)' }}
                className="w-10 h-10 rounded-(--radius-md) shrink-0"
              />
              <div>
                <p className="font-mono text-xs text-(--color-brand)">{token}</p>
                <p className="text-xs text-(--color-text-secondary)">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Primitive palette</h2>
        <div className="space-y-6">
          {primitiveScales.map(({ name, prefix, shades }) => (
            <div key={prefix}>
              <p className="text-sm font-semibold text-(--color-text-secondary) mb-2">{name}</p>
              <div className="flex gap-1">
                {shades.map((shade) => (
                  <div key={shade} className="flex flex-col items-center gap-1">
                    <div
                      style={{ backgroundColor: `var(--color-${prefix}-${shade})` }}
                      className="w-9 h-9 rounded-(--radius-sm)"
                    />
                    <span className="text-[10px] text-(--color-text-secondary)">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
