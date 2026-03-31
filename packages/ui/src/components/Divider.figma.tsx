import figma from '@figma/code-connect'
import { Divider } from './Divider'

figma.connect(Divider, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    orientation: figma.enum('orientation', {
      horizontal: 'horizontal',
      vertical: 'vertical',
    }),
    label: figma.string('label'),
  },
  example: (props) => (
    <Divider orientation={props.orientation} label={props.label} />
  ),
})
