<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#9155fd'
    },
    algorithm: darkMode?theme.darkAlgorithm:theme.defaultAlgorithm
  }">
  <a-layout>
    <slot />
  </a-layout>
  </a-config-provider>
</template>

<script lang="ts" setup>
import { theme } from "ant-design-vue";
import { useGlobalConfigStore } from "~/store/global";

const globalConfig = useGlobalConfigStore()
const { darkMode, userTheme } = storeToRefs(globalConfig);

</script>
