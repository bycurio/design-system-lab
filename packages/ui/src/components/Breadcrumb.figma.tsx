import figma from '@figma/code-connect'
import { Breadcrumb } from './Breadcrumb'

figma.connect(Breadcrumb, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-51', {
  props: {
    separator: figma.string('separator'),
  },
  example: (props) => (
    <Breadcrumb
      separator={props.separator}
      items={[
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Detail' },
      ]}
    />
  ),
})
