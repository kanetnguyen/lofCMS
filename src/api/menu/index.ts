import { useAxios } from '@/hooks/web/useAxios'
// import { AxiosPromise } from 'axios'
// import type { MenuType } from './types'

const request = useAxios()

export const getMenuListApi = (params: any) => {
  return request.get({ url: '/menu/list', params })
}
