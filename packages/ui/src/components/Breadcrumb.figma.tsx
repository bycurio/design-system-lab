import figma from '@figma/code-connect'
import { Breadcrumb } from './Breadcrumb'

figma.connect(Breadcrumb, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=498-167', {
  example: () => (
    <Breadcrumb
      items={[
        { label: 'Home',     href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Listing',  href: '/products/listing' },
        { label: 'Product name' },
      ]}
    />
  ),
})
