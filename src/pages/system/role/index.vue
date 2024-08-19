<template>
  <page-header-wrapper>
    <a-card  style="margin-top: 10px">
        <CRoleSearch />
        <CRoleTable />
    </a-card>
    <CRoleDialog />
  </page-header-wrapper>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useGlobalConfigStore } from "~/store/global";
import CRoleSearch from "~/components/system/role/CRoleSearch.vue";
import CRoleTable from "~/components/system/role/CRoleTable.vue";
import CRoleDialog from "~/components/system/role/CRoleDialog.vue";
const globalConfig = useGlobalConfigStore();
globalConfig.setPageTitle("pageTitle.system_role");
const data = ref<any>();
const roleAddOrUpdateVisible = ref<boolean>(false);
const hasAdd = ref<boolean>(false);
const roleId = ref<any>();
const seachKey = ref<string>('');
const tableColumns = [
  {
    title: "user.role.roleName",
    dataIndex: "roleName",
    key: "roleName",
    width: "15%",
  },
  {
    title: "user.user.createTime",
    dataIndex: "createddate",
    key: "createddate",
    width: "15%",
  },
  {
    title: "user.user.action",
    dataIndex: "action",
    key: "action",
    width: "15%",
  },
];

</script>
<style scoped>
.icon {
  margin-right: 8px;
  font-size: 18px;
}
</style>