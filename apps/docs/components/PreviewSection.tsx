'use client'
import { componentDocs } from '@/lib/docs'
import { ComponentPreview } from './ComponentPreview'

export function PreviewSection({ slug }: { slug: string }) {
  const doc = componentDocs[slug]
  if (!doc) return null

  const Preview = doc.preview as React.ComponentType

  return (
    <>
      {/* Live Preview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Live Preview</h2>
        <ComponentPreview>
          <Preview />
        </ComponentPreview>
      </section>

      {/* Variants */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Variants</h2>
        <div className="space-y-4">
          {doc.variants.map((variant) => {
            const VariantPreview = variant.preview as React.ComponentType
            return (
              <div
                key={variant.label}
                className="border border-(--color-border) rounded-(--radius-lg) overflow-hidden"
              >
                <div className="px-4 py-2 bg-(--color-surface) border-b border-(--color-border)">
                  <span className="text-sm font-medium text-(--color-text-secondary)">{variant.label}</span>
                </div>
                <div className="p-6 flex flex-wrap gap-4 items-center bg-(--color-bg)">
                  <VariantPreview />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
