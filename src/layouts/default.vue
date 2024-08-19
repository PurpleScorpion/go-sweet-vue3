<template>
  <a-config-provider
      :locale="currentLang"
      :theme="{
      token: {
        colorPrimary: currentTheme,
        fontSize: curFontSize,
        fontFamily: 'YJTop Ellipsis,ヒラギノ角ゴ ProN,Hiragino Kaku Gothic ProN,メイリオ,Meiryo,Osaka,ＭＳ Ｐゴシック,MS PGothic,sans-serif'
      },
      algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
  >
    <layout-top-down @breakpoint="onBreakpoint">
      <slot/>
    </layout-top-down>

    <a-float-button-group trigger="click" :class="floatBtnStyle">
      <template #icon>
        <DesktopOutlined/>
      </template>

      <a-float-button @click="handleDarkModeClick">
        <template #icon>
          <icon-font v-if="darkMode" type="icon-sun"/>
          <icon-font v-else type="icon-moon"/>
        </template>
      </a-float-button>

      <a-float-button>
        <template #icon>
          <a-popover placement="left">
            <template #content>
              <a-menu :selectedKeys="curThemeForMenu" @click="handleThemeClick" style="width: 130px">
                <a-menu-item v-for="(colorValue, colorName) in customThemeColor" :key="colorValue">
                  <template #icon :style="{ color: colorValue }">
                    <icon-font type="icon-colors" :style="{ color: colorValue }"></icon-font>
                  </template>
                  {{ $t("menu.theme." + colorName) }}
                </a-menu-item>
              </a-menu>
            </template>
            <icon-font type="icon-colors" :style="{ color: curThemeForMenu }"></icon-font>
          </a-popover>

        </template>
      </a-float-button>

      <a-float-button type="default" @click="exitFullScreen">
        <template #icon>
          <FullscreenExitOutlined v-if="fullScreen"/>
          <FullscreenOutlined v-else/>
        </template>

      </a-float-button>
    </a-float-button-group>
  </a-config-provider>
</template>

<script lang="ts" setup>
import {ref, onMounted, onUnmounted} from "vue";
import {FullscreenExitOutlined} from "@ant-design/icons-vue";
import LayoutTopDown from "./LayoutTopDown.vue";
import {theme} from "ant-design-vue";
import zh from "ant-design-vue/es/locale/zh_CN";
import en from "ant-design-vue/es/locale/en_US";
import {useAuthStore} from '~/store/user/auth';
import {sysUserStore} from "~/store/system/user/user";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import {useGlobalConfigStore, customThemeColor} from "~/store/global";

import {ofetch} from "ofetch";


const userToken = useCookie("token");

const {healthCheck} = sysUserStore();
const globalConfig = useGlobalConfigStore();
const {lang, darkMode, userTheme, layout, fullScreen, fontSize} = storeToRefs(globalConfig);
const currentLang = ref(switchLangFun(globalConfig.getStateLang));

const currentTheme = ref(globalConfig.getUserTheme);
const curThemeForMenu = ref([globalConfig.getUserTheme]);
const router = useRouter();
let curLayout = computed(() => layout.value);

let curFontSize = computed(() => {
  switch (fontSize.value) {
    case "large":
      return 24;
    case "medium":
      return 20;
    default:
      return 14;
  }
});

const layoutBroken = ref(false);
let floatBtnStyle = computed(() => {
  if (layoutBroken.value) {
    return "c-float-button broken";
  } else {
    return "c-float-button";
  }
});

function onBreakpoint(broken) {
  layoutBroken.value = broken;
}

// const bgColor = ref<String>(darkMode.value ? "#141414":"#fff")

watch(darkMode, (val) => {
  // bgColor.value = val ? "#141414":"#fff"
});

watch(lang, (val) => {
  if (val) currentLang.value = switchLangFun(val);
});

watch(userTheme, (val) => {
  if (val) currentTheme.value = val;
});

//国际化时间组件
watch(currentLang, (val) => {
  dayjs.locale(val.locale);
});

function switchLangFun(val: string) {
  switch (val) {
    case "zh":
      return zh;
    case "en":
      return en;
    default:
      return zh;
  }
}

onMounted(() => {
  checkUser()
  window.addEventListener("keydown", handleKeyDown);
  // document.documentElement.style.setProperty('--color', color)
  // if (darkMode.value == undefined) {
  //   darkMode.value = true
  // }
});
2
const checkUser = () => {

  setInterval(function () {
    // 获取当前路由地址
    if (router.currentRoute.value.path != "/login") {
      healthCheck()
    }
  }, 1000 * 5)


}

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

function handleKeyDown(ev) {
  if (fullScreen.value && ev.key == "Escape") {
    exitFullScreen();
  }
}

function exitFullScreen() {
  globalConfig.toogleFullScreen();
}

function handleDarkModeClick() {
  globalConfig.tooggleDarkMode();
}

function handleLayoutClick() {
  globalConfig.tooggleLayout();
}

function handleThemeClick({key}) {
  curThemeForMenu.value = [key];
  globalConfig.changeThemeColor(key);
}

const baseHeader = {
  "Content-Type": "application/json",
};


const {authenticated} = storeToRefs(useAuthStore());
const config = useRuntimeConfig(event);
globalThis.$fetch = ofetch.create({
      baseURL: config.public.apiBase,
      headers: baseHeader,
      onRequest({options}) {
        // 添加请求头,没登录不携带token
        let utoken = sessionStorage.getItem("token") == null ? '' : sessionStorage.getItem("token")
        options.headers = new Headers(options.headers)
        options.headers.set('Token', `${utoken}`)
      },
      onResponse({response}) {
        if (response._data && response._data.code == 503) {
          sessionStorage.removeItem("token")
          authenticated.value = false
          return navigateTo('/login')
        }
        // 成功返回
        return response._data
      }
    }
);

</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.layout-light {
  background-color: #f5f5f5 !important;
}

.c-float-button {
  right: 30px;
  bottom: 80px;
  font-size: 20px !important;

}

.broken {
  right: 15px;
  bottom: 15px;
  font-size: 20px !important;
}

.c-float-button .ant-float-btn-icon {
  width: 20px !important;
}

.ant-float-btn-group > .ant-float-btn {
  border: 2px solid v-bind("currentTheme");
}

.ems-logo-text-microgrid {
  fill: v-bind("currentTheme");
}

/* .ant-layout-sider-children{
    background-color: v-bind("bgColor");
} */

/* 去除silder边框和背景颜色 */
.ant-layout-sider-children ul{
  border: 0 !important;
}

.ant-layout-sider-children .ant-menu-inline{
  background: none !important;
}


</style>
