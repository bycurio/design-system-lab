import figma from '@figma/code-connect'
import { Checkbox } from './Checkbox'

figma.connect(Checkbox, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=349-46', {
  props: {
    label: figma.string('Label'),
    checked: figma.enum('Checked', {
      true: true,
    }),
    indeterminate: figma.enum('Checked', {
      indeterminate: true,
    }),
    disabled: figma.enum('State', {
      disabled: true,
    }),
  },
  example: (props) => (
    <Checkbox
      label={props.label}
      checked={props.checked}
      indeterminate={props.indeterminate}
      disabled={props.disabled}
      onChange={() => {}}
    />
  ),
})
