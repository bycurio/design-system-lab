import figma from '@figma/code-connect'
import { NavBar } from './NavBar'

figma.connect(NavBar, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    brand: figma.string('brand'),
  },
  example: (props) => (
    <NavBar
      brand={props.brand}
      links={[
        { label: 'Home', href: '/', active: true },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]}
    />
  ),
})
