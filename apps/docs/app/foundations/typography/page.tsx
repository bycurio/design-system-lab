const typeScale = [
  { token: '--text-xs', size: '12px', usage: 'Captions, labels' },
  { token: '--text-sm', size: '14px', usage: 'Body small, helper text' },
  { token: '--text-base', size: '16px', usage: 'Body default' },
  { token: '--text-lg', size: '18px', usage: 'Body large, intro text' },
  { token: '--text-xl', size: '20px', usage: 'Section headings' },
  { token: '--text-2xl', size: '24px', usage: 'Page headings (h2)' },
  { token: '--text-3xl', size: '30px', usage: 'Page titles (h1)' },
  { token: '--text-4xl', size: '36px', usage: 'Display headings' },
]

export default function TypographyPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Typography</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Inter for UI text, JetBrains Mono for code. Sizes from{' '}
        <code className="font-mono text-sm text-(--color-brand)">--text-xs</code> (12px) to{' '}
        <code className="font-mono text-sm text-(--color-brand)">--text-4xl</code> (36px).
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Type scale</h2>
        <div className="space-y-4 border border-(--color-border) rounded-(--radius-lg) overflow-hidden">
          {typeScale.map(({ token, size, usage }) => (
            <div
              key={token}
              className="flex items-baseline gap-6 px-6 py-4 border-b border-(--color-border) last:border-b-0"
            >
              <div style={{ fontSize: `var(${token})` }} className="text-(--color-text-primary) font-sans leading-none w-48 shrink-0">
                The quick brown fox
              </div>
              <div>
                <p className="font-mono text-xs text-(--color-brand)">{token}</p>
                <p className="text-xs text-(--color-text-secondary)">{size} — {usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Fonts</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-(--color-border) rounded-(--radius-lg)">
            <p className="text-xs font-semibold text-(--color-text-secondary) mb-2">--font-sans</p>
            <p className="font-sans text-lg text-(--color-text-primary)">Inter</p>
            <p className="font-sans text-sm text-(--color-text-secondary)">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p className="font-sans text-sm text-(--color-text-secondary)">abcdefghijklmnopqrstuvwxyz</p>
            <p className="font-sans text-sm text-(--color-text-secondary)">0123456789</p>
          </div>
          <div className="p-4 border border-(--color-border) rounded-(--radius-lg)">
            <p className="text-xs font-semibold text-(--color-text-secondary) mb-2">--font-mono</p>
            <p className="font-mono text-lg text-(--color-text-primary)">JetBrains Mono</p>
            <p className="font-mono text-sm text-(--color-text-secondary)">const x = 42</p>
            <p className="font-mono text-sm text-(--color-text-secondary)">{'<Button variant="primary" />'}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
