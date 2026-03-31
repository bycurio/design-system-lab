export function ComponentPreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-(--radius-lg) border border-(--color-border) overflow-hidden">
      <div className="p-8 flex flex-wrap items-center justify-center gap-4 bg-(--color-bg) min-h-32">
        {children}
      </div>
    </div>
  )
}
