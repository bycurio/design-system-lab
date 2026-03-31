import { highlight } from '@/lib/shiki'

interface CodeBlockProps {
  code: string
  lang?: string
}

export async function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const html = await highlight(code, lang)
  return (
    <div
      className="rounded-(--radius-md) border border-(--color-border) overflow-hidden text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
