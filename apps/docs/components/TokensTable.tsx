import type { TokenDef } from '@/lib/types'

export function TokensTable({ tokens }: { tokens: TokenDef[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-(--color-border)">
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Token</th>
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Default value</th>
            <th className="text-left py-2 font-semibold text-(--color-text-secondary)">Description</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name} className="border-b border-(--color-border)">
              <td className="py-2 pr-6 font-mono text-xs text-(--color-brand)">{token.name}</td>
              <td className="py-2 pr-6 font-mono text-xs text-(--color-text-secondary)">{token.value}</td>
              <td className="py-2 text-(--color-text-primary)">{token.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
