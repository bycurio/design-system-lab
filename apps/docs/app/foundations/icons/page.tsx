import {
  AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, Bell, Calendar,
  Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle,
  Clock, Copy, Download, Edit, ExternalLink, Eye, EyeOff, File,
  Filter, Globe, Grid, Heart, Home, Image, Info, Link, List,
  Loader2, Lock, Mail, Menu, Minus, Moon, MoreHorizontal, MoreVertical,
  Plus, RefreshCw, Search, Settings, Share, Shield, Star, Sun,
  Trash2, Upload, User, Users, X, XCircle, ZoomIn, ZoomOut,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const icons: { name: string; Icon: LucideIcon }[] = [
  { name: 'AlertCircle', Icon: AlertCircle },
  { name: 'AlertTriangle', Icon: AlertTriangle },
  { name: 'ArrowLeft', Icon: ArrowLeft },
  { name: 'ArrowRight', Icon: ArrowRight },
  { name: 'Bell', Icon: Bell },
  { name: 'Calendar', Icon: Calendar },
  { name: 'Check', Icon: Check },
  { name: 'ChevronDown', Icon: ChevronDown },
  { name: 'ChevronLeft', Icon: ChevronLeft },
  { name: 'ChevronRight', Icon: ChevronRight },
  { name: 'ChevronUp', Icon: ChevronUp },
  { name: 'Circle', Icon: Circle },
  { name: 'Clock', Icon: Clock },
  { name: 'Copy', Icon: Copy },
  { name: 'Download', Icon: Download },
  { name: 'Edit', Icon: Edit },
  { name: 'ExternalLink', Icon: ExternalLink },
  { name: 'Eye', Icon: Eye },
  { name: 'EyeOff', Icon: EyeOff },
  { name: 'File', Icon: File },
  { name: 'Filter', Icon: Filter },
  { name: 'Globe', Icon: Globe },
  { name: 'Grid', Icon: Grid },
  { name: 'Heart', Icon: Heart },
  { name: 'Home', Icon: Home },
  { name: 'Image', Icon: Image },
  { name: 'Info', Icon: Info },
  { name: 'Link', Icon: Link },
  { name: 'List', Icon: List },
  { name: 'Loader2', Icon: Loader2 },
  { name: 'Lock', Icon: Lock },
  { name: 'Mail', Icon: Mail },
  { name: 'Menu', Icon: Menu },
  { name: 'Minus', Icon: Minus },
  { name: 'Moon', Icon: Moon },
  { name: 'MoreHorizontal', Icon: MoreHorizontal },
  { name: 'MoreVertical', Icon: MoreVertical },
  { name: 'Plus', Icon: Plus },
  { name: 'RefreshCw', Icon: RefreshCw },
  { name: 'Search', Icon: Search },
  { name: 'Settings', Icon: Settings },
  { name: 'Share', Icon: Share },
  { name: 'Shield', Icon: Shield },
  { name: 'Star', Icon: Star },
  { name: 'Sun', Icon: Sun },
  { name: 'Trash2', Icon: Trash2 },
  { name: 'Upload', Icon: Upload },
  { name: 'User', Icon: User },
  { name: 'Users', Icon: Users },
  { name: 'X', Icon: X },
  { name: 'XCircle', Icon: XCircle },
  { name: 'ZoomIn', Icon: ZoomIn },
  { name: 'ZoomOut', Icon: ZoomOut },
]

export default function IconsPage() {
  return (
    <div className="max-w-4xl p-8">
      <h1 className="text-3xl font-bold text-(--color-text-primary) mb-2">Icons</h1>
      <p className="text-(--color-text-secondary) mb-10">
        Lucide React — zero config, tree-shakeable, consistent 24×24 geometry.
        Import individual icons: <code className="font-mono text-sm text-(--color-brand)">{`import { Check } from 'lucide-react'`}</code>
      </p>

      <div className="grid grid-cols-6 gap-2">
        {icons.map(({ name, Icon }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 p-3 rounded-(--radius-md) border border-(--color-border) hover:bg-(--color-surface) transition-colors"
          >
            <Icon size={20} className="text-(--color-text-primary)" />
            <p className="text-[10px] text-(--color-text-secondary) text-center leading-tight">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
