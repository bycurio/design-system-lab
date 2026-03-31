import figma from '@figma/code-connect'
import { FAB } from './FAB'

figma.connect(FAB, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    label: figma.string('label'),
  },
  example: (props) => (
    <FAB
      icon={<span>+</span>}
      aria-label="Create"
      label={props.label}
    />
  ),
})
