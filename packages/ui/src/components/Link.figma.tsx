import figma from '@figma/code-connect'
import { Link } from './Link'

figma.connect(Link, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=167-12', {
  props: {
    variant: figma.enum('variant', {
      internal: 'internal',
      external: 'external',
    }),
  },
  example: (props) => (
    <Link href="https://example.com" variant={props.variant}>
      Link label
    </Link>
  ),
})
