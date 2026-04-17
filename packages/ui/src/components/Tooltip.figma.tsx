import figma from '@figma/code-connect'
import { Tooltip } from './Tooltip'

figma.connect(Tooltip, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=661-272', {
  props: {
    content: figma.string('Label'),
    placement: figma.enum('Side', {
      Top:    'top',
      Bottom: 'bottom',
      Left:   'left',
      Right:  'right',
    }),
  },
  example: (props) => (
    <Tooltip content={props.content} placement={props.placement}>
      <span>Hover me</span>
    </Tooltip>
  ),
})
