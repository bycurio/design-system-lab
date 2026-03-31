import figma from '@figma/code-connect'
import { DatePicker } from './DatePicker'

figma.connect(DatePicker, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-41', {
  props: {
    label: figma.string('label'),
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <DatePicker
      label={props.label}
      disabled={props.disabled}
      onChange={() => {}}
    />
  ),
})
