import figma from '@figma/code-connect'
import { Toggle } from './Toggle'

figma.connect(Toggle, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-35', {
  props: {
    label: figma.string('label'),
    checked: figma.boolean('checked'),
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <Toggle
      label={props.label}
      checked={props.checked}
      disabled={props.disabled}
      onChange={() => {}}
    />
  ),
})
