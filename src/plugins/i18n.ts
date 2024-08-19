import { createI18n } from 'vue-i18n';
import { en, zh } from '@/locales/index';
const message = {
  en,
  zh,
}

export default defineNuxtPlugin(({ vueApp }) => {
  const Cookie = useCookie('lang');
  //这里使用了内置api  可以快速设置获取cookie   当然这里也可以设置在localStorage中使用 不使用useCookie
  Cookie.value = Cookie.value || 'zh'
  const i18n = createI18n({
    legacy: false,//使用vue3组合式API时必须设置为FALSE
    locale: Cookie.value || 'zh',
    fallbackLocale: 'zh', // set fallback locale
    messages: message,
    globalInjection: true,//全局注入$t函数
  })
  vueApp.use(i18n)
});