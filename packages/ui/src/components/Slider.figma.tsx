import figma from '@figma/code-connect'
import { Slider } from './Slider'

figma.connect(Slider, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <Slider
      min={0}
      max={100}
      value={50}
      step={1}
      disabled={props.disabled}
      onChange={() => {}}
    />
  ),
})
