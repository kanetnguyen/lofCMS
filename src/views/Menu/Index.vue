<script setup lang="ts">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { ElTag, ElButton } from 'element-plus'
import { reactive, h } from 'vue'
import { CrudSchema, useCrudSchemas } from '@/hooks/web/useCrudSchemas'
import { TableColumn } from '@/types/table'
import { useTable } from '@/hooks/web/useTable'
import { Table } from '@/components/Table'
import { MenuType } from '@/api/menu/types'
import { getMenuListApi } from '@/api/menu'
import { Search } from '@/components/Search'

defineOptions({
  name: 'Menu2'
})

const { tableObject, methods } = useTable<MenuType>({
  getListApi: getMenuListApi,
  response: {
    list: 'list',
    total: 'total'
  },
  defaultParams: {
    title: ''
  }
})

const { getList } = methods

getList()

const { t } = useI18n()

const crudSchemas = reactive<CrudSchema[]>([
  {
    field: 'uuid',
    label: t('tableDemo.uuid')
  },
  {
    field: 'name',
    label: t('tableDemo.name'),
    search: {
      show: true
    }
  },
  {
    field: 'icon_text',
    label: t('tableDemo.iconText')
  },
  {
    field: 'level',
    label: t('tableDemo.level')
  },
  {
    field: 'status',
    label: t('tableDemo.status'),
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () =>
          cellValue === 1
            ? t('tableDemo.important')
            : cellValue === 2
            ? t('tableDemo.good')
            : t('tableDemo.commonly')
      )
    }
  },
  {
    field: 'updated_at',
    label: t('tableDemo.updatedAt'),
    form: {
      component: 'DatePicker',
      componentProps: {
        type: 'datetime',
        valueFormat: 'YYYY-MM-DD HH:mm:ss'
      }
    }
  },
  {
    field: 'updated_by',
    label: t('tableDemo.updatedBy')
  },
  {
    field: 'action',
    width: '260px',
    label: t('tableDemo.action')
  }
])

const { allSchemas } = useCrudSchemas(crudSchemas)
// const loading = ref(false)
</script>

<template>
  <ContentWrap :title="t('menuFeature.menu')">
    <Search
      :model="{ title: '' }"
      :schema="allSchemas.searchSchema"
      @search="setSearchParams"
      @reset="setSearchParams"
    />

    <Table
      v-model:pageSize="tableObject.pageSize"
      v-model:currentPage="tableObject.currentPage"
      :columns="allSchemas.tableColumns"
      :data="tableObject.tableList"
      :loading="tableObject.loading"
      :pagination="{
        total: tableObject.total
      }"
    >
      <template #action="">
        <ElButton type="primary">
          {{ t('exampleDemo.edit') }}
        </ElButton>
        <ElButton type="success">
          {{ t('exampleDemo.detail') }}
        </ElButton>
        <ElButton type="danger">
          {{ t('exampleDemo.del') }}
        </ElButton>
      </template>
    </Table>
  </ContentWrap>
</template>
