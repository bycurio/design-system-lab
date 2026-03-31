import figma from '@figma/code-connect'
import { Progress } from './Progress'

figma.connect(Progress, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    label: figma.string('label'),
    variant: figma.enum('variant', {
      default: 'default',
      success: 'success',
    }),
    showLabel: figma.boolean('showLabel'),
  },
  example: (props) => (
    <Progress
      value={65}
      label={props.label}
      variant={props.variant}
      showLabel={props.showLabel}
    />
  ),
})
