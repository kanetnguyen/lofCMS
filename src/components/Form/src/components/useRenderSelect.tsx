import { ElOption, ElOptionGroup } from 'element-plus'
import { getSlot } from '@/utils/tsxHelper'
import { Slots } from 'vue'

export const useRenderSelect = (slots: Slots) => {
  // render select options
  const renderSelectOptions = (item: FormSchema) => {
    // If there is an alias, take the alias
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    return item?.componentProps?.options?.map((option) => {
      if (option?.options?.length) {
        return (
          <ElOptionGroup label={option[labelAlias || 'label']}>
            {() => {
              return option?.options?.map((v) => {
                return renderSelectOptionItem(item, v)
              })
            }}
          </ElOptionGroup>
        )
      } else {
        return renderSelectOptionItem(item, option)
      }
    })
  }

  // render select option item
  const renderSelectOptionItem = (item: FormSchema, option: ComponentOptions) => {
    // If there is an alias, take the alias
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField
    return (
      <ElOption label={option[labelAlias || 'label']} value={option[valueAlias || 'value']}>
        {{
          default: () =>
            // option slot name rule, {field}-option
            item?.componentProps?.optionsSlot
              ? getSlot(slots, `${item.field}-option`, { item: option })
              : undefined
        }}
      </ElOption>
    )
  }

  return {
    renderSelectOptions
  }
}
