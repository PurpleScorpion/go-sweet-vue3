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
        key="sub2"
        :icon="h(SettingOutlined)"
        :title="$t('menu.title.system.management.summary')"
        v-if="hasShow('system')"
      >
        <a-menu-item key="11" v-if="hasShow('system_user')">{{
          $t("menu.title.system.management.user")
        }}</a-menu-item>
        <a-menu-item key="12" v-if="hasShow('system_role')">{{
          $t("menu.title.system.management.role")
        }}</a-menu-item>
        <a-menu-item key="13" v-if="hasShow('system_permissions')">{{
          $t("menu.title.system.management.permissions")
        }}</a-menu-item>
        <a-menu-item key="14" v-if="hasShow('system_mst_base')">{{
          $t("menu.title.system.management.mst.base")
        }}</a-menu-item>
        <a-menu-item key="15" v-if="hasShow('eventhub')">{{$t("menu.title.system.management.eventHubLive")}}</a-menu-item>
        <a-menu-item key="16" v-if="hasShow('iothub_msg_transfer')">{{$t("menu.title.system.management.msgTransfer")}}</a-menu-item>
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
  openKeys: ["sub1", "sub2"],
  selectedKeys: ["1"],
});


onMounted(() => {
    let path = router.currentRoute.value.fullPath
    if (path == "/dashboard" || path == "/dashboard/"){
        menuState.selectedKeys = ["1"]
    }else if (path == "/device" || path == "/device/"){
        menuState.selectedKeys = ["2"]
    }else if (path == "/general-setting" || path == "/general-setting/"){
        menuState.selectedKeys = ["3"]
    }else if (path == "/schedule" || path == "/schedule/"){
        menuState.selectedKeys = ["4"]
    }else if (path == "/template" || path == "/template/"){
        menuState.selectedKeys = ["5"]
    }else if (path == "/log" || path == "/log/"){
        menuState.selectedKeys = ["7"]
    }else if (path == "/system/user" || path == "/system/user/"){
        menuState.selectedKeys = ["11"]
    }else if (path == "/system/role" || path == "/system/role/"){
        menuState.selectedKeys = ["12"]
    }else if (path == "/system/menu" || path == "/system/menu/"){
        menuState.selectedKeys = ["13"]
    }else if (path == "/system/mst-base" || path == "/system/mst-base/"){
        menuState.selectedKeys = ["14"]
    }else if (path == "/system/eventhub" || path == "/system/eventhub/"){
        menuState.selectedKeys = ["15"]
    }else if (path == "/system/iothub" || path == "/system/iothub/"){
        menuState.selectedKeys = ["16"]
    }else{
        menuState.selectedKeys = ["1"]
    }
})




function handleClick({ key }: MenuInfo) {
  
  switch (key) {
    case "1":
      router.push("/dashboard");
      
      break;
    case "2":
      router.push("/device");
      break;
    case "3":
      router.push("/general-setting");
      break;
    case "4":
      router.push("/schedule");
      break;
    case "5":
      router.push("/template");
      break;
    case "7":
      router.push("/log");
      break;
    case "11":
      router.push("/system/user");
      break;
    case "12":
      router.push("/system/role");
      break;
    case "13":
      router.push("/system/menu");
      break;
    case "14":
      router.push("/system/mst-base");
      break;
    case "15":
      router.push("/system/eventhub");
      break;
    case "16":
      router.push("/system/iothub");
      break;
    default:
      router.push("/dashboard");
      break;
  }
}


const hasShow = (rooterName: string) => {
  const menuShow: any = useCookie("menuShowList");
  if (menuShow.value && menuShow.value !== null) {
    for (let i = 0; i < menuShow.value.length; i++) {
      if (menuShow.value[i] == rooterName) {
        return true;
      }
    }
  }
};
</script>
