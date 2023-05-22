import type { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'
/**
* redirect: noredirect When noredirect is set, the route cannot be clicked in the breadcrumb navigation
* name:'router-name' Set the name of the router, it must be filled in or there will be various problems when using <keep-alive>
* meta : {
     hidden: true When set to true, the route will not appear in the sidebar such as 404, login and other pages (default false)

     alwaysShow: true When you have more than one route declared by children under a route, it will automatically become a nested mode.
                               When there is only one, that sub-route will be displayed in the sidebar as the root route.
                               If you want to display your root route regardless of the number of children declarations under the route,
                               You can set alwaysShow: true, so it will ignore the previously defined rules,
                               Always show the root route (default false)

     title: 'title' sets the name of the route displayed in the sidebar and breadcrumbs

     icon: 'svg-name' set the icon for this route

     noCache: true if set to true, will not be cached by <keep-alive> (default false)

     breadcrumb: false If set to false, breadcrumbs will not be shown in breadcrumb (default true)

     affix: true If set to true, it will always be fixed in the tag item (default false)

     noTagsView: true If set to true, it will not appear in the tag (default false)

     activeMenu: '/dashboard' shows the highlighted routing path

     followAuth: '/dashboard' which route to follow for permission filtering

     canTo: true set to true even if hidden is true, routing jumps can still be performed (default false)
   }
**/
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    hidden?: boolean
    alwaysShow?: boolean
    title?: string
    icon?: string
    noCache?: boolean
    breadcrumb?: boolean
    affix?: boolean
    activeMenu?: string
    noTagsView?: boolean
    followAuth?: string
    canTo?: boolean
  }
}

type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

declare global {
  declare interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component?: Component | string
    children?: AppRouteRecordRaw[]
    props?: Recordable
    fullPath?: string
  }

  declare interface AppCustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
    name: string
    meta: RouteMeta
    component: string
    path: string
    redirect: string
    children?: AppCustomRouteRecordRaw[]
  }
}
