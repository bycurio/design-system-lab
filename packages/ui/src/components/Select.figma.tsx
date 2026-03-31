import figma from '@figma/code-connect'
import { Select } from './Select'

figma.connect(Select, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-26', {
  props: {
    label: figma.string('label'),
    error: figma.boolean('error'),
    errorMessage: figma.string('errorMessage'),
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <Select
      label={props.label}
      error={props.error}
      errorMessage={props.errorMessage}
      disabled={props.disabled}
      options={[
        { value: 'option-1', label: 'Option 1' },
        { value: 'option-2', label: 'Option 2' },
        { value: 'option-3', label: 'Option 3' },
      ]}
    />
  ),
})
