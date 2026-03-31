import figma from '@figma/code-connect'
import { Code } from './Code'

figma.connect(Code, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-124', {
  props: {
    variant: figma.enum('variant', {
      inline: 'inline',
      block: 'block',
    }),
  },
  example: (props) => (
    <Code variant={props.variant}>
      {`const greeting = "Hello, world!"`}
    </Code>
  ),
})
