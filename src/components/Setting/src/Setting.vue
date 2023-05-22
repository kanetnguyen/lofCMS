<script setup lang="ts">
import { ElDrawer, ElDivider, ElButton, ElMessage } from 'element-plus'
import { ref, unref, computed, watch } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'
import { ThemeSwitch } from '@/components/ThemeSwitch'
import { colorIsDark, lighten, hexToRGB } from '@/utils/color'
import { useCssVar } from '@vueuse/core'
import { useAppStore } from '@/store/modules/app'
import { trim, setCssVar } from '@/utils'
import ColorRadioPicker from './components/ColorRadioPicker.vue'
import InterfaceDisplay from './components/InterfaceDisplay.vue'
import LayoutRadioPicker from './components/LayoutRadioPicker.vue'
import { useCache } from '@/hooks/web/useCache'
import { useClipboard } from '@vueuse/core'
import { useDesign } from '@/hooks/web/useDesign'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('setting')

const appStore = useAppStore()

const { t } = useI18n()

const layout = computed(() => appStore.getLayout)

const drawer = ref(false)

const systemTheme = ref(appStore.getTheme.elColorPrimary)

const setSystemTheme = (color: string) => {
  setCssVar('--el-color-primary', color)
  appStore.setTheme({ elColorPrimary: color })
  const leftMenuBgColor = useCssVar('--left-menu-bg-color', document.documentElement)
  setMenuTheme(trim(unref(leftMenuBgColor)))
}

const headerTheme = ref(appStore.getTheme.topHeaderBgColor || '')

const setHeaderTheme = (color: string) => {
  const isDarkColor = colorIsDark(color)
  const textColor = isDarkColor ? '#fff' : 'inherit'
  const textHoverColor = isDarkColor ? lighten(color!, 6) : '#f6f6f6'
  const topToolBorderColor = isDarkColor ? color : '#eee'
  setCssVar('--top-header-bg-color', color)
  setCssVar('--top-header-text-color', textColor)
  setCssVar('--top-header-hover-color', textHoverColor)
  setCssVar('--top-tool-border-color', topToolBorderColor)
  appStore.setTheme({
    topHeaderBgColor: color,
    topHeaderTextColor: textColor,
    topHeaderHoverColor: textHoverColor,
    topToolBorderColor
  })
  if (unref(layout) === 'top' && !appStore.getIsDark) {
    setMenuTheme(color)
  }
}

const menuTheme = ref(appStore.getTheme.leftMenuBgColor || '')

const setMenuTheme = (color: string) => {
  const primaryColor = useCssVar('--el-color-primary', document.documentElement)
  const isDarkColor = colorIsDark(color)
  const theme: Recordable = {
    leftMenuBorderColor: isDarkColor ? 'inherit' : '#eee',
    leftMenuBgColor: color,
    leftMenuBgLightColor: isDarkColor ? lighten(color!, 6) : color,
    leftMenuBgActiveColor: isDarkColor
      ? 'var(--el-color-primary)'
      : hexToRGB(unref(primaryColor), 0.1),
    leftMenuCollapseBgActiveColor: isDarkColor
      ? 'var(--el-color-primary)'
      : hexToRGB(unref(primaryColor), 0.1),
    leftMenuTextColor: isDarkColor ? '#bfcbd9' : '#333',
    leftMenuTextActiveColor: isDarkColor ? '#fff' : 'var(--el-color-primary)',
    logoTitleTextColor: isDarkColor ? '#fff' : 'inherit',
    logoBorderColor: isDarkColor ? color : '#eee'
  }
  appStore.setTheme(theme)
  appStore.setCssVarTheme()
}

watch(
  () => layout.value,
  (n) => {
    if (n === 'top' && !appStore.getIsDark) {
      headerTheme.value = '#fff'
      setHeaderTheme('#fff')
    } else {
      setMenuTheme(unref(menuTheme))
    }
  }
)

const copyConfig = async () => {
  const { copy, copied } = useClipboard({
    source: `
    // Bread crumbs
breadcrumb: ${appStore.getBreadcrumb},
// breadcrumb icon
breadcrumbIcon: ${appStore.getBreadcrumbIcon},
// collapse icon
hamburger: ${appStore.getHamburger},
// full screen icon
screenfull: ${appStore.getScreenfull},
// size icon
size: ${appStore.getSize},
// multilingual icons
locale: ${appStore.getLocale},
// Bookmark page
tagsView: ${appStore.getTagsView},
// logo
logo: ${appStore.getLogo},
// fixed header
fixedHeader: ${appStore.getFixedHeader},
// footer
footer: ${appStore.getFooter},
// gray mode
greyMode: ${appStore.getGreyMode},
// layout layout
layout: '${appStore.getLayout}',
// dark mode
isDark: ${appStore.getIsDark},
// component size
currentSize: '${appStore.getCurrentSize}',
// theme related
theme: {
  // theme color
  elColorPrimary: '${appStore.getTheme.elColorPrimary}',
  // Left menu border color
  leftMenuBorderColor: '${appStore.getTheme.leftMenuBorderColor}',
  // Left menu background color
  leftMenuBgColor: '${appStore.getTheme.leftMenuBgColor}',
  // Left menu light background color
  leftMenuBgLightColor: '${appStore.getTheme.leftMenuBgLightColor}',
  // Left menu selection background color
  leftMenuBgActiveColor: '${appStore.getTheme.leftMenuBgActiveColor}',
  // The left menu collapses and selects the background color
  leftMenuCollapseBgActiveColor: '${appStore.getTheme.leftMenuCollapseBgActiveColor}',
  // Left menu font color
  leftMenuTextColor: '${appStore.getTheme.leftMenuTextColor}',
  // Left menu selection font color
  leftMenuTextActiveColor: '${appStore.getTheme.leftMenuTextActiveColor}',
  // logo font color
  logoTitleTextColor: '${appStore.getTheme.logoTitleTextColor}',
  // logo border color
  logoBorderColor: '${appStore.getTheme.logoBorderColor}',
  // head background color
  topHeaderBgColor: '${appStore.getTheme.topHeaderBgColor}',
  // header font color
  topHeaderTextColor: '${appStore.getTheme.topHeaderTextColor}',
  // header hover color
  topHeaderHoverColor: '${appStore.getTheme.topHeaderHoverColor}',
  // head border color
  topToolBorderColor: '${appStore.getTheme.topToolBorderColor}'
}
    `
  })
  await copy()
  if (unref(copied)) {
    ElMessage.success(t('setting.copySuccess'))
  }
}

const clear = () => {
  const { wsCache } = useCache()
  wsCache.delete('layout')
  wsCache.delete('theme')
  wsCache.delete('isDark')
  window.location.reload()
}
</script>

<template>
  <div
    :class="prefixCls"
    class="fixed top-[45%] right-0 w-40px h-40px text-center leading-40px bg-[var(--el-color-primary)] cursor-pointer"
    @click="drawer = true"
  >
    <Icon icon="ant-design:setting-outlined" color="#fff" />
  </div>

  <ElDrawer v-model="drawer" direction="rtl" size="350px">
    <template #header>
      <span class="text-16px font-700">{{ t('setting.projectSetting') }}</span>
    </template>

    <div class="text-center">
      <ElDivider>{{ t('setting.theme') }}</ElDivider>
      <ThemeSwitch />

      <ElDivider>{{ t('setting.layout') }}</ElDivider>
      <LayoutRadioPicker />

      <ElDivider>{{ t('setting.systemTheme') }}</ElDivider>
      <ColorRadioPicker
        v-model="systemTheme"
        :schema="[
          '#409eff',
          '#009688',
          '#536dfe',
          '#ff5c93',
          '#ee4f12',
          '#0096c7',
          '#9c27b0',
          '#ff9800'
        ]"
        @change="setSystemTheme"
      />

      <ElDivider>{{ t('setting.headerTheme') }}</ElDivider>
      <ColorRadioPicker
        v-model="headerTheme"
        :schema="[
          '#fff',
          '#151515',
          '#5172dc',
          '#e74c3c',
          '#24292e',
          '#394664',
          '#009688',
          '#383f45'
        ]"
        @change="setHeaderTheme"
      />

      <template v-if="layout !== 'top'">
        <ElDivider>{{ t('setting.menuTheme') }}</ElDivider>
        <ColorRadioPicker
          v-model="menuTheme"
          :schema="[
            '#5872f4',
            '#001529',
            '#212121',
            '#273352',
            '#191b24',
            '#383f45',
            '#001628',
            '#344058'
          ]"
          @change="setMenuTheme"
        />
      </template>
    </div>

    <ElDivider>{{ t('setting.interfaceDisplay') }}</ElDivider>
    <InterfaceDisplay />

    <ElDivider />
    <div>
      <ElButton type="primary" class="w-full" @click="copyConfig">{{ t('setting.copy') }}</ElButton>
    </div>
    <div class="mt-5px">
      <ElButton type="danger" class="w-full" @click="clear">
        {{ t('setting.clearAndReset') }}
      </ElButton>
    </div>
  </ElDrawer>
</template>

<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-setting';

.@{prefix-cls} {
  border-radius: 6px 0 0 6px;
}
</style>
