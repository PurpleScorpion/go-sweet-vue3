<template>
  <div>
    <a-card style="margin-top: 10px">
       <CUserSearch />
       <CUserTable />
    </a-card>
    <CUserDialog />
  </div>
</template>
<script setup lang="ts">
import { useGlobalConfigStore } from "~/store/global";
import CUserSearch from "~/components/system/user/CUserSearch.vue";
import CUserTable from "~/components/system/user/CUserTable.vue";
import CUserDialog from "~/components/system/user/CUserDialog.vue";
const globalConfig = useGlobalConfigStore();
globalConfig.setPageTitle("pageTitle.system_user");
</script>
<style scoped>
</style>