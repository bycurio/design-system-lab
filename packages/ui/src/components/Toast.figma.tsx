import figma from '@figma/code-connect'
import { Toast } from './Toast'

figma.connect(Toast, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=573-234', {
  props: {
    variant: figma.enum('Variant', {
      info:    'info',
      success: 'success',
      warning: 'warning',
      danger:  'danger',
    }),
    title:       figma.string('Title'),
    description: figma.string('Description'),
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
