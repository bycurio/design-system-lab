import figma from '@figma/code-connect'
import { Textarea } from './Textarea'

figma.connect(Textarea, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=338-16', {
  props: {
    disabled: figma.enum('State', {
      disabled: true,
    }),
    error: figma.enum('State', {
      error: true,
    }),
  },
  example: (props) => (
    <Textarea
      disabled={props.disabled}
      error={props.error}
      placeholder="Placeholder text"
      rows={3}
    />
  ),
})
