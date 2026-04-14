import figma from '@figma/code-connect'
import { NavButton } from './NavButton'

figma.connect(NavButton, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=474-178', {
  props: {
    label: figma.string('Label'),
    icon: figma.string('Icon'),
    active: figma.enum('State', { active: true }),
    disabled: figma.enum('State', { disabled: true }),
  },
  example: (props) => (
    <NavButton
      label={props.label}
      href="#"
      icon={props.icon}
      active={props.active}
      disabled={props.disabled}
    />
  ),
})
