import figma from '@figma/code-connect'
import { Textarea } from './Textarea'

figma.connect(Textarea, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=354-123', {
  props: {
    label: figma.string('Label'),
    disabled: figma.enum('State', {
      disabled: true,
    }),
    error: figma.enum('State', {
      error: 'This field is required',
    }),
  },
  example: (props) => (
    <Textarea
      label={props.label}
      disabled={props.disabled}
      error={props.error}
      placeholder="Placeholder text"
      rows={3}
    />
  ),
})
