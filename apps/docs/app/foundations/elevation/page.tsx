const elevationLevels = [
  { name: 'Level 0', token: '--shadow-none', shadow: 'none', usage: 'Flat cards, no depth' },
  { name: 'Level 1', token: '--shadow-sm', shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', usage: 'Dropdown headers, subtle cards' },
  { name: 'Level 2', token: '--shadow-md', shadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', usage: 'Cards, popovers' },
  { name: 'Level 3', token: '--shadow-lg', shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', usage: 'Modals, drawers' },
  { name: 'Level 4', token: '--shadow-xl', shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', usage: 'Full-screen overlays' },
]

export default function ElevationPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Elevation</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Five shadow levels. Use higher elevation for content that appears above the page (modals, tooltips).
      </p>

      <section className="mb-10">
        <div className="grid grid-cols-1 gap-6">
          {elevationLevels.map(({ name, token, shadow, usage }) => (
            <div key={token} className="flex items-center gap-6">
              <div
                style={{ boxShadow: shadow }}
                className="w-24 h-16 rounded-(--radius-lg) bg-(--color-bg) border border-(--color-border) shrink-0"
              />
              <div>
                <p className="font-semibold text-(--color-text-primary)">{name}</p>
                <p className="font-mono text-xs text-(--color-brand) mb-1">{token}</p>
                <p className="text-sm text-(--color-text-secondary)">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
