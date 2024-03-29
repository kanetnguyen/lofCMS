<script lang="tsx">
import { computed, defineComponent, unref, PropType } from 'vue'
import { ElMenu, ElScrollbar } from 'element-plus'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import type { LayoutType } from '@/config/app'
import { useRenderMenuItem } from './components/useRenderMenuItem'
import { useRouter } from 'vue-router'
import { isUrl } from '@/utils/is'
import { useDesign } from '@/hooks/web/useDesign'
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('menu')
export default defineComponent({
  name: 'Menu',
  props: {
    menuSelect: {
      type: Function as PropType<(index: string) => void>,
      default: undefined
    }
  },
  setup(props) {
    const appStore = useAppStore()
    const layout = computed(() => appStore.getLayout)
    const { push, currentRoute } = useRouter()
    const permissionStore = usePermissionStore()
    const menuMode = computed((): 'vertical' | 'horizontal' => {
      // vertical
      const vertical: LayoutType[] = ['classic', 'topLeft', 'cutMenu']
      if (vertical.includes(unref(layout))) {
        return 'vertical'
      } else {
        return 'horizontal'
      }
    })
    const routers = computed(() =>
      unref(layout) === 'cutMenu' ? permissionStore.getMenuTabRouters : permissionStore.getRouters
    )
    const collapse = computed(() => appStore.getCollapse)
    const uniqueOpened = computed(() => appStore.getUniqueOpened)
    const activeMenu = computed(() => {
      const { meta, path } = unref(currentRoute)
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu as string
      }
      return path
    })
    const menuSelect = (index: string) => {
      if (props.menuSelect) {
        props.menuSelect(index)
      }
      // custom event
      if (isUrl(index)) {
        window.open(index)
      } else {
        push(index)
      }
    }
    const renderMenuWrap = () => {
      if (unref(layout) === 'top') {
        return renderMenu()
      } else {
        return <ElScrollbar>{renderMenu()}</ElScrollbar>
      }
    }
    const renderMenu = () => {
      return (
        <ElMenu
          defaultActive={unref(activeMenu)}
          mode={unref(menuMode)}
          collapse={
            unref(layout) === 'top' || unref(layout) === 'cutMenu' ? false : unref(collapse)
          }
          uniqueOpened={unref(layout) === 'top' ? false : unref(uniqueOpened)}
          backgroundColor="var(--left-menu-bg-color)"
          textColor="var(--left-menu-text-color)"
          activeTextColor="var(--left-menu-text-active-color)"
          onSelect={menuSelect}
        >
          {{
            default: () => {
              const { renderMenuItem } = useRenderMenuItem(unref(routers), unref(menuMode))
              return renderMenuItem()
            }
          }}
        </ElMenu>
      )
    }
    return () => (
      <div
        id={prefixCls}
        class={[
          `${prefixCls} ${prefixCls}__${unref(menuMode)}`,
          'h-[100%] overflow-hidden flex-col bg-[var(--left-menu-bg-color)]',
          {
            'w-[var(--left-menu-min-width)]': unref(collapse) && unref(layout) !== 'cutMenu',
            'w-[var(--left-menu-max-width)]': !unref(collapse) && unref(layout) !== 'cutMenu'
          }
        ]}
      >
        {renderMenuWrap()}
      </div>
    )
  }
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-menu';
.is-active--after {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  background-color: var(--el-color-warning);
  content: '';
}
.@{prefix-cls} {
  position: relative;
  transition: width var(--transition-time-02);
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    border-left: 1px solid var(--left-menu-border-color);
    content: '';
  }
  :deep(.@{elNamespace}-menu) {
    width: 100% !important;
    border-right: none;
    // Set the color of the subtitle when selected
    .is-active {
      & > .@{elNamespace}-sub-menu__title {
        color: var(--left-menu-text-active-color) !important;
      }
    }
    // Set the highlight and background color of the submenu hover
    .@{elNamespace}-sub-menu__title,
    .@{elNamespace}-menu-item {
      &:hover {
        color: var(--left-menu-text-active-color) !important;
        background-color: var(--left-menu-bg-color) !important;
      }
    }
    // Set the highlight background and highlight color when selected
    .@{elNamespace}-sub-menu.is-active,
    .@{elNamespace}-menu-item.is-active {
      color: var(--left-menu-text-active-color) !important;
      background-color: var(--left-menu-bg-active-color) !important;
      &:hover {
        background-color: var(--left-menu-bg-active-color) !important;
      }
    }
    .@{elNamespace}-menu-item.is-active {
      position: relative;
      &:after {
        .is-active--after;
      }
    }
    // Set the background color of the submenu
    .@{elNamespace}-menu {
      .@{elNamespace}-sub-menu__title,
      .@{elNamespace}-menu-item:not(.is-active) {
        background-color: var(--left-menu-bg-light-color) !important;
      }
    }
  }
  // Minimum width when collapsed
  :deep(.@{elNamespace}-menu--collapse) {
    width: var(--left-menu-min-width);
    & > .is-active,
    & > .is-active > .@{elNamespace}-sub-menu__title {
      position: relative;
      background-color: var(--left-menu-collapse-bg-active-color) !important;
      &:after {
        .is-active--after;
      }
    }
  }
  // When folding the animation, you need to hide the text
  :deep(.horizontal-collapse-transition) {
    // transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out !important;
    .@{prefix-cls}__title {
      display: none;
    }
  }
  // horizontal menu
  &__horizontal {
    height: calc(~'var( - -top-tool-height)') !important;
    :deep(.@{elNamespace}-menu--horizontal) {
      height: calc(~'var( - -top-tool-height)');
      border-bottom: none;
      // Reset bottom highlight color
      & > .@{elNamespace}-sub-menu.is-active {
        .@{elNamespace}-sub-menu__title {
          border-bottom-color: var(--el-color-warning) !important;
        }
      }
      .@{elNamespace}-menu-item.is-active {
        position: relative;
        &:after {
          display: none !important;
        }
      }
      .@{prefix-cls}__title {
        /* stylelint-disable-next-line */
        max-height: calc(~'var(--top-tool-height) - 2px') !important;
        /* stylelint-disable-next-line */
        line-height: calc(~'var(--top-tool-height) - 2px');
      }
    }
  }
}
</style>
<style lang="less">
@prefix-cls: ~'@{namespace}-menu-popper';
.is-active--after {
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  background-color: var(--el-color-warning);
  content: '';
}
.el-menu {
  background-color: #ff9800 !important;
  color: red;
}
.@{prefix-cls}--vertical,
.@{prefix-cls}--horizontal {
  // Set the color of the subtitle when selected
  .is-active {
    & > .el-sub-menu__title {
      color: var(--left-menu-text-active-color) !important;
    }
  }
  // Set the highlight and background color of the submenu hover
  .el-sub-menu__title,
  .el-menu-item {
    &:hover {
      color: var(--left-menu-text-active-color) !important;
      background-color: var(--left-menu-bg-color) !important;
    }
  }
  // Set the highlighted background when selected
  .el-menu-item.is-active {
    position: relative;
    background-color: var(--left-menu-bg-active-color) !important;
    &:hover {
      background-color: var(--left-menu-bg-active-color) !important;
    }
    &:after {
      .is-active--after;
    }
  }
}
</style>
