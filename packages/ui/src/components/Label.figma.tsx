import figma from '@figma/code-connect'
import { Label } from './Label'

figma.connect(Label, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-118', {
  props: {
    required: figma.boolean('required'),
  },
  example: (props) => (
    <Label required={props.required}>
      Field label
    </Label>
  ),
})
