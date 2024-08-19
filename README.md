# go-sweet-vue3
# 项目介绍
```text
本项目由Vue3 + ts + Ant Design Vue项目构建完成的轻型Vue3项目
ant地址: https://www.antdv.com/components/overview
```
# Node.js版本
- 21.1.0及以上版本

# 包含的额外组件
```text
1. Ant组件
2. Echart 图表工具
3. wangeditor 富文本编辑器
```

# 项目结构
```text
go-sweet-vue3
    - .nuxt 
    - mock 
    - src 源码目录
        - assets 从阿里巴巴矢量图标册网站导出的图标
        - components 自定义组件
        - layouts 系统级组件
        - locales 国际化配置文件
        - pages 系统页面
        - plugins 一些系统级配置
        - public 公共资源存放处, 例如图片
        - server mock时使用
        - store 用于变量定义以及对后端接口的访问
    - .env.development dev环境
    - .env.production prod环境
    - .env.test test环境
    - nuxt.config 项目的主要配置文件
    - package.json
```

# 编写约定
```text
1. 尽量使用自定义组件的方式进行编写页面
2. 所有的通用型变量尽量定义到store里, 这样就避免了多页面或多组件之间传参的问题
3. 所有访问后端接口的函数都应该写在store里
4. 所有函数及变量的命名方式都应当遵守阿里巴巴开发手册中的约定
```

# 自定义请求头等信息
```text
请在layouts/default.vue中搜索 globalThis.$fetch = ofetch.create
在onRequest中可以添加自定义请求头
在onResponse中可以自定义处理错误信息
```