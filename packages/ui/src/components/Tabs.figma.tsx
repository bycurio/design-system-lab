import figma from '@figma/code-connect'
import { Tabs } from './Tabs'

figma.connect(Tabs, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=492-157', {
  example: () => (
    <Tabs
      defaultValue="overview"
      tabs={[
        { label: 'Overview', value: 'overview', icon: 'grid_view', content: <span>Overview content</span> },
        { label: 'Details',  value: 'details',  icon: 'list',      content: <span>Details content</span> },
        { label: 'Reviews',  value: 'reviews',  icon: 'star',      content: <span>Reviews content</span> },
      ]}
    />
  ),
})
