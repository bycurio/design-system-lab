import figma from '@figma/code-connect'
import { Drawer } from './Drawer'

figma.connect(Drawer, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    title: figma.string('title'),
    placement: figma.enum('placement', {
      left: 'left',
      right: 'right',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
  },
  example: (props) => (
    <Drawer
      open={true}
      onClose={() => {}}
      title={props.title}
      placement={props.placement}
      size={props.size}
    >
      Drawer body content
    </Drawer>
  ),
})
