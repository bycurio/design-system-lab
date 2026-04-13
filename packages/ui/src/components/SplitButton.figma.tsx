import figma from '@figma/code-connect'
import { SplitButton } from './SplitButton'

figma.connect(SplitButton, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=226-182', {
  props: {
    variant: figma.enum('Variant', {
      primary: 'primary',
      secondary: 'secondary',
      danger: 'danger',
    }),
    size: figma.enum('Size', {
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    }),
  },
  example: (props) => (
    <SplitButton
      label="Label"
      variant={props.variant}
      size={props.size}
      onClick={() => {}}
      actions={[
        { label: 'Option A', onClick: () => {} },
        { label: 'Option B', onClick: () => {} },
      ]}
    />
  ),
})
