import figma from '@figma/code-connect'
import { TabButton } from './TabButton'

figma.connect(TabButton, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=491-169', {
  props: {
    label: figma.string('Label'),
    icon: figma.string('Icon'),
    active: figma.enum('State', { active: true }),
    disabled: figma.enum('State', { disabled: true }),
  },
  example: (props) => (
    <TabButton
      label={props.label}
      icon={props.icon}
      active={props.active}
      disabled={props.disabled}
    />
  ),
})
