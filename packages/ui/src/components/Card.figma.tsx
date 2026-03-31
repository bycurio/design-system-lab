import figma from '@figma/code-connect'
import { Card } from './Card'

figma.connect(Card, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-83', {
  props: {},
  example: () => (
    <Card>
      <Card.Header>Card title</Card.Header>
      <Card.Body>Card content goes here.</Card.Body>
      <Card.Footer>Footer actions</Card.Footer>
    </Card>
  ),
})
