import figma from '@figma/code-connect'
import { Pagination } from './Pagination'

figma.connect(Pagination, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {},
  example: () => (
    <Pagination
      page={1}
      totalPages={10}
      onPageChange={() => {}}
      siblingCount={1}
    />
  ),
})
