import type { CSSProperties } from 'vue'

declare global {
  declare type ComponentName =
    | 'Radio'
    | 'RadioButton'
    | 'Checkbox'
    | 'CheckboxButton'
    | 'Input'
    | 'Autocomplete'
    | 'InputNumber'
    | 'Select'
    | 'Cascader'
    | 'Switch'
    | 'Slider'
    | 'TimePicker'
    | 'DatePicker'
    | 'Rate'
    | 'ColorPicker'
    | 'Transfer'
    | 'Divider'
    | 'TimeSelect'
    | 'SelectV2'
    | 'InputPassword'

  declare type ColProps = {
    span?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    tag?: string
  }

  declare type FormValueType = string | number | string[] | number[] | boolean | undefined | null

  declare type FormItemProps = {
    labelWidth?: string | number
    required?: boolean
    rules?: Recordable
    error?: string
    showMessage?: boolean
    inlineMessage?: boolean
    style?: CSSProperties
  }

  declare type ComponentOptions = {
    label?: string
    value?: FormValueType
    disabled?: boolean
    key?: string | number
    children?: ComponentOptions[]
    options?: ComponentOptions[]
  } & Recordable

  declare type ComponentOptionsAlias = {
    labelField?: string
    valueField?: string
  }

  declare type ComponentProps = {
    optionsAlias?: ComponentOptionsAlias
    options?: ComponentOptions[]
    optionsSlot?: boolean
  } & Recordable

  declare type FormSchema = {
    // unique value
    field: string
    // title
    label?: string
    // hint
    labelMessage?: string
    // col component attribute
    colProps?: ColProps
    // Form component properties, slots correspond to the slots of the form component, rule: ${field}-xxx, see element-plus documentation for details
    componentProps?: { slots?: Recordable } & ComponentProps
    // formItem component property
    formItemProps?: FormItemProps
    // rendered component
    component?: ComponentName
    // initial value
    value?: FormValueType
    // Whether to hide
    hidden?: boolean
  }

  declare type FormSetPropsType = {
    field: string
    path: string
    value: any
  }
}
