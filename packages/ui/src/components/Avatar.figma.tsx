import figma from '@figma/code-connect'
import { Avatar } from './Avatar'

figma.connect(Avatar, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    src: figma.string('src'),
    alt: figma.string('alt'),
    fallback: figma.string('fallback'),
    size: figma.enum('size', {
      xs: 'xs',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
      xl: 'xl',
    }),
  },
  example: (props) => (
    <Avatar
      src={props.src}
      alt={props.alt}
      fallback={props.fallback}
      size={props.size}
    />
  ),
})
