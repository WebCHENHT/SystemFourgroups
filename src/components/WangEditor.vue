<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
    />
    <Editor
      style="height: 200px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editableOption"
      mode="default"
      @onCreated="handleCreated"
      @onBlur="handleInputBlur"
    />
  </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  nextTick,
  watch,
} from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import type { IToolbarConfig } from '@wangeditor/editor';
import { useFormItem } from 'element-plus';
const { formItem } = useFormItem();

const handleInputBlur = () => {
  // 触发trigger包含blur的校验规则
  formItem?.validate?.('blur');
};
let props = defineProps({
  modelValue: {
    type: String,
    defule: '',
  },
});

let emits = defineEmits<{
  (e: 'updata:modelValue', value: string): void;
}>();

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref('');
onMounted(() => {
  nextTick(() => (valueHtml.value = props.modelValue as string));
});
watch(
  () => props.modelValue,
  () => (valueHtml.value = props.modelValue as string)
);

watch(valueHtml, () => {
  emits(
    'updata:modelValue',
    valueHtml.value === '<p><br></p>' ? '' : valueHtml.value
  );
});
const toolbarConfig: Partial<IToolbarConfig> = {
  /* 工具栏配置 */
  toolbarKeys: [
    'bold', //加粗
    'italic', //斜体
    'underline', //下划线
    'color', //文字颜色
    'bgColor', //背景颜色
    'bulletedList', // 无序列表
    'numberedList', // 有序列表
    'justifyLeft', // 左对齐
    'justifyRight', // 右对齐
    'justifyCenter', //居中对齐
    'insertTable', // 插入表格
    {
      key: 'group-image',
      title: '图片',
      menuKeys: [
        'uploadImage', // 上传图片
        'insertImage', // 网络图片
      ],
    },
    'emotion', // 表情包
    'redo', // 重做
    'undo', // 撤销
    'fullScreen', // 全屏
  ],
};

// 编辑器配置
const editableOption = {
  placeholder: '请在这里输入内容...',

  MENU_CONF: {
    // 配置默认字号
    // 配置上传图片
    uploadImage: {
      // 请求路径
      server: 'http://www.eshareedu.cn/exam/api/upload/editeradd',
      // 后端接收的文件名称
      fieldName: 'file',
      maxFileSize: 10 * 1024 * 1024, // 10M
      // 上传的图片类型
      allowedFileTypes: [],
      onBeforeUpload(file: File) {
        return file;
      },
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 10 * 1024, // 10MB
      // 携带的数据
      meta: {
        baseUrl: '',
      },
      headers: {
        Authorization: sessionStorage.getItem('token'),
      },
      // 自定义上传图片
      customInsert(res: any, insertFn: any) {
        res.data.forEach((i:any)=>{
          insertFn('http://www.eshareedu.cn/exam/upload/'+i.url, i.alt, i.href);
        })
        // insertFn('http://www.eshareedu.cn/exam/upload/'+res.data[0].url, res.data[0].alt, res.data[0].href);
      },
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style scoped></style>
