import { Icon } from '@ds/ui'

export default function IntroductionPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-4">Introduction</h1>
      <p className="text-(--color-text-secondary) text-lg mb-8">
        Design System Lab is a production-grade component library with 1:1 parity between Figma and code,
        connected via Figma Code Connect.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">What&apos;s included</h2>
        <ul className="space-y-2 text-(--color-text-primary)">
          <li className="flex gap-2"><Icon name="check" size={16} className="text-(--color-success) shrink-0 mt-1" /> 40 production-ready React components</li>
          <li className="flex gap-2"><Icon name="check" size={16} className="text-(--color-success) shrink-0 mt-1" /> Tailwind v4 semantic token system (light + dark)</li>
          <li className="flex gap-2"><Icon name="check" size={16} className="text-(--color-success) shrink-0 mt-1" /> Figma Variables mirroring every code token</li>
          <li className="flex gap-2"><Icon name="check" size={16} className="text-(--color-success) shrink-0 mt-1" /> Code Connect — real snippets in Figma Dev Mode</li>
          <li className="flex gap-2"><Icon name="check" size={16} className="text-(--color-success) shrink-0 mt-1" /> TypeScript prop types for every component</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">Design principles</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: 'Code is source of truth', desc: 'Figma mirrors code — never the other way around.' },
            { title: 'Semantic tokens', desc: 'Components reference semantic tokens, not primitive values.' },
            { title: 'Clean & Professional', desc: '4px radius on controls, pill only on badges and chips.' },
            { title: 'Light + Dark', desc: 'Every token maps to both modes. Toggle at the top of the sidebar.' },
          ].map((p) => (
            <div key={p.title} className="p-4 rounded-(--radius-lg) border border-(--color-border) bg-(--color-surface)">
              <h3 className="font-semibold text-(--color-text-primary) mb-1">{p.title}</h3>
              <p className="text-sm text-(--color-text-secondary)">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
