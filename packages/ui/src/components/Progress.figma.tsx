import figma from '@figma/code-connect'
import { Progress } from './Progress'

figma.connect(Progress, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=638-254', {
  props: {
    variant: figma.enum('Variant', {
      default: 'default',
      success: 'success',
      error:   'error',
    }),
  },
  example: (props) => (
    <Progress
      value={65}
      label="Uploading…"
      variant={props.variant}
      showLabel
    />
  ),
})
