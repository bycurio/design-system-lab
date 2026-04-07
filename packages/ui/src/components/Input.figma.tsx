import figma from '@figma/code-connect'
import { Input } from './Input'

figma.connect(Input, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=354-47', {
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
    <Input
      label={props.label}
      disabled={props.disabled}
      error={props.error}
      placeholder="Placeholder text"
    />
  ),
})
