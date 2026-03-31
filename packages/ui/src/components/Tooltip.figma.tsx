import figma from '@figma/code-connect'
import { Tooltip } from './Tooltip'

figma.connect(Tooltip, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    content: figma.string('content'),
    placement: figma.enum('placement', {
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right',
    }),
  },
  example: (props) => (
    <Tooltip content={props.content} placement={props.placement}>
      <span>Hover me</span>
    </Tooltip>
  ),
})
