<template>
    <a-row style="margin-bottom: 20px">
      <a-col style="margin-right: 20px">
        <a-input
          v-model:value="rolename"
          :placeholder="$t('user.role.enterRoleName')"
        ></a-input>
      </a-col>
      <a-col style="margin-right: 20px">
        <a-button type="primary" @click="search">{{
          $t("user.button.search")
        }}</a-button>
      </a-col>
      <a-col style="margin-right: 20px">
        <a-button type="primary" @click="alertsHandle()">{{
          $t("user.button.add")
        }}</a-button>
      </a-col>
      <a-col style="margin-right: 20px">
        <a-button type="primary" @click="reset">{{
          $t("user.button.reset")
        }}</a-button>
      </a-col>
    </a-row>
</template>

<script setup lang="ts">
    import { sysRoleStore } from "~/store/system/role/role";
    import { useI18n } from 'vue-i18n';
    import { sysMenuStore } from "~/store/system/menu/menu";
    const { t } = useI18n();
    const { rolename,current,totalCount,dialogType,dialogVisible } = storeToRefs(sysRoleStore());
    const { getPageData } = sysRoleStore();
    const { getPageData: getMenuPageData } = sysMenuStore();
    const search = async () => {
        current.value = 1
        await getPageData();
    };
    
    const reset = () => {
      current.value = 1;
      rolename.value = ""
      search()
    };
    
    const alertsHandle = async() => {
        await getMenuPageData()
        dialogType.value = "Insert"
        dialogVisible.value = true;
    };
    
</script>

<style>
</style>