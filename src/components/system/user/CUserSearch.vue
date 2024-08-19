<template>
    <a-row style="margin-bottom: 20px">
        <a-col style="margin-right: 20px">
            <a-input v-model:value="username" :placeholder="$t('user.user.enterUserName')"></a-input>
        </a-col>
        <a-col>
            <a-button style="margin-right: 20px" type="primary"
                @click="search">{{ $t("user.button.search") }}</a-button>
        </a-col>
        <a-col>
            <a-button style="margin-right: 20px" type="primary" @click="reset">{{ $t("user.button.reset") }}</a-button>
        </a-col>
        <a-col>
            <a-button style="margin-right: 20px" type="primary"
                @click="userAlertsHandle">{{ $t("user.button.add") }}</a-button>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
    import { sysUserStore } from "~/store/system/user/user";
    import { sysRoleStore } from "~/store/system/role/role";
    const { getPageData } = sysUserStore();
    const { username,current,dialogType,dialogVisible } = storeToRefs(sysUserStore());
    
    const { getAllRole } = sysRoleStore();

    const search = async () => {
        current.value = 1
        await getPageData();
    };
    
    const reset = () => {
      current.value = 1;
      username.value = ""
      search()
    };
    
    const userAlertsHandle = async() => {
      await getAllRole()
      dialogType.value = "Insert"
      dialogVisible.value = true;
    };
    
</script>

<style>
</style>