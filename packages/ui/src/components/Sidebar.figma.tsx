import figma from '@figma/code-connect'
import { Sidebar } from './Sidebar'

figma.connect(Sidebar, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-54', {
  props: {},
  example: () => (
    <Sidebar
      groups={[
        {
          title: 'Main',
          items: [
            { label: 'Dashboard', href: '/dashboard', active: true },
            { label: 'Analytics', href: '/analytics' },
          ],
        },
        {
          title: 'Settings',
          items: [
            { label: 'Profile', href: '/profile' },
            { label: 'Billing', href: '/billing' },
          ],
        },
      ]}
    />
  ),
})
