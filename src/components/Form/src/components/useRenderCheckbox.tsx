import { ElCheckbox, ElCheckboxButton } from 'element-plus'
import { defineComponent } from 'vue'

export const useRenderCheckbox = () => {
  const renderChcekboxOptions = (item: FormSchema) => {
    // If there is an alias, take the alias
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField
    const Com = (item.component === 'Checkbox' ? ElCheckbox : ElCheckboxButton) as ReturnType<
      typeof defineComponent
    >
    return item?.componentProps?.options?.map((option) => {
      return <Com label={option[labelAlias || 'value']}>{option[valueAlias || 'label']}</Com>
    })
  }

  return {
    renderChcekboxOptions
  }
}
