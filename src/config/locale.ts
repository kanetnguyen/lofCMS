import { useCache } from '@/hooks/web/useCache'
import vi from 'element-plus/es/locale/lang/vi'
import en from 'element-plus/es/locale/lang/en'

const { wsCache } = useCache()

export const elLocaleMap = {
  vi: vi,
  en: en
}
export interface LocaleState {
  currentLocale: LocaleDropdownType
  localeMap: LocaleDropdownType[]
}

export const localeModules: LocaleState = {
  currentLocale: {
    lang: wsCache.get('lang') || 'vi',
    elLocale: elLocaleMap[wsCache.get('lang') || 'vi']
  },
  localeMap: [
    {
      lang: 'vi',
      name: 'Tiếng việt'
    },
    {
      lang: 'en',
      name: 'English'
    }
  ]
}
