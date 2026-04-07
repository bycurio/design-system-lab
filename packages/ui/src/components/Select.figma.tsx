import figma from '@figma/code-connect'
import { Select } from './Select'

figma.connect(Select, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=354-176', {
  props: {
    label: figma.string('Label'),
    disabled: figma.enum('State', {
      disabled: true,
    }),
    error: figma.enum('State', {
      error: 'Please select an option',
    }),
  },
  example: (props) => (
    <Select
      label={props.label}
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
