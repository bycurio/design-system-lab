import figma from '@figma/code-connect'
import { Heading } from './Heading'

figma.connect(Heading, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    as: figma.enum('as', {
      display: 'display',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
    }),
  },
  example: (props) => (
    <Heading as={props.as}>
      Heading text
    </Heading>
  ),
})
