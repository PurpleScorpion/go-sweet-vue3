// https://nuxt.com/docs/api/configuration/nuxt-config

import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import path from 'path'

export default defineNuxtConfig({
    ssr: false,
    pages: true,
    app: {
        head: {
            title: 'Sweet-Vue',
            htmlAttrs: {
                lang: 'ja',
                class: ['notranslate'],
                translate: 'no',
            },

            viewport: 'width=device-width, initial-scale=1.0',
            meta: [
                {name: 'Sweet Vue3', content: 'Sweet Vue3'},
                {
                    name: 'theme-color',
                    content: '#00AEDF',
                },
                {name: 'google', content: 'notranslate'},
            ],
            bodyAttrs: {
                class: ['notranslate'],
            },
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
            ],
        },
    },
    srcDir: 'src/',
    devtools: {enabled: true},
    modules: [
        '@ant-design-vue/nuxt',
        '@pinia/nuxt',
    ],
    antd: {
        // Options
    },
    runtimeConfig: {
        // Public keys that are exposed to the client
        public: {
            apiBase: process.env.NUXT_BASE_API_URL,
            apiEnv: process.env.RUN_MODE_ENV,
        }
    },
    css: [
        '~/assets/iconfonts/iconfont.css'
    ],
    vite: {
        plugins: [
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
                symbolId: 'c-svg-image-[dir]-[name]',
            })
        ],
    },
})
