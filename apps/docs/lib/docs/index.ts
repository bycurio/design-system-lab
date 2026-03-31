import type { ComponentDoc } from '@/lib/types'
import { buttonDoc } from './button'
import { iconButtonDoc, linkDoc, fabDoc, splitButtonDoc } from './actions'
import {
  inputDoc, textareaDoc, selectDoc, checkboxDoc,
  radioDoc, toggleDoc, sliderDoc, datePickerDoc,
} from './forms'
import {
  navBarDoc, tabsDoc, breadcrumbDoc, sidebarDoc, paginationDoc,
} from './navigation'
import {
  badgeDoc, toastDoc, alertDoc, tooltipDoc,
  progressDoc, skeletonDoc, spinnerDoc,
} from './feedback'
import {
  cardDoc, modalDoc, drawerDoc, popoverDoc, accordionDoc, dividerDoc,
} from './containers'
import { tableDoc, listDoc, avatarDoc, chipDoc } from './data'
import {
  headingDoc, bodyDoc, labelDoc, captionDoc, codeDoc,
} from './typography'

export const componentDocs: Record<string, ComponentDoc> = {
  button: buttonDoc,
  'icon-button': iconButtonDoc,
  link: linkDoc,
  fab: fabDoc,
  'split-button': splitButtonDoc,
  input: inputDoc,
  textarea: textareaDoc,
  select: selectDoc,
  checkbox: checkboxDoc,
  radio: radioDoc,
  toggle: toggleDoc,
  slider: sliderDoc,
  'date-picker': datePickerDoc,
  'nav-bar': navBarDoc,
  tabs: tabsDoc,
  breadcrumb: breadcrumbDoc,
  sidebar: sidebarDoc,
  pagination: paginationDoc,
  badge: badgeDoc,
  toast: toastDoc,
  alert: alertDoc,
  tooltip: tooltipDoc,
  progress: progressDoc,
  skeleton: skeletonDoc,
  spinner: spinnerDoc,
  card: cardDoc,
  modal: modalDoc,
  drawer: drawerDoc,
  popover: popoverDoc,
  accordion: accordionDoc,
  divider: dividerDoc,
  table: tableDoc,
  list: listDoc,
  avatar: avatarDoc,
  chip: chipDoc,
  heading: headingDoc,
  body: bodyDoc,
  label: labelDoc,
  caption: captionDoc,
  code: codeDoc,
}
