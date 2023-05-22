import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

export const required = {
  required: true,
  message: t('common.required')
}
