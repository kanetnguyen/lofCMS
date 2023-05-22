import { useI18n } from '@/hooks/web/useI18n'
import type { Slots } from 'vue'
import { getSlot } from '@/utils/tsxHelper'
import { PlaceholderMoel } from './types'

const { t } = useI18n()

/**
 *
 * @param schema corresponds to component data
 * @returns return prompt information object
 * @description is used to automatically set placeholder
 */
export const setTextPlaceholder = (schema: FormSchema): PlaceholderMoel => {
  const textMap = ['Input', 'Autocomplete', 'InputNumber', 'InputPassword']
  const selectMap = ['Select', 'TimePicker', 'DatePicker', 'TimeSelect', 'TimeSelect']
  if (textMap.includes(schema?.component as string)) {
    return {
      placeholder: t('common. inputText')
    }
  }
  if (selectMap.includes(schema?.component as string)) {
    // some range selectors
    const twoTextMap = ['datetimerange', 'daterange', 'monthrange', 'datetimerange', 'daterange']
    if (
      twoTextMap.includes(
        (schema?.componentProps?.type || schema?.componentProps?.isRange) as string
      )
    ) {
      return {
        startPlaceholder: t('common. startTimeText'),
        endPlaceholder: t('common. endTimeText'),
        rangeSeparator: '-'
      }
    } else {
      return {
        placeholder: t('common. selectText')
      }
    }
  }
  return {}
}

/**
 *
 * @param col built-in grid
 * @returns return raster attributes
 * @description Merge the incoming raster attributes
 */
export const setGridProp = (col: ColProps = {}): ColProps => {
  const colProps: ColProps = {
    // If there is a span, it means that the user has a higher priority, so the default grid is not needed
    ...(col.span
      ? {}
      : {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 12
        }),
    ...col
  }
  return colProps
}

/**
 *
 * @param item The component attribute passed in
 * @returns add clearable attribute by default
 */
export const setComponentProps = (item: FormSchema): Recordable => {
  const notNeedClearable = ['ColorPicker']
  const componentProps: Recordable = notNeedClearable.includes(item.component as string)
    ? { ...item.componentProps }
    : {
        clearable: true,
        ...item.componentProps
      }
  // need to remove extra attributes
  delete componentProps?.slots
  return componentProps
}

/**
 *
 * @param slots slots
 * @param slotsProps slot properties
 * @param field field name
 */
export const setItemComponentSlots = (
  slots: Slots,
  slotsProps: Recordable = {},
  field: string
): Recordable => {
  const slotObj: Recordable = {}
  for (const key in slotsProps) {
    if (slotsProps[key]) {
      // Since components may be repeated, a unique prefix is required
      slotObj[key] = (data: Recordable) => {
        return getSlot(slots, `${field}-${key}`, data)
      }
    }
  }
  return slotObj
}

/**
 *
 * @param schema Form form structured array
 * @param formModel FormMoel
 * @returns FormMoel
 * @description generate the corresponding formModel
 */
export const initModel = (schema: FormSchema[], formModel: Recordable) => {
  const model: Recordable = { ...formModel }
  schema.map((v) => {
    // If it is hidden, delete the corresponding value
    if (v.hidden) {
      delete model[v.field]
    } else if (v.component && v.component !== 'Divider') {
      const hasField = Reflect.has(model, v.field)
      // If a value already existed before, it will not be reassigned, but the existing value will be used
      model[v.field] = hasField ? model[v.field] : v.value !== void 0 ? v.value : ''
    }
  })
  return model
}

/**
 * @param slots slots
 * @param field field name
 * @returns return FormIiem slot
 */
export const setFormItemSlots = (slots: Slots, field: string): Recordable => {
  const slotObj: Recordable = {}
  if (slots[`${field}-error`]) {
    slotObj['error'] = (data: Recordable) => {
      return getSlot(slots, `${field}-error`, data)
    }
  }
  if (slots[`${field}-label`]) {
    slotObj['label'] = (data: Recordable) => {
      return getSlot(slots, `${field}-label`, data)
    }
  }
  return slotObj
}
