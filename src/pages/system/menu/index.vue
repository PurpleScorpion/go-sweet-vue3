<template>
  <div>
    <a-card  style="margin-top: 10px">
      <div>
        <a-button type="primary" @click="menuAlertsHandle('Insert',0)"
                  style="margin-bottom: 10px">{{ $t('user.button.add') }}
        </a-button>
        <a-table :columns="tableColumns" :data-source="pageData" rowKey="id" :pagination="false">
          <template #headerCell="{ column }">
            <span>{{ $t(column.title) }}</span>
          </template>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <EditOutlined class="icon" @click="menuAlertsHandle('Update', record.id)"/>
              <a-divider type="vertical"/>
              <DeleteOutlined class="icon" @click="deleteMenu(record.id)"/>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
    <CMenuDialog :controlVisible="menuAddOrUpdateVisible" :menuId="menuId" :hasAdd="hasAdd"
                 @close="menuAddOrUpdateClose"/>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useI18n} from 'vue-i18n';
import {sysMenuStore} from "~/store/system/menu/menu";
import {useGlobalConfigStore} from "~/store/global";
import CMenuDialog from "~/components/system/menu/CMenuDialog.vue";

const {t} = useI18n();
const globalConfig = useGlobalConfigStore();
globalConfig.setPageTitle("pageTitle.system_permissions");
const {getPageData, deleteMenuById, allParentMenu, getMenuById} = sysMenuStore();
const {pageData, dialogType, dialogVisible} = storeToRefs(sysMenuStore());
const data = ref<any>();
const menuAddOrUpdateVisible = ref<boolean>(false);
const hasAdd = ref<boolean>(false);
const menuId = ref<any>();
const tableColumns = [
  {
    title: "user.menu.menuName",
    dataIndex: "menuName",
    key: "menuName",
    width: "15%",
  },
  {
    title: "user.menu.routerName",
    dataIndex: "routerName",
    key: "routerName",
    width: "15%",
  },
  {
    title: "user.menu.sort",
    dataIndex: "orderNum",
    key: "orderNum",
    width: "15%",
  },
  {
    title: "user.menu.action",
    dataIndex: "action",
    key: "action",
    width: "15%",
  },
];
onMounted(async () => {
  initPage()
});
const initPage = async () => {
  await getPageData();
};
const menuAlertsHandle = async (actionType: string, id ?: any) => {
  dialogType.value = actionType
  await allParentMenu()
  if (dialogType.value != 'Insert') {
    await getMenuById(id)
  }
  menuId.value = id ? id : null;
  dialogVisible.value = true;
};
const deleteMenu = async (id: any) => {
  Modal.confirm({
    title: t('user.menu.delete.message'),
    centered: true,
    async onOk() {
      await deleteMenuById(id);
      initPage()
    },
    onCancel() {
    },
  });
};
const menuAddOrUpdateClose = async (isAction ?: boolean) => {
  dialogVisible.value = false;
  if (isAction) {
    initPage()
  }
};
</script>
<style scoped>
.icon {
  font-size: 18px;
}
</style>