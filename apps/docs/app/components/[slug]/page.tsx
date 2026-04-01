import { notFound } from 'next/navigation'
import { Icon } from '@ds/ui'
import { componentDocs } from '@/lib/docs'
import { PreviewSection } from '@/components/PreviewSection'
import { PropsTable } from '@/components/PropsTable'
import { TokensTable } from '@/components/TokensTable'
import { CodeBlock } from '@/components/CodeBlock'

export function generateStaticParams() {
  return Object.keys(componentDocs).map((slug) => ({ slug }))
}

export default async function ComponentPage({ params }: { params: { slug: string } }) {
  const doc = componentDocs[params.slug]
  if (!doc) notFound()

  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">{doc.title}</h1>
      <p className="text-(--color-text-secondary) text-lg mb-10">{doc.description}</p>

      {/* 1. Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Overview</h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-(--color-text-secondary) uppercase tracking-wide mb-2">
              When to use
            </h3>
            <ul className="space-y-1.5">
              {doc.whenToUse.map((item, i) => (
                <li key={i} className="text-sm text-(--color-text-primary) flex gap-2">
                  <Icon name="check" size={16} className="text-(--color-success) shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-(--color-text-secondary) uppercase tracking-wide mb-2">
              When not to use
            </h3>
            <ul className="space-y-1.5">
              {doc.whenNotToUse.map((item, i) => (
                <li key={i} className="text-sm text-(--color-text-primary) flex gap-2">
                  <Icon name="close" size={16} className="text-(--color-danger) shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 2 & 3. Live Preview + Variants (client component — renders interactive previews) */}
      <PreviewSection slug={params.slug} />

      {/* 4. Code */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Code</h2>
        <CodeBlock code={doc.usage} />
      </section>

      {/* 5. Props */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Props</h2>
        <PropsTable props={doc.props} />
      </section>

      {/* 6. Tokens */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Tokens</h2>
        <TokensTable tokens={doc.tokens} />
      </section>
    </div>
  )
}
