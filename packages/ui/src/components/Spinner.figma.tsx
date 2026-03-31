import figma from '@figma/code-connect'
import { Spinner } from './Spinner'

figma.connect(Spinner, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    size: figma.enum('size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
  },
  example: (props) => (
    <Spinner size={props.size} />
  ),
})
