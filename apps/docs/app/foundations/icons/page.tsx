import { Icon } from '@ds/ui'

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
    </div>
  )
}
