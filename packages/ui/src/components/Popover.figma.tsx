import figma from '@figma/code-connect'
import { Popover } from './Popover'

figma.connect(Popover, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-92', {
  props: {
    placement: figma.enum('placement', {
      top: 'top',
      bottom: 'bottom',
      left: 'left',
      right: 'right',
    }),
  },
  example: (props) => (
    <Popover
      placement={props.placement}
      trigger={<button>Open popover</button>}
      content={<div>Popover content</div>}
    />
  ),
})
