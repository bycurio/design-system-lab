import figma from '@figma/code-connect'
import { Body } from './Body'

figma.connect(Body, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-115', {
  props: {
    size: figma.enum('size', {
      sm: 'sm',
      base: 'base',
      lg: 'lg',
    }),
  },
  example: (props) => (
    <Body size={props.size}>
      Body text content goes here.
    </Body>
  ),
})
