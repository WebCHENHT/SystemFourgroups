<template>
  <el-dialog v-model="dialogVisible" title="批量添加" width="40%" :before-close="handleClose">
    <div style="height: 130px">
      <el-steps direction="vertical">
        <el-step :title="'下载' + title + '试题模板，批量导入试题'" @click="download" />
        <el-step title="上传填写好的试题表" />
      </el-steps>
      <p class="p">
        注:从其他Excel或Word复制试题时请使用选择性粘贴 Word:右键一选择性粘贴-文本，
        Excel:右键一选择性粘贴一只勾选 “值”
      </p>
    </div>
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="rado"
      :headers="headerObj"
      :on-success="handleAvatarSuccess"
    >
      <template #trigger>
        <el-button type="primary" style="margin: 30px">点击上传文件</el-button>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancellation">取消</el-button>
        <el-button type="primary" @click="add"> 确定 </el-button>
      </span>
    </template>
    <!-- 批量添加列表 -->
    <BatchAdd v-if="isshow" v-model="isshow" :call="arr" :fal="fetch"></BatchAdd>
  </el-dialog>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { Download } from '@/untils/Downloadfilesdirectly'
import BatchAdd from '@/views/student/BatchAdd.vue'
import { ElMessageBox, type UploadInstance, type UploadProps } from 'element-plus'
import { reactive, ref } from 'vue'
const dialogVisible = ref(false)
let tatle = ref([])
let isshow = ref(false)
const upload = ref<UploadInstance>()
let store = useCounterStore()
let props = defineProps({
  call: {
    type: Function,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  rado: {
    type: String as any,
    default: ''
  }
})
const emit = defineEmits(['allTableDatas', 'aaa'])
// 获取token
const headerObj = reactive({
  Authorization: store.token
})
// 发送网络请求
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  tatle.value = response.data
}
// 取消
const cancellation = () => {
  props.call()
}
// 确定
let arr = ref({})
const add = () => {
  arr.value = tatle.value
  console.log(arr)
  isshow.value = true
}
let fetch = () => {
  props.call()
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认要退出吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const download = () => {
  Download('http://apis.90000p.com/exam2212/upload/student.xlsx', '试题')
}
</script>

<style scoped>
.p {
  margin-left: 50px;
  color: #f9492d;
  font-size: 13px;
  position: absolute;
  top: 120px;
}
.el-step {
  cursor: pointer;
}
</style>
