import type { PropDef } from '@/lib/types'

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-(--color-border)">
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Prop</th>
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Type</th>
            <th className="text-left py-2 pr-6 font-semibold text-(--color-text-secondary)">Default</th>
            <th className="text-left py-2 font-semibold text-(--color-text-secondary)">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-(--color-border)">
              <td className="py-2 pr-6 font-mono text-xs text-(--color-brand)">
                {prop.name}
                {prop.required && <span className="text-(--color-danger) ml-0.5">*</span>}
              </td>
              <td className="py-2 pr-6 font-mono text-xs text-(--color-text-secondary)">{prop.type}</td>
              <td className="py-2 pr-6 font-mono text-xs text-(--color-text-secondary)">
                {prop.default ?? '—'}
              </td>
              <td className="py-2 text-(--color-text-primary)">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
