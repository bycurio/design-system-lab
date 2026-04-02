import figma from '@figma/code-connect'
import { FAB } from './FAB'

figma.connect(FAB, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=181-26', {
  props: {
    iconName: figma.string('iconName'),
    size: figma.enum('Size', { sm: 'sm', md: 'md', lg: 'lg' }),
  },
  example: (props) => (
    <FAB
      iconName={props.iconName ?? 'add'}
      size={props.size}
      aria-label="Create"
    />
  ),
})
