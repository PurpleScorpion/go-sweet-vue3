<template>
  <div>
    <a-card  style="margin-top: 10px">
        <CRoleSearch />
        <CRoleTable />
    </a-card>
    <CRoleDialog />
  </div>
</template>
<script setup lang="ts">
import { useGlobalConfigStore } from "~/store/global";
import CRoleSearch from "~/components/system/role/CRoleSearch.vue";
import CRoleTable from "~/components/system/role/CRoleTable.vue";
import CRoleDialog from "~/components/system/role/CRoleDialog.vue";
const globalConfig = useGlobalConfigStore();
globalConfig.setPageTitle("pageTitle.system_role");


</script>
<style scoped>
</style>