import figma from '@figma/code-connect'
import { Checkbox } from './Checkbox'

figma.connect(Checkbox, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    label: figma.string('label'),
    checked: figma.boolean('checked'),
    disabled: figma.boolean('disabled'),
    error: figma.boolean('error'),
  },
  example: (props) => (
    <Checkbox
      label={props.label}
      checked={props.checked}
      disabled={props.disabled}
      error={props.error}
      onChange={() => {}}
    />
  ),
})
