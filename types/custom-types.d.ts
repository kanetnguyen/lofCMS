import { SlateDescendant } from '@wangeditor/editor'

declare module 'slate' {
  interface CustomTypes {
    Text: {
      text: string
      bold?: boolean
      italic?: boolean
      code?: boolean
      through?: boolean
      underline?: boolean
      sup?: boolean
      sub?: boolean
      color?: string
      bgColor?: string
      fontSize?: string
      fontFamily?: string
    }

    Element: {
      type: string
      children: SlateDescendant[]
    }
  }
}
