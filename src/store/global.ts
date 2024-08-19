import { defineStore } from 'pinia';
import type { CookieRef } from '#app'

interface GlobalConfig {
  userTheme: CookieRef<string>;
  lang: CookieRef<string>;
  darkMode: CookieRef<boolean>;
  pageTitle: string;
  layout: CookieRef<string>;
  fullScreen: boolean;
  fontSize: CookieRef<string>;
  showSider: boolean;
}

export const customThemeColor = {
  red: '#F5222D',
  orange: '#FA541C',
  yellow: '#FAAD14',
  cyan: '#13C2C2',
  green: '#52C41A',
  blue: '#2F54EB',
  purple: '#9155FD'
}

export const useGlobalConfigStore = defineStore('global', {
  state: (): GlobalConfig => ({
    userTheme: useCookie('theme') || customThemeColor.blue,
    darkMode: (useCookie('darkMode') ?? ref(true)),
    lang: (useCookie('lang') || navigator.language),
    pageTitle: '',
    layout: useCookie('layout') ?? ref('TopDown'),
    fullScreen: false,
    fontSize: useCookie('fontSize') ?? ref('small'),
    showSider: true
  }),
  getters: {
    getStateLang(state) {
      return state.lang ? state.lang : navigator.language
    },
    getUserTheme(state) {
      return state.userTheme ? state.userTheme : customThemeColor.blue
    },
    getDarkMode(state) {
      return state.darkMode ? state.darkMode : true
    },
    getEnv() {

      return process.env.NUXT_BASE_API_URL
    }
  },
  actions: {
    changeLang(lang: string) {
      this.lang = lang;
    },
    setPageTitle(title: string) {
      this.pageTitle = title;
    },
    changeThemeColor(th: string) {
      this.userTheme = th;
    },
    changeLayout(lay: string) {
      this.layout = lay;
    },
    tooggleDarkMode() {
      this.darkMode = !this.darkMode
    },
    tooggleLayout() {
      if (this.layout == 'LeftRight') {
        this.layout = 'TopDown'
      } else {
        this.layout = 'LeftRight';
      }
    },
    changeFontSize(size: string) {
      this.fontSize = size;
    },
    toogleFullScreen() {
      this.fullScreen = !this.fullScreen
    }
  },
});