import figma from '@figma/code-connect'
import { Card } from './Card'

figma.connect(Card, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {},
  example: () => (
    <Card>
      <Card.Header>Card title</Card.Header>
      <Card.Body>Card content goes here.</Card.Body>
      <Card.Footer>Footer actions</Card.Footer>
    </Card>
  ),
})
