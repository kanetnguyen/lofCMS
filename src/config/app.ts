import { useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

export type LayoutType = 'classic' | 'topLeft' | 'top' | 'cutMenu'

export type ThemeTypes = {
  elColorPrimary?: string
  leftMenuBorderColor?: string
  leftMenuBgColor?: string
  leftMenuBgLightColor?: string
  leftMenuBgActiveColor?: string
  leftMenuCollapseBgActiveColor?: string
  leftMenuTextColor?: string
  leftMenuTextActiveColor?: string
  logoTitleTextColor?: string
  logoBorderColor?: string
  topHeaderBgColor?: string
  topHeaderTextColor?: string
  topHeaderHoverColor?: string
  topToolBorderColor?: string
}
export interface AppState {
  breadcrumb: boolean
  breadcrumbIcon: boolean
  collapse: boolean
  uniqueOpened: boolean
  hamburger: boolean
  screenfull: boolean
  size: boolean
  locale: boolean
  tagsView: boolean
  tagsViewIcon: boolean
  logo: boolean
  fixedHeader: boolean
  greyMode: boolean
  pageLoading: boolean
  layout: LayoutType
  title: string
  userInfo: string
  isDark: boolean
  currentSize: ElememtPlusSize
  sizeMap: ElememtPlusSize[]
  mobile: boolean
  footer: boolean
  theme: ThemeTypes
}
export const appModules: AppState = {
  userInfo: 'userInfo', // login information storage field - it is recommended to change a field for each item to avoid conflicts with other items
  sizeMap: ['default', 'large', 'small'],
  mobile: false, // Whether it is a mobile terminal
  title: import.meta.env.VITE_APP_TITLE, // title
  pageLoading: false, // routing jump loading

  breadcrumb: true, // breadcrumbs
  breadcrumbIcon: true, // breadcrumb icon
  collapse: false, // collapse the menu
  uniqueOpened: false, // Whether to keep only one submenu open
  hamburger: true, // fold icon
  screenfull: true, // full screen icon
  size: true, // size icon
  locale: true, // multilingual icons
  tagsView: true, // tab page
  tagsViewIcon: true, // Whether to display the label icon
  logo: true, // logo
  fixedHeader: true, // fixed toolheader
  footer: true, // show footer
  greyMode: false, // Whether to start the gray mode for special mourning days

  layout: wsCache.get('layout') || 'classic', // layout layout
  isDark: wsCache.get('isDark') || false, // Whether it is dark mode
  currentSize: wsCache.get('default') || 'default', // component size
  theme: wsCache.get('theme') || {
    // theme color
    elColorPrimary: '#ff9800',
    // Left menu border color
    leftMenuBorderColor: '#eee',
    // Left menu background color
    leftMenuBgColor: '#ffffff',
    // Left menu light background color
    leftMenuBgLightColor: '#ffffff',
    // Left menu selection background color
    leftMenuBgActiveColor: 'RGBA(230,162,60,0.1)',
    // The left menu collapses and selects the background color
    leftMenuCollapseBgActiveColor: 'RGBA(230,162,60,0.1)',
    // Left menu font color
    leftMenuTextColor: '#333',
    // Left menu selection font color
    leftMenuTextActiveColor: '#333',
    // logo font color
    logoTitleTextColor: 'inherit',
    // logo border color
    logoBorderColor: '#eee',
    // header background color
    topHeaderBgColor: '#fff',
    // header font color
    topHeaderTextColor: 'inherit',
    // header hover color
    topHeaderHoverColor: '#f6f6f6',
    // head border color
    topToolBorderColor: '#eee'
  }
}
