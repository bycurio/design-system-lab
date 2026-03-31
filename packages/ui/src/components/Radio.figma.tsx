import figma from '@figma/code-connect'
import { Radio } from './Radio'

figma.connect(Radio, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    label: figma.string('label'),
    checked: figma.boolean('checked'),
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <Radio
      label={props.label}
      value="option-1"
      checked={props.checked}
      disabled={props.disabled}
      onChange={() => {}}
    />
  ),
})
