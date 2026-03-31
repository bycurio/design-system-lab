import figma from '@figma/code-connect'
import { Table } from './Table'

figma.connect(Table, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    loading: figma.boolean('loading'),
  },
  example: (props) => (
    <Table
      loading={props.loading}
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'role', label: 'Role' },
      ]}
      rows={[
        { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin' },
        { id: '2', name: 'Bob', email: 'bob@example.com', role: 'Editor' },
      ]}
    />
  ),
})
