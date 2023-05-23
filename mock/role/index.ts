import { config } from '@/config/axios/config'
import { MockMethod } from 'vite-plugin-mock'

const { result_code } = config

const timeout = 1000

const adminList = [
  {
    path: '/home',
    name: 'Home',
    component: '#',
    meta: {
      title: 'router.home',
      icon: 'carbon:linux'
    }
  },
  {
    path: '/content',
    component: '#',
    redirect: '/content/index',
    name: 'Content',
    meta: {
      title: 'router.content',
      icon: 'carbon:media-library-filled'
    },
    children: [
      {
        path: 'list',
        name: 'ListContent',
        component: 'views/Content/Index',
        meta: {
          title: 'router.listContent'
        }
      },
      {
        path: 'insert',
        name: 'AddContent',
        component: 'views/Content/Add',
        meta: {
          title: 'router.addContent'
        }
      }
    ]
  },
  {
    path: '/menu',
    component: '#',
    redirect: '/menu/index',
    name: 'Menu',
    meta: {
      title: 'router.menu',
      icon: 'carbon:skill-level-advanced'
    },
    children: [
      {
        path: 'index',
        name: 'ListMenu',
        component: 'views/Menu/Index',
        meta: {
          title: 'router.listMenu'
        }
      },
      {
        path: 'add',
        name: 'AddMenu',
        component: 'views/Menu/Add',
        meta: {
          title: 'router.addMenu'
        }
      }
    ]
  }
]

const testList: string[] = [
  // '/level',
  // '/level/menu1',
  // '/level/menu1/menu1-1',
  // '/level/menu1/menu1-1/menu1-1-1',
  // '/level/menu1/menu1-2',
  // '/level/menu2'
]

export default [
  {
    url: '/role/list',
    method: 'get',
    timeout,
    response: ({ query }) => {
      const { roleName } = query
      return {
        code: result_code,
        data: {
          list: roleName === 'admin' ? adminList : testList
        }
      }
    }
  }
] as MockMethod[]
