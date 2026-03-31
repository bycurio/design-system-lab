import figma from '@figma/code-connect'
import { Skeleton } from './Skeleton'

figma.connect(Skeleton, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-76', {
  props: {},
  example: () => (
    <Skeleton className="h-4 w-48" />
  ),
})
