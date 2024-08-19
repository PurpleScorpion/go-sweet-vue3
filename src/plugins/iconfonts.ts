import { createFromIconfontCN } from '@ant-design/icons-vue';
import * as customIcons from '@/assets/iconfonts/iconfont.js'

export default defineNuxtPlugin(({ vueApp }) => {
    const IconFont = createFromIconfontCN({
        scriptUrl: customIcons
      });
      
      vueApp.component('icon-font', IconFont);
})
