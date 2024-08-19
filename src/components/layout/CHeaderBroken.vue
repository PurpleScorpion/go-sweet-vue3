<template>
  <div class="c-header-broken">
    <a-row justify="center" align="middle" style="height: 100%">
      <a-col :span="22">
        <a-row justify="center">
          <a-image :preview="false" style="padding: 0 10px" height="48px" src="/logo.png" />
        </a-row>
      </a-col>
      <a-col :span="2">
        <a-row justify="end" align="middle" style="height: 100%">
          <a-popover placement="leftBottom" trigger="click">
            <template #content>
              <a-menu mode="inline" @click="handleMenuClick">

                <a-menu-item-group key="grp5" :icon="h(DesktopOutlined)" :title="$t('menu.title.topRight.locale')">
                  <a-menu-item key="locale-en">English</a-menu-item>
                  <a-menu-item key="locale-zh">中文</a-menu-item>
                </a-menu-item-group>

                <a-menu-item-group key="grp5" :icon="h(DesktopOutlined)" :title="$t('menu.title.topRight.user')">
                <a-menu-item key="user-logout">{{ $t("user.login.logout") }}</a-menu-item>
                </a-menu-item-group>
              </a-menu>
            </template>
            <a-button :icon="h(UnorderedListOutlined)" style="margin-right:5px;" />
          </a-popover>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { h } from "vue";
import {
  UserOutlined,
  GlobalOutlined,
  LayoutOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  FontSizeOutlined,
  UnorderedListOutlined,
  DesktopOutlined
} from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import { useGlobalConfigStore, customThemeColor } from "~/store/global";
import { useAuthStore } from "~/store/user/auth";
import { theme } from "ant-design-vue";

const { useToken } = theme;
const { token } = useToken();
const globalConfig = useGlobalConfigStore();
const router = useRouter();
const { logUserOut } = useAuthStore();
const { darkMode, layout, fullScreen, fontSize } = storeToRefs(globalConfig);
const { locale } = useI18n();
const curTheme = ref([globalConfig.getUserTheme]);
const curLang = ref([globalConfig.getStateLang]);
const curLayout = ref([layout.value]);
const curFontSize = ref([fontSize.value]);

function handleMenuClick({key}) {
  if (key.indexOf("font-size-") == 0) {
    handleFontSizeClick({key: key.substring('font-size-'.length)})
  } else if (key.indexOf("layout-") == 0) {
    handleLayoutClick({key: key.substring('layout-'.length)})
  } else if (key.indexOf("theme-") == 0) {
    handleThemeClick({key: key.substring('theme-'.length)})
  } else if (key.indexOf("locale-") == 0) {
    handleLocaleClick({key: key.substring('locale-'.length)})
  } else if (key.indexOf("user-") == 0) {
    handleUserClick({key: key.substring('user-'.length)})
  } 
}

function handleFontSizeClick({ key }) {
  curFontSize.value = [key];
  globalConfig.changeFontSize(key);
}

function handleLayoutClick({ key }) {
  curLayout.value = [key];
  globalConfig.changeLayout(key);
}

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
  }
}

function handleThemeClick({ key }) {
  curTheme.value = [key];
  globalConfig.changeThemeColor(key);
}

function logout() {
  logUserOut();
  router.push("/login");
}
</script>
<style scoped>
.c-header-broken {
  font-size: 32px;
}

.c-header-broken .sidebar-trigger {
  font-size: 32px;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.3s;
}

.c-header-broken .sidebar-trigger:hover {
  color: v-bind("token?.colorPrimary");
}

.header-logo {
  height: 64px;
  background: rgba(255, 255, 255, 0.3);
  margin: 100px 10px;
  padding: 100px;
}

.c-header-broken .ant-btn-icon-only {
  margin-left: 5px;
}
</style>
