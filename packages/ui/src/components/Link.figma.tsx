import figma from '@figma/code-connect'
import { Link } from './Link'

figma.connect(Link, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    external: figma.boolean('external'),
  },
  example: (props) => (
    <Link href="https://example.com" external={props.external}>
      Link label
    </Link>
  ),
})
