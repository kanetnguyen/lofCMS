import { Pagination, TableColumn } from '@/types/table'

export type TableProps = {
  pageSize?: number
  currentPage?: number

  selection?: boolean

  showOverflowTooltip?: boolean

  columns?: TableColumn[]

  pagination?: Pagination | undefined

  reserveSelection?: boolean

  loading?: boolean

  reserveIndex?: boolean

  align?: 'left' | 'center' | 'right'

  headerAlign?: 'left' | 'center' | 'right'
  data?: Recordable
  expand?: boolean
} & Recordable
