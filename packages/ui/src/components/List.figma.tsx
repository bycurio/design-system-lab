import figma from '@figma/code-connect'
import { List } from './List'

figma.connect(List, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {},
  example: () => (
    <List
      items={[
        { id: '1', label: 'First item', description: 'Description for first item' },
        { id: '2', label: 'Second item', description: 'Description for second item' },
        { id: '3', label: 'Third item' },
      ]}
    />
  ),
})
