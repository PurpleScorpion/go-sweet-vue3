import CSvgImage from '@/components/atom/CSvgImage.vue';
import 'virtual:svg-icons-register'

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.component('c-svg-image', CSvgImage);
})
