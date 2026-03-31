import figma from '@figma/code-connect'
import { Badge } from './Badge'

figma.connect(Badge, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    variant: figma.enum('variant', {
      info: 'info',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      neutral: 'neutral',
    }),
  },
  example: (props) => (
    <Badge variant={props.variant}>
      Badge label
    </Badge>
  ),
})
