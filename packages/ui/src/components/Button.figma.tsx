import figma from '@figma/code-connect'
import { Button } from './Button'

figma.connect(Button, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-4', {
  props: {
    variant: figma.enum('variant', {
      primary: 'primary',
      secondary: 'secondary',
      ghost: 'ghost',
      danger: 'danger',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
    loading: figma.boolean('loading'),
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <Button variant={props.variant} size={props.size} loading={props.loading} disabled={props.disabled}>
      Label
    </Button>
  ),
})
