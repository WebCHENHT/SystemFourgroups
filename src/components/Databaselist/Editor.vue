<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" mode="default" />
    <Editor style="height: 200px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig" mode="default" @onCreated="handleCreated"
    @on-change="handleChange" />
  </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, ref, shallowRef} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
 
const emit = defineEmits(['update:editorValue'])
const props = defineProps({
    editorValue:{
        type:String,
        default:''
    }
})
const valueHtml = ref(props.editorValue)
 
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {
  excludeKeys: [
    'headerSelect',
    'italic',
    'group-more-style',// 排除菜单组，写菜单组 key 的值即可
    "group-video"
  ]
}
const editorConfig = { 
    placeholder: '请输入内容...' ,
    readOnly: false,
    MENU_CONF: {} as any
}
//使用base64方式上传文件
editorConfig.MENU_CONF['uploadImage'] = {
    base64LimitSize: 1024*1024 * 1024 // 5kb
}
 
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
 
const handleCreated = (editor:any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
//富文本发生变化后，把内容传给父组件
const handleChange = (editor:any) => {
    emit('update:editorValue', editor.getHtml())
}
 
</script>
 
<style lang="less">
.w-e-text-container {
  height: 500px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>