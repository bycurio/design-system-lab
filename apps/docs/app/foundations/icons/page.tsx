import { Icon } from '@ds/ui'

const iconSizes = [
  { label: 'sm', size: 16, token: 'Size/16', usage: 'Button sm, IconButton sm' },
  { label: 'md', size: 20, token: 'Size/20', usage: 'Button md, IconButton md' },
  { label: 'lg', size: 24, token: 'Size/24', usage: 'Button lg, IconButton lg' },
]

const icons = [
  'add', 'arrow_back', 'arrow_forward', 'calendar_month', 'cancel',
  'check', 'check_circle', 'chevron_left', 'chevron_right', 'close',
  'content_copy', 'dark_mode', 'delete', 'description', 'download',
  'edit', 'error', 'expand_less', 'expand_more', 'favorite',
  'filter_list', 'grid_view', 'group', 'home', 'image',
  'info', 'language', 'light_mode', 'link', 'list',
  'lock', 'mail', 'menu', 'more_horiz', 'more_vert',
  'notifications', 'open_in_new', 'person', 'progress_activity', 'refresh',
  'remove', 'schedule', 'search', 'security', 'settings',
  'share', 'star', 'upload', 'visibility', 'visibility_off',
  'warning', 'zoom_in', 'zoom_out',
]

export default function IconsPage() {
  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Icons</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Material Symbols Rounded — variable font icon set loaded via Google Fonts.
        Use the <code className="font-mono text-sm text-(--color-brand)">{`<Icon name="..." />`}</code> component, or render directly with <code className="font-mono text-sm text-(--color-brand)">{`<span className="material-symbols-rounded">icon_name</span>`}</code>.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Sizes</h2>
        <div className="flex gap-8">
          {iconSizes.map(({ label, size, token, usage }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <Icon name="home" size={size} className="text-(--color-text-primary)" />
              <div className="text-center">
                <p className="font-mono text-xs text-(--color-brand)">{token}</p>
                <p className="text-xs text-(--color-text-secondary)">{size}px</p>
                <p className="text-xs text-(--color-text-secondary)">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-(--color-text-primary) mb-4">Icon reference</h2>
        <div className="grid grid-cols-6 gap-2">
          {icons.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-3 rounded-(--radius-md) border border-(--color-border) hover:bg-(--color-surface) transition-colors"
            >
              <Icon name={name} size={20} className="text-(--color-text-primary)" />
              <p className="text-[10px] text-(--color-text-secondary) text-center leading-tight">{name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
