import figma from '@figma/code-connect'
import { SplitButton } from './SplitButton'

figma.connect(SplitButton, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
  props: {
    label: figma.string('label'),
    variant: figma.enum('variant', {
      primary: 'primary',
      secondary: 'secondary',
      danger: 'danger',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
    disabled: figma.boolean('disabled'),
  },
  example: (props) => (
    <SplitButton
      label={props.label}
      variant={props.variant}
      size={props.size}
      disabled={props.disabled}
      onClick={() => {}}
      actions={[
        { label: 'Option A', onClick: () => {} },
        { label: 'Option B', onClick: () => {} },
      ]}
    />
  ),
})
