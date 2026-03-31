import figma from '@figma/code-connect'
import { Accordion } from './Accordion'

figma.connect(Accordion, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-95', {
  props: {
    allowMultiple: figma.boolean('allowMultiple'),
  },
  example: (props) => (
    <Accordion
      allowMultiple={props.allowMultiple}
      items={[
        { title: 'Section 1', content: <span>Content for section 1</span> },
        { title: 'Section 2', content: <span>Content for section 2</span> },
        { title: 'Section 3', content: <span>Content for section 3</span> },
      ]}
    />
  ),
})
