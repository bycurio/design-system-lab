import figma from '@figma/code-connect'
import { NavBar } from './NavBar'

figma.connect(NavBar, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=481-166', {
  example: () => (
    <NavBar
      logo={<span>Logo</span>}
      links={[
        { label: 'Home', href: '/', icon: 'home', active: true },
        { label: 'Products', href: '/products', icon: 'inventory_2' },
        { label: 'Pricing', href: '/pricing', icon: 'sell' },
        { label: 'About', href: '/about', icon: 'info' },
      ]}
    />
  ),
})
