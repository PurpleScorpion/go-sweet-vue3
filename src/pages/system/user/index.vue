<template>
  <page-header-wrapper>
    <a-card style="margin-top: 10px">
       <CUserSearch />
       <CUserTable />
    </a-card>
    <CUserDialog />
  </page-header-wrapper>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useGlobalConfigStore } from "~/store/global";
import CUserSearch from "~/components/system/user/CUserSearch.vue";
import CUserTable from "~/components/system/user/CUserTable.vue";
import CUserDialog from "~/components/system/user/CUserDialog.vue";
import { sysUserStore } from "~/store/system/user/user";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const globalConfig = useGlobalConfigStore();
globalConfig.setPageTitle("pageTitle.system_user");
</script>
<style scoped>
.icon {
  margin-right: 8px;
  font-size: 18px;
}
</style>