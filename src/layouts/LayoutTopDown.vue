<template>
  <a-layout class="layout-top-down" style="min-height: 100vh">
    <a-layout-header :class="darkMode ? '' : 'layout-light'">
      <c-header-broken v-if="collaWidth == 0"/>
      <c-header v-else/>
    </a-layout-header>

    <a-layout>
      <a-layout-sider
          v-if="showSider && !fullScreen"
          v-model:collapsed="collapsed"
          collapsible
          :theme="darkMode ? 'dark' : 'light'"

          :width="siderWidth"
          breakpoint="lg"
          :collapsed-width="collaWidth"
          @breakpoint="onBreakpoint"
      >
        <c-sider/>
      </a-layout-sider>

      <a-layout style="padding: 0 5px 5px" :class="darkMode ? '' : 'layout-light'">


        <a-layout-content style="padding: 0 5px 0 5px">
          <slot/>
        </a-layout-content>

        <a-layout-footer :class="darkMode ? '' : 'layout-light'" style="text-align: center">
          Advantec ©2024 Created by Sweet-Vue
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import CSider from "~/components/layout/CSider.vue";
import CHeader from "~/components/layout/CHeader.vue";
import CHeaderBroken from "~/components/layout/CHeaderBroken.vue";
import {useGlobalConfigStore} from "~/store/global";
import {theme} from "ant-design-vue";

const {useToken} = theme;
const {token} = useToken();

const collapsed = ref<boolean>(false);
const globalConfig = useGlobalConfigStore();
const {darkMode, pageTitle, fullScreen, fontSize,showSider} = storeToRefs(globalConfig);
const collaWidth = ref<number>(1)

let siderWidth = computed(() => {
  switch (fontSize.value) {
    case "large":
      return 250;
    case "medium":
      return 220;
    default:
      return 180;
  }
});



const emits = defineEmits(["breakpoint"])

function onBreakpoint(broken) {
  if (broken) {
    collaWidth.value = 0
  } else {
    collaWidth.value = 80
  }

  emits("breakpoint", broken)
}
</script>

<style>
.layout-top-down .layout-light {
  background-color: #fff !important;
}

.layout-top-down .ant-layout-header {
  padding-inline: 0px;
}

.layout-top-down .ant-layout .ant-layout-sider-zero-width-trigger {
  top: 0px;
}

.layout-top-down .ant-layout .ant-layout-sider-zero-width-trigger:hover {
  color: v-bind("token?.colorPrimary");
}

.layout-top-down .sidebar-trigger {
  font-size: 24px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;
  margin-right: 5px;
  color: v-bind("token?.colorTextBase");
}

.layout-top-down .sidebar-trigger:hover {
  color: v-bind("token?.colorPrimary");
}
</style>
