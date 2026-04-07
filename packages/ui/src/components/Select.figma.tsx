import figma from '@figma/code-connect'
import { Select } from './Select'

figma.connect(Select, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=344-21', {
  props: {
    disabled: figma.enum('State', {
      disabled: true,
    }),
    error: figma.enum('State', {
      error: true,
    }),
  },
  example: (props) => (
    <Select
      disabled={props.disabled}
      error={props.error}
      placeholder="Select an option"
      options={[
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' },
      ]}
    />
  ),
})
