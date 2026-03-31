import figma from '@figma/code-connect'
import { Toast } from './Toast'

figma.connect(Toast, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    variant: figma.enum('variant', {
      info: 'info',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
    }),
    title: figma.string('title'),
    description: figma.string('description'),
  },
  example: (props) => (
    <Toast
      variant={props.variant}
      title={props.title}
      description={props.description}
      onClose={() => {}}
    />
  ),
})
