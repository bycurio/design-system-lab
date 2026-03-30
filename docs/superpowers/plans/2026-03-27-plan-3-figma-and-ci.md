# Figma Code Connect & CI/CD — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect all 40 Figma components to their React counterparts via Code Connect, and automate publishing on every merge to main via GitHub Actions.

**Architecture:** Each component has a co-located `.figma.tsx` file in `packages/ui/src/components/`. The file maps Figma component properties to React props using the `@figma/code-connect` package. A GitHub Actions workflow runs `figma connect publish` on every push to `main` using a stored `FIGMA_ACCESS_TOKEN` secret.

**Tech Stack:** @figma/code-connect ^1.3.6, GitHub Actions, Figma Variables (manual setup)

---

## File Map

**Created:**
- `packages/ui/figma.config.json`
- `packages/ui/src/components/Button.figma.tsx`
- `packages/ui/src/components/IconButton.figma.tsx`
- `packages/ui/src/components/Link.figma.tsx`
- `packages/ui/src/components/FAB.figma.tsx`
- `packages/ui/src/components/SplitButton.figma.tsx`
- `packages/ui/src/components/Input.figma.tsx`
- `packages/ui/src/components/Textarea.figma.tsx`
- `packages/ui/src/components/Select.figma.tsx`
- `packages/ui/src/components/Checkbox.figma.tsx`
- `packages/ui/src/components/Radio.figma.tsx`
- `packages/ui/src/components/Toggle.figma.tsx`
- `packages/ui/src/components/Slider.figma.tsx`
- `packages/ui/src/components/DatePicker.figma.tsx`
- `packages/ui/src/components/NavBar.figma.tsx`
- `packages/ui/src/components/Tabs.figma.tsx`
- `packages/ui/src/components/Breadcrumb.figma.tsx`
- `packages/ui/src/components/Sidebar.figma.tsx`
- `packages/ui/src/components/Pagination.figma.tsx`
- `packages/ui/src/components/Badge.figma.tsx`
- `packages/ui/src/components/Toast.figma.tsx`
- `packages/ui/src/components/Alert.figma.tsx`
- `packages/ui/src/components/Tooltip.figma.tsx`
- `packages/ui/src/components/Progress.figma.tsx`
- `packages/ui/src/components/Skeleton.figma.tsx`
- `packages/ui/src/components/Spinner.figma.tsx`
- `packages/ui/src/components/Card.figma.tsx`
- `packages/ui/src/components/Modal.figma.tsx`
- `packages/ui/src/components/Drawer.figma.tsx`
- `packages/ui/src/components/Popover.figma.tsx`
- `packages/ui/src/components/Accordion.figma.tsx`
- `packages/ui/src/components/Divider.figma.tsx`
- `packages/ui/src/components/Table.figma.tsx`
- `packages/ui/src/components/List.figma.tsx`
- `packages/ui/src/components/Avatar.figma.tsx`
- `packages/ui/src/components/Chip.figma.tsx`
- `packages/ui/src/components/Heading.figma.tsx`
- `packages/ui/src/components/Body.figma.tsx`
- `packages/ui/src/components/Label.figma.tsx`
- `packages/ui/src/components/Caption.figma.tsx`
- `packages/ui/src/components/Code.figma.tsx`
- `.github/workflows/code-connect.yml`

**Modified:**
- `packages/ui/package.json` — add `@figma/code-connect` devDependency + figma scripts

---

## NODE ID NOTE

Every `.figma.tsx` file uses a placeholder URL:
```
https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID
```

The file key `ITyTagLQEj5b75iqsmPyl6` is correct. Replace `REPLACE_WITH_NODE_ID` with the real node ID for each component after creating them in Figma (see Task 1).

---

### Task 1: Get Figma node IDs (manual step)

**Files:** None — this is a discovery step.

- [ ] **Step 1: Open the Figma file**

  Open: `https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab`

- [ ] **Step 2: For each component, copy its node link**

  In Figma: right-click the component set on the canvas → "Copy link to selection".
  The URL looks like: `https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/...?node-id=123-456`
  Extract the `node-id` value (e.g., `123-456` — note: URL encodes `:` as `-`, both formats work).

- [ ] **Step 3: Record node IDs in this table**

  | Component | Node ID |
  |---|---|
  | Button | |
  | IconButton | |
  | Link | |
  | FAB | |
  | SplitButton | |
  | Input | |
  | Textarea | |
  | Select | |
  | Checkbox | |
  | Radio | |
  | Toggle | |
  | Slider | |
  | DatePicker | |
  | NavBar | |
  | Tabs | |
  | Breadcrumb | |
  | Sidebar | |
  | Pagination | |
  | Badge | |
  | Toast | |
  | Alert | |
  | Tooltip | |
  | Progress | |
  | Skeleton | |
  | Spinner | |
  | Card | |
  | Modal | |
  | Drawer | |
  | Popover | |
  | Accordion | |
  | Divider | |
  | Table | |
  | List | |
  | Avatar | |
  | Chip | |
  | Heading | |
  | Body | |
  | Label | |
  | Caption | |
  | Code | |

---

### Task 2: Install @figma/code-connect

**Files:**
- Modify: `packages/ui/package.json`
- Create: `packages/ui/figma.config.json`

- [ ] **Step 1: Add devDependency and scripts to `packages/ui/package.json`**

  Add to `devDependencies`:
  ```json
  "@figma/code-connect": "^1.3.6"
  ```
  Add to `scripts`:
  ```json
  "figma:publish": "figma connect publish",
  "figma:unpublish": "figma connect unpublish",
  "figma:validate": "figma connect validate"
  ```

- [ ] **Step 2: Create `packages/ui/figma.config.json`**

  ```json
  {
    "codeConnect": {
      "include": ["src/components/**/*.figma.tsx"],
      "parser": "react"
    }
  }
  ```

- [ ] **Step 3: Install**

  ```bash
  npm install
  ```
  Expected: `@figma/code-connect` appears in `packages/ui/node_modules/`.

- [ ] **Step 4: Verify CLI available**

  ```bash
  cd packages/ui && npx figma connect --help
  ```
  Expected: Figma Code Connect CLI help text printed.

- [ ] **Step 5: Commit**

  ```bash
  git add packages/ui/package.json packages/ui/figma.config.json package-lock.json
  git commit -m "feat(ui): install @figma/code-connect"
  ```

---

### Task 3: Button.figma.tsx (full exemplar)

**Files:**
- Create: `packages/ui/src/components/Button.figma.tsx`

- [ ] **Step 1: Create the file**

  ```tsx
  // packages/ui/src/components/Button.figma.tsx
  import figma from '@figma/code-connect';
  import { Button } from './Button';

  figma.connect(Button, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      variant: figma.enum('Variant', {
        Primary: 'primary',
        Secondary: 'secondary',
        Ghost: 'ghost',
        Danger: 'danger',
      }),
      size: figma.enum('Size', {
        Small: 'sm',
        Medium: 'md',
        Large: 'lg',
      }),
      label: figma.string('Label'),
      disabled: figma.boolean('Disabled'),
      loading: figma.boolean('Loading'),
    },
    example: ({ variant, size, label, disabled, loading }) => (
      <Button variant={variant} size={size} disabled={disabled} loading={loading}>
        {label}
      </Button>
    ),
  });
  ```

- [ ] **Step 2: Validate (after replacing node ID)**

  Replace `REPLACE_WITH_NODE_ID` with the Button node ID from Task 1, then:
  ```bash
  cd packages/ui && npm run figma:validate
  ```
  Expected: "1 component found, 0 errors"

- [ ] **Step 3: Commit**

  ```bash
  git add packages/ui/src/components/Button.figma.tsx
  git commit -m "feat(ui): add Code Connect for Button"
  ```

---

### Task 4: Actions Code Connect files

**Files:**
- Create: `packages/ui/src/components/IconButton.figma.tsx`
- Create: `packages/ui/src/components/Link.figma.tsx`
- Create: `packages/ui/src/components/FAB.figma.tsx`
- Create: `packages/ui/src/components/SplitButton.figma.tsx`

- [ ] **Step 1: Create `IconButton.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { IconButton } from './IconButton';
  import { Plus } from 'lucide-react';

  figma.connect(IconButton, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      variant: figma.enum('Variant', { Primary: 'primary', Secondary: 'secondary', Ghost: 'ghost', Danger: 'danger' }),
      size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
      disabled: figma.boolean('Disabled'),
      loading: figma.boolean('Loading'),
    },
    example: ({ variant, size, disabled, loading }) => (
      <IconButton icon={<Plus />} label="Add" variant={variant} size={size} disabled={disabled} loading={loading} />
    ),
  });
  ```

- [ ] **Step 2: Create `Link.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Link } from './Link';

  figma.connect(Link, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      label: figma.string('Label'),
      variant: figma.enum('Variant', { Default: 'default', Muted: 'muted' }),
      external: figma.boolean('External'),
    },
    example: ({ label, variant, external }) => (
      <Link href="#" variant={variant} external={external}>{label}</Link>
    ),
  });
  ```

- [ ] **Step 3: Create `FAB.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { FAB } from './FAB';
  import { Plus } from 'lucide-react';

  figma.connect(FAB, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
    },
    example: ({ size }) => (
      <FAB icon={<Plus />} label="Add" size={size} onClick={() => {}} />
    ),
  });
  ```

- [ ] **Step 4: Create `SplitButton.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { SplitButton } from './SplitButton';

  figma.connect(SplitButton, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      label: figma.string('Label'),
      variant: figma.enum('Variant', { Primary: 'primary', Secondary: 'secondary', Ghost: 'ghost', Danger: 'danger' }),
      size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
      disabled: figma.boolean('Disabled'),
    },
    example: ({ label, variant, size, disabled }) => (
      <SplitButton label={label} variant={variant} size={size} disabled={disabled} onClick={() => {}} onMenuClick={() => {}} />
    ),
  });
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add packages/ui/src/components/IconButton.figma.tsx packages/ui/src/components/Link.figma.tsx packages/ui/src/components/FAB.figma.tsx packages/ui/src/components/SplitButton.figma.tsx
  git commit -m "feat(ui): add Code Connect for Actions components"
  ```

---

### Task 5: Forms Code Connect files

**Files:**
- Create: `packages/ui/src/components/Input.figma.tsx`
- Create: `packages/ui/src/components/Textarea.figma.tsx`
- Create: `packages/ui/src/components/Select.figma.tsx`
- Create: `packages/ui/src/components/Checkbox.figma.tsx`
- Create: `packages/ui/src/components/Radio.figma.tsx`
- Create: `packages/ui/src/components/Toggle.figma.tsx`
- Create: `packages/ui/src/components/Slider.figma.tsx`
- Create: `packages/ui/src/components/DatePicker.figma.tsx`

- [ ] **Step 1: Create `Input.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Input } from './Input';

  figma.connect(Input, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      placeholder: figma.string('Placeholder'),
      variant: figma.enum('Variant', { Default: 'default', Error: 'error', Disabled: 'disabled' }),
    },
    example: ({ placeholder, variant }) => (
      <Input placeholder={placeholder} variant={variant} />
    ),
  });
  ```

- [ ] **Step 2: Create `Textarea.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Textarea } from './Textarea';

  figma.connect(Textarea, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      placeholder: figma.string('Placeholder'),
      variant: figma.enum('Variant', { Default: 'default', Error: 'error', Disabled: 'disabled' }),
      resize: figma.enum('Resize', { None: 'none', Vertical: 'vertical', Both: 'both' }),
    },
    example: ({ placeholder, variant, resize }) => (
      <Textarea placeholder={placeholder} variant={variant} resize={resize} />
    ),
  });
  ```

- [ ] **Step 3: Create `Select.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Select } from './Select';

  figma.connect(Select, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      placeholder: figma.string('Placeholder'),
      variant: figma.enum('Variant', { Default: 'default', Error: 'error', Disabled: 'disabled' }),
    },
    example: ({ placeholder, variant }) => (
      <Select
        placeholder={placeholder}
        variant={variant}
        options={[{ label: 'Option 1', value: 'option-1' }, { label: 'Option 2', value: 'option-2' }]}
        value=""
        onChange={() => {}}
      />
    ),
  });
  ```

- [ ] **Step 4: Create `Checkbox.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Checkbox } from './Checkbox';

  figma.connect(Checkbox, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      label: figma.string('Label'),
      checked: figma.boolean('Checked'),
      indeterminate: figma.boolean('Indeterminate'),
      disabled: figma.boolean('Disabled'),
    },
    example: ({ label, checked, indeterminate, disabled }) => (
      <Checkbox label={label} checked={checked} indeterminate={indeterminate} disabled={disabled} onChange={() => {}} />
    ),
  });
  ```

- [ ] **Step 5: Create `Radio.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Radio } from './Radio';

  figma.connect(Radio, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      label: figma.string('Label'),
      checked: figma.boolean('Checked'),
      disabled: figma.boolean('Disabled'),
    },
    example: ({ label, checked, disabled }) => (
      <Radio label={label} value="option" checked={checked} disabled={disabled} onChange={() => {}} />
    ),
  });
  ```

- [ ] **Step 6: Create `Toggle.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Toggle } from './Toggle';

  figma.connect(Toggle, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      label: figma.string('Label'),
      checked: figma.boolean('On'),
      size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
      disabled: figma.boolean('Disabled'),
    },
    example: ({ label, checked, size, disabled }) => (
      <Toggle label={label} checked={checked} size={size} disabled={disabled} onChange={() => {}} />
    ),
  });
  ```

- [ ] **Step 7: Create `Slider.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Slider } from './Slider';

  figma.connect(Slider, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      disabled: figma.boolean('Disabled'),
    },
    example: ({ disabled }) => (
      <Slider min={0} max={100} value={50} disabled={disabled} onChange={() => {}} />
    ),
  });
  ```

- [ ] **Step 8: Create `DatePicker.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { DatePicker } from './DatePicker';

  figma.connect(DatePicker, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      disabled: figma.boolean('Disabled'),
    },
    example: ({ disabled }) => (
      <DatePicker value="" disabled={disabled} onChange={() => {}} />
    ),
  });
  ```

- [ ] **Step 9: Commit**

  ```bash
  git add packages/ui/src/components/Input.figma.tsx packages/ui/src/components/Textarea.figma.tsx packages/ui/src/components/Select.figma.tsx packages/ui/src/components/Checkbox.figma.tsx packages/ui/src/components/Radio.figma.tsx packages/ui/src/components/Toggle.figma.tsx packages/ui/src/components/Slider.figma.tsx packages/ui/src/components/DatePicker.figma.tsx
  git commit -m "feat(ui): add Code Connect for Forms components"
  ```

---

### Task 6: Navigation Code Connect files

**Files:**
- Create: `packages/ui/src/components/NavBar.figma.tsx`
- Create: `packages/ui/src/components/Tabs.figma.tsx`
- Create: `packages/ui/src/components/Breadcrumb.figma.tsx`
- Create: `packages/ui/src/components/Sidebar.figma.tsx`
- Create: `packages/ui/src/components/Pagination.figma.tsx`

- [ ] **Step 1: Create `NavBar.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { NavBar } from './NavBar';

  figma.connect(NavBar, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      sticky: figma.boolean('Sticky'),
    },
    example: ({ sticky }) => (
      <NavBar
        logo={<span className="font-semibold">Logo</span>}
        items={[
          { label: 'Home', href: '/', active: true },
          { label: 'About', href: '/about' },
        ]}
        sticky={sticky}
      />
    ),
  });
  ```

- [ ] **Step 2: Create `Tabs.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Tabs } from './Tabs';

  figma.connect(Tabs, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {},
    example: () => (
      <Tabs
        defaultActive="tab1"
        items={[
          { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
          { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
          { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> },
        ]}
      />
    ),
  });
  ```

- [ ] **Step 3: Create `Breadcrumb.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Breadcrumb } from './Breadcrumb';

  figma.connect(Breadcrumb, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {},
    example: () => (
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: 'Breadcrumb' },
        ]}
      />
    ),
  });
  ```

- [ ] **Step 4: Create `Sidebar.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Sidebar } from './Sidebar';
  import { LayoutDashboard, Settings, Users } from 'lucide-react';

  figma.connect(Sidebar, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      collapsible: figma.boolean('Collapsible'),
    },
    example: ({ collapsible }) => (
      <Sidebar
        collapsible={collapsible}
        items={[
          { label: 'Dashboard', href: '/', icon: <LayoutDashboard />, active: true },
          { label: 'Users', href: '/users', icon: <Users /> },
          { label: 'Settings', href: '/settings', icon: <Settings /> },
        ]}
      />
    ),
  });
  ```

- [ ] **Step 5: Create `Pagination.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Pagination } from './Pagination';

  figma.connect(Pagination, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {},
    example: () => (
      <Pagination page={3} totalPages={10} onChange={() => {}} />
    ),
  });
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add packages/ui/src/components/NavBar.figma.tsx packages/ui/src/components/Tabs.figma.tsx packages/ui/src/components/Breadcrumb.figma.tsx packages/ui/src/components/Sidebar.figma.tsx packages/ui/src/components/Pagination.figma.tsx
  git commit -m "feat(ui): add Code Connect for Navigation components"
  ```

---

### Task 7: Feedback Code Connect files

**Files:**
- Create: `packages/ui/src/components/Badge.figma.tsx`
- Create: `packages/ui/src/components/Toast.figma.tsx`
- Create: `packages/ui/src/components/Alert.figma.tsx`
- Create: `packages/ui/src/components/Tooltip.figma.tsx`
- Create: `packages/ui/src/components/Progress.figma.tsx`
- Create: `packages/ui/src/components/Skeleton.figma.tsx`
- Create: `packages/ui/src/components/Spinner.figma.tsx`

- [ ] **Step 1: Create `Badge.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Badge } from './Badge';

  figma.connect(Badge, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      label: figma.string('Label'),
      variant: figma.enum('Variant', { Info: 'info', Success: 'success', Danger: 'danger', Warning: 'warning', Neutral: 'neutral' }),
      size: figma.enum('Size', { Small: 'sm', Medium: 'md' }),
    },
    example: ({ label, variant, size }) => (
      <Badge label={label} variant={variant} size={size} />
    ),
  });
  ```

- [ ] **Step 2: Create `Toast.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Toast } from './Toast';

  figma.connect(Toast, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      message: figma.string('Message'),
      variant: figma.enum('Variant', { Info: 'info', Success: 'success', Danger: 'danger', Warning: 'warning' }),
    },
    example: ({ message, variant }) => (
      <Toast message={message} variant={variant} onDismiss={() => {}} />
    ),
  });
  ```

- [ ] **Step 3: Create `Alert.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Alert } from './Alert';

  figma.connect(Alert, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      title: figma.string('Title'),
      message: figma.string('Message'),
      variant: figma.enum('Variant', { Info: 'info', Success: 'success', Danger: 'danger', Warning: 'warning' }),
      dismissible: figma.boolean('Dismissible'),
    },
    example: ({ title, message, variant, dismissible }) => (
      <Alert title={title} message={message} variant={variant} dismissible={dismissible} onDismiss={() => {}} />
    ),
  });
  ```

- [ ] **Step 4: Create `Tooltip.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Tooltip } from './Tooltip';
  import { Button } from './Button';

  figma.connect(Tooltip, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      content: figma.string('Content'),
      side: figma.enum('Side', { Top: 'top', Right: 'right', Bottom: 'bottom', Left: 'left' }),
    },
    example: ({ content, side }) => (
      <Tooltip content={content} side={side}>
        <Button variant="secondary">Hover me</Button>
      </Tooltip>
    ),
  });
  ```

- [ ] **Step 5: Create `Progress.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Progress } from './Progress';

  figma.connect(Progress, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      variant: figma.enum('Variant', { Default: 'default', Success: 'success', Danger: 'danger', Warning: 'warning' }),
      size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
    },
    example: ({ variant, size }) => (
      <Progress value={60} variant={variant} size={size} />
    ),
  });
  ```

- [ ] **Step 6: Create `Skeleton.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Skeleton } from './Skeleton';

  figma.connect(Skeleton, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      rounded: figma.boolean('Rounded'),
    },
    example: ({ rounded }) => (
      <Skeleton rounded={rounded} count={3} />
    ),
  });
  ```

- [ ] **Step 7: Create `Spinner.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Spinner } from './Spinner';

  figma.connect(Spinner, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg' }),
    },
    example: ({ size }) => (
      <Spinner size={size} />
    ),
  });
  ```

- [ ] **Step 8: Commit**

  ```bash
  git add packages/ui/src/components/Badge.figma.tsx packages/ui/src/components/Toast.figma.tsx packages/ui/src/components/Alert.figma.tsx packages/ui/src/components/Tooltip.figma.tsx packages/ui/src/components/Progress.figma.tsx packages/ui/src/components/Skeleton.figma.tsx packages/ui/src/components/Spinner.figma.tsx
  git commit -m "feat(ui): add Code Connect for Feedback components"
  ```

---

### Task 8: Containers Code Connect files

**Files:**
- Create: `packages/ui/src/components/Card.figma.tsx`
- Create: `packages/ui/src/components/Modal.figma.tsx`
- Create: `packages/ui/src/components/Drawer.figma.tsx`
- Create: `packages/ui/src/components/Popover.figma.tsx`
- Create: `packages/ui/src/components/Accordion.figma.tsx`
- Create: `packages/ui/src/components/Divider.figma.tsx`

- [ ] **Step 1: Create `Card.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Card } from './Card';

  figma.connect(Card, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      padding: figma.enum('Padding', { None: 'none', Small: 'sm', Medium: 'md', Large: 'lg' }),
    },
    example: ({ padding }) => (
      <Card padding={padding}>
        <p>Card content goes here</p>
      </Card>
    ),
  });
  ```

- [ ] **Step 2: Create `Modal.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Modal } from './Modal';

  figma.connect(Modal, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      title: figma.string('Title'),
      size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg', Full: 'full' }),
    },
    example: ({ title, size }) => (
      <Modal open={true} onClose={() => {}} title={title} size={size}>
        <p>Modal content goes here</p>
      </Modal>
    ),
  });
  ```

- [ ] **Step 3: Create `Drawer.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Drawer } from './Drawer';

  figma.connect(Drawer, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      title: figma.string('Title'),
      side: figma.enum('Side', { Left: 'left', Right: 'right', Top: 'top', Bottom: 'bottom' }),
    },
    example: ({ title, side }) => (
      <Drawer open={true} onClose={() => {}} title={title} side={side}>
        <p>Drawer content goes here</p>
      </Drawer>
    ),
  });
  ```

- [ ] **Step 4: Create `Popover.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Popover } from './Popover';
  import { Button } from './Button';

  figma.connect(Popover, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      side: figma.enum('Side', { Top: 'top', Right: 'right', Bottom: 'bottom', Left: 'left' }),
    },
    example: ({ side }) => (
      <Popover
        trigger={<Button variant="secondary">Open</Button>}
        content={<p>Popover content</p>}
        side={side}
      />
    ),
  });
  ```

- [ ] **Step 5: Create `Accordion.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Accordion } from './Accordion';

  figma.connect(Accordion, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      allowMultiple: figma.boolean('Allow Multiple'),
    },
    example: ({ allowMultiple }) => (
      <Accordion
        allowMultiple={allowMultiple}
        items={[
          { id: '1', trigger: 'Section 1', content: <p>Content for section 1</p> },
          { id: '2', trigger: 'Section 2', content: <p>Content for section 2</p> },
          { id: '3', trigger: 'Section 3', content: <p>Content for section 3</p> },
        ]}
      />
    ),
  });
  ```

- [ ] **Step 6: Create `Divider.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Divider } from './Divider';

  figma.connect(Divider, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      orientation: figma.enum('Orientation', { Horizontal: 'horizontal', Vertical: 'vertical' }),
      label: figma.string('Label'),
    },
    example: ({ orientation, label }) => (
      <Divider orientation={orientation} label={label || undefined} />
    ),
  });
  ```

- [ ] **Step 7: Commit**

  ```bash
  git add packages/ui/src/components/Card.figma.tsx packages/ui/src/components/Modal.figma.tsx packages/ui/src/components/Drawer.figma.tsx packages/ui/src/components/Popover.figma.tsx packages/ui/src/components/Accordion.figma.tsx packages/ui/src/components/Divider.figma.tsx
  git commit -m "feat(ui): add Code Connect for Containers components"
  ```

---

### Task 9: Data Code Connect files

**Files:**
- Create: `packages/ui/src/components/Table.figma.tsx`
- Create: `packages/ui/src/components/List.figma.tsx`
- Create: `packages/ui/src/components/Avatar.figma.tsx`
- Create: `packages/ui/src/components/Chip.figma.tsx`

- [ ] **Step 1: Create `Table.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Table } from './Table';

  figma.connect(Table, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {},
    example: () => (
      <Table
        columns={[
          { key: 'name', header: 'Name', sortable: true },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
        ]}
        data={[
          { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
          { name: 'Bob', email: 'bob@example.com', role: 'Member' },
        ]}
      />
    ),
  });
  ```

- [ ] **Step 2: Create `List.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { List } from './List';

  figma.connect(List, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      divided: figma.boolean('Divided'),
    },
    example: ({ divided }) => (
      <List
        divided={divided}
        items={[
          { id: '1', content: 'List item one' },
          { id: '2', content: 'List item two' },
          { id: '3', content: 'List item three' },
        ]}
      />
    ),
  });
  ```

- [ ] **Step 3: Create `Avatar.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Avatar } from './Avatar';

  figma.connect(Avatar, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      size: figma.enum('Size', { Small: 'sm', Medium: 'md', Large: 'lg', XLarge: 'xl' }),
      shape: figma.enum('Shape', { Circle: 'circle', Square: 'square' }),
    },
    example: ({ size, shape }) => (
      <Avatar initials="JD" alt="John Doe" size={size} shape={shape} />
    ),
  });
  ```

- [ ] **Step 4: Create `Chip.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Chip } from './Chip';

  figma.connect(Chip, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      label: figma.string('Label'),
      variant: figma.enum('Variant', { Default: 'default', Info: 'info', Success: 'success', Danger: 'danger', Warning: 'warning' }),
      size: figma.enum('Size', { Small: 'sm', Medium: 'md' }),
      removable: figma.boolean('Removable'),
    },
    example: ({ label, variant, size, removable }) => (
      <Chip label={label} variant={variant} size={size} onRemove={removable ? () => {} : undefined} />
    ),
  });
  ```

- [ ] **Step 5: Commit**

  ```bash
  git add packages/ui/src/components/Table.figma.tsx packages/ui/src/components/List.figma.tsx packages/ui/src/components/Avatar.figma.tsx packages/ui/src/components/Chip.figma.tsx
  git commit -m "feat(ui): add Code Connect for Data components"
  ```

---

### Task 10: Typography Code Connect files

**Files:**
- Create: `packages/ui/src/components/Heading.figma.tsx`
- Create: `packages/ui/src/components/Body.figma.tsx`
- Create: `packages/ui/src/components/Label.figma.tsx`
- Create: `packages/ui/src/components/Caption.figma.tsx`
- Create: `packages/ui/src/components/Code.figma.tsx`

- [ ] **Step 1: Create `Heading.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Heading } from './Heading';

  figma.connect(Heading, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      text: figma.string('Text'),
      level: figma.enum('Level', { Display: 'display', H1: 1, H2: 2, H3: 3, H4: 4 }),
    },
    example: ({ text, level }) => (
      <Heading level={level}>{text}</Heading>
    ),
  });
  ```

- [ ] **Step 2: Create `Body.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Body } from './Body';

  figma.connect(Body, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      text: figma.string('Text'),
      size: figma.enum('Size', { Small: 'sm', Base: 'base', Large: 'lg' }),
    },
    example: ({ text, size }) => (
      <Body size={size}>{text}</Body>
    ),
  });
  ```

- [ ] **Step 3: Create `Label.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Label } from './Label';

  figma.connect(Label, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      text: figma.string('Text'),
      required: figma.boolean('Required'),
    },
    example: ({ text, required }) => (
      <Label required={required}>{text}</Label>
    ),
  });
  ```

- [ ] **Step 4: Create `Caption.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Caption } from './Caption';

  figma.connect(Caption, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      text: figma.string('Text'),
    },
    example: ({ text }) => (
      <Caption>{text}</Caption>
    ),
  });
  ```

- [ ] **Step 5: Create `Code.figma.tsx`**

  ```tsx
  import figma from '@figma/code-connect';
  import { Code } from './Code';

  figma.connect(Code, 'https://www.figma.com/design/ITyTagLQEj5b75iqsmPyl6/Design-System-Lab?node-id=REPLACE_WITH_NODE_ID', {
    props: {
      text: figma.string('Code'),
      block: figma.boolean('Block'),
    },
    example: ({ text, block }) => (
      <Code block={block}>{text}</Code>
    ),
  });
  ```

- [ ] **Step 6: Commit**

  ```bash
  git add packages/ui/src/components/Heading.figma.tsx packages/ui/src/components/Body.figma.tsx packages/ui/src/components/Label.figma.tsx packages/ui/src/components/Caption.figma.tsx packages/ui/src/components/Code.figma.tsx
  git commit -m "feat(ui): add Code Connect for Typography components"
  ```

---

### Task 11: Figma Variables setup (manual step)

**Files:** None — performed inside the Figma app.

- [ ] **Step 1: Open the Variables panel**

  In the Design-System-Lab Figma file: Main menu → Resources → Variables (or press `Shift+V`).

- [ ] **Step 2: Create "Primitives" collection**

  Click "+" to create a collection named **Primitives**. Add color variables for every primitive in `packages/tokens/tailwind.css` `@theme` block. These are raw hex values — no modes needed.

  Example variables to add:
  - `color/blue/600` = `#2563eb`
  - `color/blue/500` = `#3b82f6`
  - `color/slate/50` = `#f8fafc`
  - `color/slate/950` = `#020617`
  - *(continue for all primitive colors)*

- [ ] **Step 3: Create "Semantic" collection**

  Create a collection named **Semantic** with two modes: **Light** and **Dark**.

  Add semantic variables pointing to Primitives:

  | Variable | Light value | Dark value |
  |---|---|---|
  | `bg` | `color/white` | `color/slate/950` |
  | `surface` | `color/slate/50` | `color/slate/800` |
  | `surface-raised` | `color/white` | `color/slate/700` |
  | `brand` | `color/blue/600` | `color/blue/500` |
  | `brand-hover` | `color/blue/700` | `color/blue/400` |
  | `text-primary` | `color/slate/900` | `color/slate/100` |
  | `text-secondary` | `color/slate/600` | `color/slate/400` |
  | `text-disabled` | `color/slate/400` | `color/slate/600` |
  | `text-inverse` | `color/white` | `color/slate/900` |
  | `border` | `color/slate/200` | `color/slate/700` |
  | `border-focus` | `color/blue/600` | `color/blue/500` |
  | `danger` | `color/red/600` | `color/red/500` |
  | `danger-surface` | `color/red/100` | `color/slate/700` |
  | `success` | `color/green/600` | `color/green/500` |
  | `success-surface` | `color/green/100` | `color/slate/700` |
  | `warning` | `color/amber/600` | `color/amber/500` |
  | `warning-surface` | `color/amber/100` | `color/slate/700` |
  | `info` | `color/sky/600` | `color/sky/500` |
  | `info-surface` | `color/sky/100` | `color/slate/700` |

- [ ] **Step 4: Apply variables to components**

  For each component set in the Components page: select all colour fills, strokes, and radius values → bind them to the appropriate Semantic variable via the Variable picker in the right panel.

  Priority order: Button → Input → Badge → Card → all others.

- [ ] **Step 5: Verify dark mode**

  Switch the Semantic collection mode to Dark. All component colours should update automatically. Verify against the spec: brand becomes `blue-500`, backgrounds become slate-dark.

---

### Task 12: GitHub Actions workflow

**Files:**
- Create: `.github/workflows/code-connect.yml`

- [ ] **Step 1: Create the directory**

  ```bash
  mkdir -p .github/workflows
  ```

- [ ] **Step 2: Create `.github/workflows/code-connect.yml`**

  ```yaml
  name: Publish Code Connect

  on:
    push:
      branches: [main]

  jobs:
    publish:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4

        - uses: actions/setup-node@v4
          with:
            node-version: '20'
            cache: 'npm'

        - name: Install dependencies
          run: npm ci

        - name: Publish Code Connect
          working-directory: packages/ui
          run: npx figma connect publish --token ${{ secrets.FIGMA_ACCESS_TOKEN }}
  ```

- [ ] **Step 3: Commit**

  ```bash
  git add .github/
  git commit -m "feat(ci): add GitHub Actions workflow to publish Code Connect on merge to main"
  ```

---

### Task 13: Add GitHub secret (manual step)

**Files:** None — configured in GitHub UI.

- [ ] **Step 1: Create a Figma personal access token**

  1. Open Figma → click your avatar → Settings
  2. Navigate to Security → Personal access tokens
  3. Click "Generate new token"
  4. Name: `design-system-lab-code-connect`
  5. Expiration: set as appropriate (no expiry for a lab)
  6. Scopes required:
     - **File Content** → Read
     - **Code Connect** → Write
  7. Copy the token — it is shown only once

- [ ] **Step 2: Add secret to GitHub repo**

  1. Go to your GitHub repo → Settings → Secrets and variables → Actions
  2. Click "New repository secret"
  3. Name: `FIGMA_ACCESS_TOKEN`
  4. Secret: paste the token from Step 1
  5. Click "Add secret"

---

### Task 14: Validate all Code Connect files

**Files:** None created — validation only.

- [ ] **Step 1: Replace all placeholder node IDs**

  In each `.figma.tsx` file, replace `REPLACE_WITH_NODE_ID` with the actual node ID from the table in Task 1.

  Bulk replace command (run from `packages/ui/src/components/`):
  ```bash
  # After filling in all IDs in the Task 1 table, use sed or your editor's find-replace.
  # Verify no placeholders remain:
  grep -r "REPLACE_WITH_NODE_ID" packages/ui/src/components/
  ```
  Expected: no output (no placeholders remain).

- [ ] **Step 2: Validate**

  ```bash
  cd packages/ui && npm run figma:validate
  ```
  Expected: "Found 40 components, 0 errors"

- [ ] **Step 3: Commit replacements**

  ```bash
  git add packages/ui/src/components/*.figma.tsx
  git commit -m "feat(ui): fill in Figma node IDs for all 40 Code Connect files"
  ```

---

### Task 15: First publish

- [ ] **Step 1: Publish Code Connect to Figma**

  ```bash
  cd packages/ui && npm run figma:publish -- --token YOUR_FIGMA_TOKEN
  ```
  Expected: "Published 40 components to Figma successfully"

- [ ] **Step 2: Verify in Figma Dev Mode**

  1. Open Design-System-Lab in Figma
  2. Click any component (e.g., Button)
  3. Switch to Dev Mode (press `D` or toggle in top bar)
  4. In the right panel, click "Code" tab
  5. Expected: real React snippet from `Button.figma.tsx` example is shown — NOT Figma-generated code

  Spot-check at least 5 components across different categories.

- [ ] **Step 3: Verify CI/CD**

  Push any commit to `main`. Navigate to GitHub repo → Actions → "Publish Code Connect" workflow. Verify it completes successfully (green checkmark).

- [ ] **Step 4: Final commit**

  ```bash
  git add .
  git commit -m "feat: complete Code Connect integration — all 40 components connected to Figma"
  ```
