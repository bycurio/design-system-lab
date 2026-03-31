import figma from '@figma/code-connect'
import { Input } from './Input'

figma.connect(Input, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    placeholder: figma.string('placeholder'),
    error: figma.boolean('error'),
    errorMessage: figma.string('errorMessage'),
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <Input
      placeholder={props.placeholder}
      error={props.error}
      errorMessage={props.errorMessage}
      disabled={props.disabled}
    />
  ),
})
