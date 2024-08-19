<template>
    <div>
        <div style="border: 1px solid #ccc; margin-top: 10px;">
            <Toolbar
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
                style="border-bottom: 1px solid #ccc"
            />
            <Editor
                :defaultConfig="editorConfig"
                :mode="mode"
                v-model="valueHtml"
                style="height: 200px; overflow-y: hidden;"
                @onCreated="handleCreated"
                @customAlert="customAlert"
            />
        </div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { i18nChangeLanguage } from '@wangeditor/editor'
export default {
  components: { Editor, Toolbar },
  props:['editorVal'],
  setup(props) {
    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef()
    
    // 内容 HTML
    const valueHtml = ref('')
    i18nChangeLanguage('en')
    
    watch(
      () => props.editorVal,
      (newValue, oldValue) => {
        if (newValue) {
          valueHtml.value = newValue.value
        }
      }
    );

    const toolbarConfig = {
        toolbarKeys: [
            "bold",
            "fontSize",
            "color",
            "italic",
            "underline",
            "indent",
            "lineHeight",
        ]
    }
    
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return

        editor.destroy()
    })
    
    // 编辑器回调函数
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    const customAlert = (info, type) => {
        
    }

    const insertText = () => {
        const editor = editorRef.value
        if (editor == null) return
        editor.insertText('hello world')
    }

    const printHtml = () => {
        const editor = editorRef.value
        if (editor == null) return
    }

    const disable = () => {
        const editor = editorRef.value
        if (editor == null) return
        editor.disable()
    }

    return {
      editorRef,
      mode: 'default',
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      customAlert,
      insertText,
      printHtml,
      disable,
    };
  }
}
</script>