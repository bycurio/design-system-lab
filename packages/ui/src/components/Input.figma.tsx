import figma from '@figma/code-connect'
import { Input } from './Input'

figma.connect(Input, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=332-16', {
  props: {
    disabled: figma.enum('State', {
      disabled: true,
    }),
    error: figma.enum('State', {
      error: true,
    }),
  },
  example: (props) => (
    <Input
      disabled={props.disabled}
      error={props.error}
      placeholder="Placeholder text"
    />
  ),
})
