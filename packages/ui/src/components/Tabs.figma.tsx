import figma from '@figma/code-connect'
import { Tabs } from './Tabs'

figma.connect(Tabs, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=34-48', {
  props: {},
  example: () => (
    <Tabs
      defaultValue="tab-1"
      tabs={[
        { label: 'Tab 1', value: 'tab-1', content: <span>Content for Tab 1</span> },
        { label: 'Tab 2', value: 'tab-2', content: <span>Content for Tab 2</span> },
        { label: 'Tab 3', value: 'tab-3', content: <span>Content for Tab 3</span> },
      ]}
    />
  ),
})
