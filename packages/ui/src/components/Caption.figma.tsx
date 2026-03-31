import figma from '@figma/code-connect'
import { Caption } from './Caption'

figma.connect(Caption, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-121', {
  props: {
    variant: figma.enum('variant', {
      default: 'default',
      error: 'error',
      success: 'success',
    }),
  },
  example: (props) => (
    <Caption variant={props.variant}>
      Helper text or caption content.
    </Caption>
  ),
})
