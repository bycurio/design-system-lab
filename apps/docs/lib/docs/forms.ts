// @ts-nocheck
import { createElement as h } from 'react'
import { Input, Icon, Textarea, Select, Checkbox, Radio, Toggle, Slider, DatePicker } from '@ds/ui'
import type { ComponentDoc } from '@/lib/types'

export const inputDoc: ComponentDoc = {
  title: 'Input',
  slug: 'input',
  description:
    'A single-line text input field with support for labels, validation errors, leading and trailing icons, and disabled states.',
  whenToUse: [
    'Collecting short free-text values: names, emails, search terms',
    'Fields that require inline validation feedback',
    'Inputs decorated with a prefix icon or unit suffix',
  ],
  whenNotToUse: [
    'Multi-line content — use Textarea instead',
    'Selecting from a fixed set of options — use Select, Radio, or Checkbox',
    'Numeric ranges — use Slider instead',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-4 max-w-sm' },
      h(Input, { label: 'Email address', placeholder: 'you@example.com' }),
      h(Input, { label: 'Username', placeholder: 'handle', error: 'Username is already taken' }),
      h(Input, { label: 'Search', placeholder: 'Search…', disabled: true }),
    ),
  variants: [
    {
      label: 'States',
      preview: () =>
        h('div', { className: 'flex flex-col gap-4 max-w-sm' },
          h(Input, { label: 'Default', placeholder: 'Enter value' }),
          h(Input, { label: 'Error', placeholder: 'Enter value', error: 'This field is required' }),
          h(Input, { label: 'Disabled', placeholder: 'Not editable', disabled: true }),
        ),
    },
    {
      label: 'With Icons',
      preview: () =>
        h('div', { className: 'flex flex-col gap-4 max-w-sm' },
          h(Input, { label: 'Search', placeholder: 'Search…', leadingIcon: h(Icon, { name: 'search' }) }),
          h(Input, { label: 'Price', placeholder: '0.00', leadingIcon: h('span', null, '$'), trailingIcon: h('span', null, 'USD') }),
        ),
    },
  ],
  usage: `import { Input } from '@ds/ui'

// Basic
<Input label="Full name" placeholder="Jane Smith" />

// With error
<Input
  label="Email"
  placeholder="you@example.com"
  error={errors.email}
/>

// With icons
<Input
  label="Search"
  leadingIcon={<SearchIcon />}
  placeholder="Search records…"
/>

// Disabled
<Input label="Account ID" value={user.id} disabled />`,
  props: [
    { name: 'label', type: 'string', description: 'Field label rendered above the input.' },
    { name: 'hint', type: 'string', description: 'Helper text shown below the input when there is no error.' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text shown when the input is empty.' },
    { name: 'error', type: 'string', description: 'Error message shown below the input. Replaces hint and sets aria-invalid.' },
    { name: 'leadingIcon', type: 'ReactNode', description: 'Icon or element rendered at the left of the input.' },
    { name: 'trailingIcon', type: 'ReactNode', description: 'Icon or element rendered at the right of the input.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
    { name: '...rest', type: 'React.InputHTMLAttributes<HTMLInputElement>', description: 'All native input attributes (value, onChange, type, etc.).' },
  ],
  tokens: [
    { name: '--input-radius', value: 'var(--radius-md)', description: 'Border radius of the input field.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Default input border color.' },
    { name: '--color-danger', value: '#dc2626', description: 'Error state border and message color.' },
  ],
}

export const textareaDoc: ComponentDoc = {
  title: 'Textarea',
  slug: 'textarea',
  description:
    'A multi-line text input for longer freeform content. Mirrors the Input API for consistency: label, error, and disabled props are handled the same way.',
  whenToUse: [
    'Comments, descriptions, notes, or any content longer than one line',
    'Free-form fields where the user may need to write multiple sentences',
  ],
  whenNotToUse: [
    'Short single-line values — use Input instead',
    'Rich text or markdown — use a purpose-built rich text editor',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-4 max-w-sm' },
      h(Textarea, { label: 'Description', placeholder: 'Describe the issue…', rows: 3 }),
      h(Textarea, { label: 'Notes', placeholder: 'Add notes…', rows: 3, error: 'Notes are required' }),
    ),
  variants: [
    {
      label: 'States',
      preview: () =>
        h('div', { className: 'flex flex-col gap-4 max-w-sm' },
          h(Textarea, { label: 'Default', placeholder: 'Enter text…', rows: 3 }),
          h(Textarea, { label: 'Error', placeholder: 'Enter text…', rows: 3, error: 'This field is required' }),
          h(Textarea, { label: 'Disabled', placeholder: 'Read only', rows: 3, disabled: true }),
        ),
    },
  ],
  usage: `import { Textarea } from '@ds/ui'

// Basic usage
<Textarea label="Description" placeholder="Describe the issue…" rows={4} />

// Controlled with error
<Textarea
  label="Notes"
  value={notes}
  onChange={e => setNotes(e.target.value)}
  error={errors.notes}
  rows={5}
/>`,
  props: [
    { name: 'label', type: 'string', description: 'Field label rendered above the textarea.' },
    { name: 'hint', type: 'string', description: 'Helper text shown below the textarea when there is no error.' },
    { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
    { name: 'error', type: 'string', description: 'Validation error message shown below the field. Replaces hint.' },
    { name: 'rows', type: 'number', default: '3', description: 'Number of visible text rows.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the textarea.' },
    { name: '...rest', type: 'React.TextareaHTMLAttributes<HTMLTextAreaElement>', description: 'All native textarea attributes.' },
  ],
  tokens: [
    { name: '--input-radius', value: 'var(--radius-md)', description: 'Border radius shared with Input.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Default border color.' },
  ],
}

export const selectDoc: ComponentDoc = {
  title: 'Select',
  slug: 'select',
  description:
    'A dropdown selector for choosing one option from a predefined list. Renders a styled native select or custom listbox depending on implementation.',
  whenToUse: [
    'Choosing one value from 5–15 options',
    'Country, timezone, category, or role pickers',
  ],
  whenNotToUse: [
    'Fewer than 4 options that would all fit on screen — use Radio instead',
    'Multi-select — use a Checkbox group or multi-select combobox',
    'More than ~20 options — add search/filter with a combobox',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-4 max-w-sm' },
      h(Select, {
        label: 'Role',
        options: [
          { value: 'admin', label: 'Admin' },
          { value: 'editor', label: 'Editor' },
          { value: 'viewer', label: 'Viewer' },
        ],
        onValueChange: () => {},
      }),
      h(Select, {
        label: 'Status',
        options: [
          { value: 'active', label: 'Active' },
          { value: 'inactive', label: 'Inactive' },
        ],
        error: 'Please select a status',
        onValueChange: () => {},
      }),
    ),
  variants: [
    {
      label: 'States',
      preview: () =>
        h('div', { className: 'flex flex-col gap-4 max-w-sm' },
          h(Select, {
            label: 'Default',
            options: [{ value: 'a', label: 'Option A' }, { value: 'b', label: 'Option B' }],
            onValueChange: () => {},
          }),
          h(Select, {
            label: 'Error',
            options: [{ value: 'a', label: 'Option A' }],
            error: 'Selection required',
            onValueChange: () => {},
          }),
          h(Select, {
            label: 'Disabled',
            options: [{ value: 'a', label: 'Option A' }],
            disabled: true,
            onValueChange: () => {},
          }),
        ),
    },
  ],
  usage: `import { Select } from '@ds/ui'

<Select
  label="Timezone"
  options={timezones.map(tz => ({ value: tz.id, label: tz.name }))}
  onValueChange={value => setTimezone(value)}
  error={errors.timezone}
/>`,
  props: [
    { name: 'options', type: '{ value: string; label: string }[]', required: true, description: 'The list of selectable options.' },
    { name: 'label', type: 'string', description: 'Field label.' },
    { name: 'hint', type: 'string', description: 'Helper text shown below the select when there is no error.' },
    { name: 'error', type: 'string', description: 'Validation error message. Replaces hint.' },
    { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the selected value changes.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
    { name: '...rest', type: 'React.SelectHTMLAttributes<HTMLSelectElement>', description: 'Native select attributes including value and defaultValue.' },
  ],
  tokens: [
    { name: '--input-radius', value: 'var(--radius-md)', description: 'Border radius of the select control.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Default border color.' },
  ],
}

export const checkboxDoc: ComponentDoc = {
  title: 'Checkbox',
  slug: 'checkbox',
  description:
    'A boolean input that lets users toggle an option on or off. Can also represent an indeterminate state for "select all" patterns.',
  whenToUse: [
    'Enabling or disabling a single feature or setting',
    'Multi-select lists where any combination is valid',
    'Agreement or consent checkboxes in forms',
  ],
  whenNotToUse: [
    'Mutually exclusive options — use Radio instead',
    'Immediate on/off actions — use Toggle instead',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3' },
      h(Checkbox, { label: 'Send email notifications', checked: true, onChange: () => {} }),
      h(Checkbox, { label: 'Subscribe to newsletter', checked: false, onChange: () => {} }),
      h(Checkbox, { label: 'Disabled option', checked: false, onChange: () => {}, disabled: true }),
    ),
  variants: [
    {
      label: 'States',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3' },
          h(Checkbox, { label: 'Unchecked', checked: false, onChange: () => {} }),
          h(Checkbox, { label: 'Checked', checked: true, onChange: () => {} }),
          h(Checkbox, { label: 'Indeterminate', checked: false, indeterminate: true, onChange: () => {} }),
          h(Checkbox, { label: 'Disabled', checked: false, onChange: () => {}, disabled: true }),
        ),
    },
  ],
  usage: `import { Checkbox } from '@ds/ui'

// Single preference
<Checkbox
  label="Send weekly digest"
  checked={prefs.weeklyDigest}
  onChange={checked => setPrefs({ ...prefs, weeklyDigest: checked })}
/>

// Indeterminate — "select all" with mixed selection
<Checkbox
  label="Select all"
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={toggleAll}
/>`,
  props: [
    { name: 'label', type: 'string', required: true, description: 'Visible label for the checkbox.' },
    { name: 'checked', type: 'boolean', description: 'Whether the checkbox is checked.' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Renders the indeterminate (dash) state. Typically used for "select all" when only some items are selected.' },
    { name: 'onChange', type: '(checked: boolean) => void', required: true, description: 'Called with the new boolean value on change.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
    { name: '...rest', type: 'React.InputHTMLAttributes<HTMLInputElement>', description: 'Native input attributes (excluding type and onChange).' },
  ],
  tokens: [
    { name: '--color-brand', value: 'var(--color-blue-600)', description: 'Checked and indeterminate fill color.' },
    { name: '--color-brand-hover', value: 'var(--color-blue-700)', description: 'Hover fill color when checked.' },
    { name: '--color-border', value: 'var(--color-slate-200)', description: 'Unchecked border color.' },
  ],
}

export const radioDoc: ComponentDoc = {
  title: 'Radio',
  slug: 'radio',
  description:
    'A single radio input. Rendered inside a Radio.Group (or manually managed) to represent one option in a mutually exclusive set.',
  whenToUse: [
    'Mutually exclusive choices where only one option can be selected',
    'Fewer than ~6 options that should all be visible at once',
    'Settings or preference screens with clear labeled options',
  ],
  whenNotToUse: [
    'More than 6 options — use Select instead',
    'Non-exclusive selections — use Checkbox instead',
    'Binary on/off — use Toggle instead',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3' },
      h(Radio, { label: 'Standard shipping (3–5 days)', value: 'standard', checked: true, onChange: () => {} }),
      h(Radio, { label: 'Express shipping (1–2 days)', value: 'express', checked: false, onChange: () => {} }),
      h(Radio, { label: 'Overnight shipping', value: 'overnight', checked: false, onChange: () => {} }),
    ),
  variants: [
    {
      label: 'States',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3' },
          h(Radio, { label: 'Unselected', value: 'a', checked: false, onChange: () => {} }),
          h(Radio, { label: 'Selected', value: 'b', checked: true, onChange: () => {} }),
          h(Radio, { label: 'Disabled', value: 'c', checked: false, onChange: () => {}, disabled: true }),
        ),
    },
  ],
  usage: `import { Radio } from '@ds/ui'

// Managed as a group
{['email', 'sms', 'push'].map(channel => (
  <Radio
    key={channel}
    label={channel.charAt(0).toUpperCase() + channel.slice(1)}
    value={channel}
    checked={notifChannel === channel}
    onChange={() => setNotifChannel(channel)}
  />
))}`,
  props: [
    { name: 'label', type: 'string', required: true, description: 'Visible label for the radio option.' },
    { name: 'value', type: 'string', required: true, description: 'The value this radio represents.' },
    { name: 'checked', type: 'boolean', required: true, description: 'Whether this radio is selected.' },
    { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called when this radio is selected.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Selected state dot and ring color.' },
  ],
}

export const toggleDoc: ComponentDoc = {
  title: 'Toggle',
  slug: 'toggle',
  description:
    'A switch control for binary on/off settings. Provides immediate visual feedback without a submit action. Equivalent to a checkbox semantically but styled as a sliding toggle.',
  whenToUse: [
    'Enabling or disabling a setting that takes effect immediately',
    'Feature flags and preferences in settings panels',
  ],
  whenNotToUse: [
    'Selections that require form submission — use Checkbox instead',
    'Choosing between more than two states',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-3' },
      h(Toggle, { label: 'Dark mode', checked: true, onChange: () => {} }),
      h(Toggle, { label: 'Email notifications', checked: false, onChange: () => {} }),
      h(Toggle, { label: 'Beta features', checked: false, onChange: () => {}, disabled: true }),
    ),
  variants: [
    {
      label: 'States',
      preview: () =>
        h('div', { className: 'flex flex-col gap-3' },
          h(Toggle, { label: 'Off', checked: false, onChange: () => {} }),
          h(Toggle, { label: 'On', checked: true, onChange: () => {} }),
          h(Toggle, { label: 'Disabled off', checked: false, onChange: () => {}, disabled: true }),
        ),
    },
  ],
  usage: `import { Toggle } from '@ds/ui'

<Toggle
  label="Enable two-factor authentication"
  checked={settings.twoFactor}
  onChange={enabled => updateSetting('twoFactor', enabled)}
/>`,
  props: [
    { name: 'label', type: 'string', required: true, description: 'Visible label for the toggle.' },
    { name: 'checked', type: 'boolean', required: true, description: 'Current on/off state.' },
    { name: 'onChange', type: '(checked: boolean) => void', required: true, description: 'Called with the new boolean value.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Active (on) track color.' },
    { name: '--color-surface', value: '#f9fafb', description: 'Inactive track background.' },
  ],
}

export const sliderDoc: ComponentDoc = {
  title: 'Slider',
  slug: 'slider',
  description:
    'A range input for selecting a numeric value within a defined minimum and maximum. Supports custom step intervals.',
  whenToUse: [
    'Setting a value within a continuous or stepped range: volume, brightness, price range',
    'When the exact number matters less than approximate position',
  ],
  whenNotToUse: [
    'Precise numeric entry — use a number Input instead',
    'Binary states — use Toggle',
    'Very large ranges with fine precision requirements',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-6 max-w-sm' },
      h(Slider, { min: 0, max: 100, value: 40, step: 1, onChange: () => {} }),
      h(Slider, { min: 0, max: 1000, value: 500, step: 50, onChange: () => {} }),
      h(Slider, { min: 0, max: 100, value: 70, step: 10, onChange: () => {}, disabled: true }),
    ),
  variants: [
    {
      label: 'Steps',
      preview: () =>
        h('div', { className: 'flex flex-col gap-6 max-w-sm' },
          h(Slider, { min: 0, max: 100, value: 30, step: 1, onChange: () => {} }),
          h(Slider, { min: 0, max: 100, value: 50, step: 25, onChange: () => {} }),
        ),
    },
  ],
  usage: `import { Slider } from '@ds/ui'

// Volume control
<Slider
  min={0}
  max={100}
  value={volume}
  step={1}
  onChange={setVolume}
/>

// Price range with step
<Slider
  min={0}
  max={10000}
  value={budget}
  step={500}
  onChange={setBudget}
/>`,
  props: [
    { name: 'min', type: 'number', required: true, description: 'Minimum value of the range.' },
    { name: 'max', type: 'number', required: true, description: 'Maximum value of the range.' },
    { name: 'value', type: 'number', required: true, description: 'Current value.' },
    { name: 'step', type: 'number', default: '1', description: 'Increment between selectable values.' },
    { name: 'onChange', type: '(value: number) => void', required: true, description: 'Called with the new value on change.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the slider.' },
  ],
  tokens: [
    { name: '--color-brand', value: '#2563eb', description: 'Filled track and thumb color.' },
    { name: '--color-border', value: '#e5e7eb', description: 'Unfilled track color.' },
  ],
}

export const datePickerDoc: ComponentDoc = {
  title: 'Date Picker',
  slug: 'date-picker',
  description:
    'A date input with a calendar popover for selecting a single date. Supports minimum and maximum date constraints and keyboard navigation.',
  whenToUse: [
    'Selecting a birth date, appointment date, or deadline',
    'When a calendar view aids date comprehension',
    'Forms with date constraints (e.g. must be in the future)',
  ],
  whenNotToUse: [
    'Date ranges — use a DateRangePicker',
    'Time-only selection — use a time input',
    'Approximate dates (month/year only) — use separate selects',
  ],
  preview: () =>
    h('div', { className: 'flex flex-col gap-4 max-w-sm' },
      h(DatePicker, { label: 'Start date', value: new Date('2025-06-15'), onChange: () => {} }),
      h(DatePicker, { label: 'Deadline', value: undefined, onChange: () => {}, minDate: new Date() }),
    ),
  variants: [
    {
      label: 'States',
      preview: () =>
        h('div', { className: 'flex flex-col gap-4 max-w-sm' },
          h(DatePicker, { label: 'Default', value: new Date('2025-03-01'), onChange: () => {} }),
          h(DatePicker, { label: 'Disabled', value: new Date('2025-01-01'), onChange: () => {}, disabled: true }),
        ),
    },
  ],
  usage: `import { DatePicker } from '@ds/ui'

<DatePicker
  label="Due date"
  value={dueDate}
  onChange={setDueDate}
  minDate={new Date()}
/>

// With max constraint
<DatePicker
  label="Date of birth"
  value={dob}
  onChange={setDob}
  maxDate={new Date()}
/>`,
  props: [
    { name: 'label', type: 'string', description: 'Field label rendered above the input.' },
    { name: 'value', type: 'Date | undefined', description: 'The currently selected date.' },
    { name: 'onChange', type: '(date: Date) => void', required: true, description: 'Called when a date is selected.' },
    { name: 'minDate', type: 'Date', description: 'Earliest selectable date.' },
    { name: 'maxDate', type: 'Date', description: 'Latest selectable date.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the picker.' },
  ],
  tokens: [
    { name: '--input-radius', value: 'var(--radius-md)', description: 'Input field border radius.' },
    { name: '--color-brand', value: '#2563eb', description: 'Selected date highlight color.' },
  ],
}
