import figma from '@figma/code-connect'
import { Modal } from './Modal'

figma.connect(Modal, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    title: figma.string('title'),
    size: figma.enum('size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
  },
  example: (props) => (
    <Modal
      open={true}
      onClose={() => {}}
      title={props.title}
      size={props.size}
    >
      Modal body content
    </Modal>
  ),
})
