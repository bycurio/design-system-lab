import figma from '@figma/code-connect'
import { Sidebar } from './Sidebar'
import { IconButton } from './IconButton'

figma.connect(Sidebar, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=503-175', {
  example: () => (
    <Sidebar
      groups={[
        {
          label: 'Main menu',
          items: [
            { label: 'Home',      href: '/',          icon: 'home',         active: true },
            { label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
            { label: 'Products',  href: '/products',  icon: 'inventory_2' },
            { label: 'Orders',    href: '/orders',    icon: 'receipt_long' },
          ],
        },
        {
          label: 'Account',
          items: [
            { label: 'Customers', href: '/customers', icon: 'group' },
            { label: 'Settings',  href: '/settings',  icon: 'settings' },
          ],
        },
      ]}
      footer={
        <>
          <IconButton icon="notifications" variant="ghost" size="md" aria-label="Alerts" />
          <IconButton icon="person"        variant="ghost" size="md" aria-label="Profile" />
          <IconButton icon="dark_mode"     variant="ghost" size="md" aria-label="Toggle theme" />
        </>
      }
    />
  ),
})
