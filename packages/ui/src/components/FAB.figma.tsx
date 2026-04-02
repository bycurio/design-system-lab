import figma from '@figma/code-connect'
import { FAB } from './FAB'

figma.connect(FAB, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=187-22', {
  props: {
    iconName: figma.string('iconName'),
    label: figma.string('label'),
  },
  example: (props) => (
    <FAB
      iconName={props.iconName ?? 'add'}
      label={props.label}
      aria-label="Create"
    />
  ),
})
