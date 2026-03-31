const spacingScale = [
  { token: '--size-1', px: '4px' },
  { token: '--size-2', px: '8px' },
  { token: '--size-3', px: '12px' },
  { token: '--size-4', px: '16px' },
  { token: '--size-5', px: '20px' },
  { token: '--size-6', px: '24px' },
  { token: '--size-8', px: '32px' },
  { token: '--size-10', px: '40px' },
  { token: '--size-12', px: '48px' },
  { token: '--size-16', px: '64px' },
]

export default function SpacingPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Spacing</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Base-4 rem scale. Use <code className="font-mono text-sm text-(--color-brand)">--size-*</code> tokens
        for padding, margin, and gap. Never use raw pixel values in components.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Spacing scale</h2>
        <div className="space-y-3">
          {spacingScale.map(({ token, px }) => (
            <div key={token} className="flex items-center gap-4">
              <div className="w-32 shrink-0">
                <p className="font-mono text-xs text-(--color-brand)">{token}</p>
                <p className="text-xs text-(--color-text-secondary)">{px}</p>
              </div>
              <div
                style={{ width: `var(${token})`, height: '24px' }}
                className="bg-(--color-brand) rounded-sm shrink-0"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
