import figma from '@figma/code-connect'
import { Badge } from './Badge'

figma.connect(Badge, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=548-226', {
  props: {
    variant: figma.enum('Variant', {
      info:    'info',
      success: 'success',
      warning: 'warning',
      danger:  'danger',
      neutral: 'neutral',
    }),
    strength: figma.enum('Strength', {
      subtle: 'subtle',
      strong: 'strong',
    }),
  },
  example: (props) => (
    <Badge variant={props.variant} strength={props.strength}>
      Badge label
    </Badge>
  ),
})
