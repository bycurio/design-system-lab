import figma from '@figma/code-connect'
import { Pagination } from './Pagination'

figma.connect(Pagination, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=537-225', {
  example: () => (
    <Pagination
      page={4}
      totalPages={10}
      onPageChange={(page) => console.log('page:', page)}
      siblingCount={1}
    />
  ),
})
