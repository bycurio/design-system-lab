import figma from '@figma/code-connect'
import { Alert } from './Alert'

figma.connect(Alert, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=577-242', {
  props: {
    variant: figma.enum('Variant', {
      info:    'info',
      success: 'success',
      warning: 'warning',
      danger:  'danger',
    }),
    title:       figma.string('Title'),
    description: figma.string('Description'),
    actionLabel: figma.string('Action label'),
  },
  example: (props) => (
    <Alert
      variant={props.variant}
      title={props.title}
      description={props.description}
      action={{ label: props.actionLabel, onClick: () => {} }}
      onDismiss={() => {}}
    />
  ),
})
