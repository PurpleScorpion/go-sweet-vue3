<template>
  <div class="c-header">
    <a-row align="middle" style="height: 100%;">
      <a-col flex="190px">
        <a-image v-if="layout != 'LeftRight' || fullScreen" :preview="false" style="padding: 0 10px" height="48px" src="/logo.png" />
      </a-col>
      <a-col flex="500px">
        <menu-fold-outlined
            v-if="showSider && !fullScreen"
            class="sidebar-trigger"
            @click="toogleSider"
        />
        <menu-unfold-outlined
            v-else-if="!fullScreen"
            class="sidebar-trigger"
            @click="toogleSider"
        />
<!--        <span style="font-size: 24px">{{ $t(pageTitle) }}</span>-->
      </a-col>

      <a-col flex="auto" style="padding-right: 30px;">
        <a-row justify="end" align="middle" style="height: 100%">

          <a-dropdown>
            <template #overlay>
              <a-menu :selectedKeys="curLang" @click="handleLocaleClick">
                <a-menu-item key="en">English</a-menu-item>
                <a-menu-item key="zh">中文</a-menu-item>
              </a-menu>
            </template>
            <a-button :icon="h(GlobalOutlined)" />
          </a-dropdown>

          <a-dropdown>
            <template #overlay>
              <a-menu @click="handleUserClick">
                <a-menu-item key="logout">{{ $t("user.login.logout") }}</a-menu-item>
                <a-menu-item key="changePassword">{{ $t("user.login.change_password") }}</a-menu-item>
              </a-menu>
            </template>
            <a-button :icon="h(UserOutlined)" />
          </a-dropdown>
        </a-row>
      </a-col>
    </a-row>
    <ChangePassword :controlVisible="changePasswordVisible" @close="handleChangePasswordClose" />
  </div>
</template>

<script lang="ts" setup>
import { h } from "vue";
import {
  UserOutlined,
  GlobalOutlined,
  FontSizeOutlined,
} from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import { useGlobalConfigStore } from "~/store/global";
import { useAuthStore } from "~/store/user/auth";
import { theme } from "ant-design-vue";
import ChangePassword from "./ChangePassword.vue";
import {storeToRefs} from "pinia";
const { useToken } = theme;
const { token } = useToken();
const globalConfig = useGlobalConfigStore();
const router = useRouter();
const { logUserOut } = useAuthStore();
const { darkMode, layout, fullScreen, fontSize,pageTitle,showSider } = storeToRefs(globalConfig);
const { locale } = useI18n();
const curTheme = ref([globalConfig.getUserTheme]);
const curLang = ref([globalConfig.getStateLang]);
const curLayout = ref([layout.value]);
const changePasswordVisible = ref<boolean>(false);
const curFontSize = ref([fontSize.value]);

function handleFontSizeClick({ key }) {
  curFontSize.value = [key];
  globalConfig.changeFontSize(key);
}

const toogleSider = () => {
  // emit("update:showSider", !props.showSider);
  // token.fontSize = 48;
  showSider.value = !showSider.value
};

function handleLocaleClick({ key }) {
  curLang.value = [key];
  locale.value = key;
  globalConfig.changeLang(key);
}

function handleUserClick({ key }) {
  switch (key) {
    case "logout":
      logout();
      break;
    case "changePassword":
      changePasswordVisible.value = true;
      break;
  }
}

async function logout() {
  logUserOut();
  await navigateTo("/login");
}


function handleChangePasswordClose(flag: Boolean) {
  changePasswordVisible.value = false;
  if (flag) {
    logout();
  }
}
</script>
<style scoped>
.c-header {
  font-size: 32px;
}

.header-logo {
  height: 64px;
  background: rgba(255, 255, 255, 0.3);
  margin: 100px 10px;
  padding: 100px;
}

.c-header .ant-btn-icon-only {
  margin-left: 5px;
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.text {
  display: flex;
  justify-content: center;
  margin-bottom: 10%;
  font-size: 40px;
}
.button {
  display: flex;
  gap: 10%;
  justify-content: center;
}
</style>
