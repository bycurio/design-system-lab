import figma from '@figma/code-connect'
import { Alert } from './Alert'

figma.connect(Alert, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-67', {
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
    <Alert
      variant={props.variant}
      title={props.title}
      description={props.description}
      onDismiss={() => {}}
    />
  ),
})
