import figma from '@figma/code-connect'
import { Textarea } from './Textarea'

figma.connect(Textarea, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-23', {
  props: {
    placeholder: figma.string('placeholder'),
    error: figma.boolean('error'),
    errorMessage: figma.string('errorMessage'),
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <Textarea
      placeholder={props.placeholder}
      error={props.error}
      errorMessage={props.errorMessage}
      disabled={props.disabled}
      rows={4}
    />
  ),
})
