import figma from '@figma/code-connect'
import { Chip } from './Chip'

figma.connect(Chip, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <Chip
      disabled={props.disabled}
      onRemove={() => {}}
    >
      Chip label
    </Chip>
  ),
})
