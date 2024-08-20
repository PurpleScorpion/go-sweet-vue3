<template>
  <div style="padding-top: 10px;">
    <a-row v-if="layout == 'LeftRight'" justify="center">
      <a-image
        :preview="false"
        class="logo"
        width="41%"
        height="41%"
        src="/logo.png"
      />
    </a-row>

    <a-menu
      v-model:selectedKeys="menuState.selectedKeys"
      mode="inline"
      :open-keys="menuState.openKeys"
      :theme="darkMode ? 'dark' : 'light'"
      @click="handleClick"
    >
      <a-menu-item
        key="1"
        :icon="h(AreaChartOutlined)"
        v-if="hasShow('dashboard')"
        >{{ $t("menu.title.dashboard") }}</a-menu-item
      >
      <a-sub-menu
        key="sub1"
        :icon="h(SettingOutlined)"
        :title="$t('menu.title.system.management.summary')"
        v-if="hasShow('system')"
      >
        <a-menu-item key="100" v-if="hasShow('system_user')">{{
          $t("menu.title.system.management.user")
        }}</a-menu-item>
        <a-menu-item key="101" v-if="hasShow('system_role')">{{
          $t("menu.title.system.management.role")
        }}</a-menu-item>
        <a-menu-item key="102" v-if="hasShow('system_permissions')">{{
          $t("menu.title.system.management.permissions")
        }}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import { reactive, h } from "vue";
import {
  AreaChartOutlined,
  DesktopOutlined,
  HddOutlined,
  SettingOutlined,
  ProfileOutlined
} from "@ant-design/icons-vue";

import type { MenuInfo } from "ant-design-vue/es/menu/src/interface";
import { useGlobalConfigStore } from "~/store/global";

const globalConfig = useGlobalConfigStore();
const { layout,darkMode } = storeToRefs(globalConfig);

const router = useRouter();
const config = useRuntimeConfig(event);

const menuState = reactive({
  rootSubmenuKeys: ["1", "sub1", "sub2"],
  openKeys: ["sub1"],
  selectedKeys: ["1"],
});

// 用于刷新时回显被选中的sider
onMounted(() => {
    let path = router.currentRoute.value.fullPath
    if (path == "/dashboard" || path == "/dashboard/"){
        menuState.selectedKeys = ["1"]
    }else if (path == "/system/user" || path == "/system/user/"){
        menuState.selectedKeys = ["100"]
    }else if (path == "/system/role" || path == "/system/role/"){
        menuState.selectedKeys = ["101"]
    }else if (path == "/system/menu" || path == "/system/menu/"){
        menuState.selectedKeys = ["102"]
    }else{
        menuState.selectedKeys = ["1"]
    }
})




function handleClick({ key }: MenuInfo) {
  
  switch (key) {
    case "1":
      router.push("/dashboard");
      break;
    case "100":
      router.push("/system/user");
      break;
    case "101":
      router.push("/system/role");
      break;
    case "102":
      router.push("/system/menu");
      break;
    default:
      router.push("/dashboard");
      break;
  }
}


const hasShow = (rooterName: string) => {
  const menuShow: any = useCookie("menuShowList");
  if (menuShow.value) {
    for (let i = 0; i < menuShow.value.length; i++) {
      if (menuShow.value[i] == rooterName) {
        return true;
      }
    }
  }
};
</script>
