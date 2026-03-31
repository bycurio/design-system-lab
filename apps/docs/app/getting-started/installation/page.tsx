import { CodeBlock } from '@/components/CodeBlock'

export default async function InstallationPage() {
  return (
    <div className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-4">Installation</h1>
      <p className="text-(--color-text-secondary) text-lg mb-8">
        Components live in <code className="font-mono text-(--color-brand) text-sm">@ds/ui</code> and
        tokens in <code className="font-mono text-(--color-brand) text-sm">@ds/tokens</code>. Both are
        workspace packages — consumed directly from the monorepo.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">1. Import tokens</h2>
        <p className="text-(--color-text-secondary) mb-3">Add to your app&apos;s global CSS:</p>
        <CodeBlock lang="css" code={`@import '@ds/tokens/tailwind.css';`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">2. Use components</h2>
        <CodeBlock code={`import { Button, Badge, Input } from '@ds/ui'

export function MyForm() {
  return (
    <form>
      <Input placeholder="Email address" />
      <Button variant="primary" type="submit">Subscribe</Button>
    </form>
  )
}`} />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-3">3. Dark mode</h2>
        <p className="text-(--color-text-secondary) mb-3">
          Add the <code className="font-mono text-(--color-brand) text-sm">dark</code> class to the{' '}
          <code className="font-mono text-(--color-brand) text-sm">&lt;html&gt;</code> element to activate dark mode.
          With <code className="font-mono text-(--color-brand) text-sm">next-themes</code>:
        </p>
        <CodeBlock code={`import { ThemeProvider } from 'next-themes'

export function Layout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}`} />
      </section>
    </div>
  )
}
