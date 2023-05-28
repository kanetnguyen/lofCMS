import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const { result_code } = config

const timeout = 1000

const List: {
  id: number
  uuid: string
  name: string
  icon_text: string
  level: number
  parent_id: number
  status: number
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
}[] = [
  {
    id: 1,
    uuid: 'abc123',
    name: 'Sữa A',
    icon_text: 'A',
    level: 1,
    parent_id: 0,
    status: 1,
    created_at: '2022-01-01T10:00:00Z',
    created_by: 1,
    updated_at: '2022-01-01T10:00:00Z',
    updated_by: 1
  },
  {
    id: 2,
    uuid: 'def456',
    name: 'Sữa B',
    icon_text: 'B',
    level: 2,
    parent_id: 1,
    status: 1,
    created_at: '2022-01-02T11:00:00Z',
    created_by: 2,
    updated_at: '2022-01-02T11:00:00Z',
    updated_by: 2
  }
]

export default [
  {
    url: '/menu/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { title, pageIndex, pageSize } = query
      const mockList = List.filter((item) => {
        if (title && item.name.indexOf(title) < 0) return false
        return true
      })
      const pageList = mockList.filter(
        (_, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1)
      )

      return {
        code: result_code,
        data: {
          total: mockList.length,
          list: pageList
        }
      }
    }
  }
] as MockMethod[]
