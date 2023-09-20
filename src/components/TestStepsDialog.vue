<template>
  <el-dialog v-model="dialogVisible" title="批量导入试题" width="40%" @close="Dialogclose">
    <div class="impmrt">
      <div class="batchLeft">
        <el-steps direction="vertical">
          <el-step />
          <el-step />
        </el-steps>
      </div>
      <div class="batchRight">
        <p class="Righttitle">
          下载
          <span style="color: rgb(19, 79, 253); cursor: pointer" @click="xiazias">试题模板</span
          >，批量导入试题
        </p>
        <p class="Rightbody">
          注:从其他Excel或Word复制试题时请使用选择性粘贴 Word:右键一选择性粘贴-文本，
          Excel:右键一选择性粘贴一只勾选 “值”
        </p>
        <p class="Righttitle">上传填写好的试题表</p>
      </div>
    </div>
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      :headers="data"
      :action="'' + url"
      :auto-upload="true"
      :before-upload="beforeAvatarUpload"
      :on-success="uploadsuccess"
    >
      <template #trigger>
        <el-button type="primary" style="font-size: 12px; margin: 15px 35px"
          >点击上传文件</el-button
        >
      </template>
    </el-upload>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Dialogdetermine"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, inject, reactive } from 'vue'

import type { UploadInstance } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { useCounterStore } from '@/stores/counter'
import { htmlEncodeByRegExp } from '@/untils/htmlCode'
import { ElMessage } from 'element-plus'
import { Download } from '@/untils/Downloadfilesdirectly'

let emits = defineEmits<{
  (name: 'MyStepsAdd', value: any): void
  (name: 'Myialogclose'): any
}>()
let Store = useCounterStore()
const uploadRef = ref<UploadInstance>()
const data = reactive({
  Authorization: Store.token
})
const url = inject('url')
const dialogVisible = ref(false)
//传给试题
let TestStepsDialogdatas = ref([])
//下载试题
const xiazias = () => {
  Download('http://apis.90000p.com/exam2212/upload/question.xlsx', 'question')
}
//点击确定
const Dialogdetermine = () => {
  if (TestStepsDialogdatas.value.length <= 0) {
    ElMessage.warning('上传数据为空请换个文件重新上传')
  } else {
    emits(
      'MyStepsAdd',
      TestStepsDialogdatas.value.map((item: any) => ({
        ...item,
        title: htmlEncodeByRegExp(item.title)
      }))
    )
  }
}
//上传成功钩子
const uploadsuccess = (response: any, uploadFile: any, uploadFiles: any): void => {
  if (response.errCode === 10000) {
    ElMessage.success('请求成功')
    TestStepsDialogdatas.value = response.data
  }
}
//上传文件之前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile)

  if (rawFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    ElMessage.error('请导入excel格式文件')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('文件大小不能超过2MB')
    return false
  }
  return true
}
const Dialogclose = () => {
  emits('Myialogclose')
}
defineExpose({ dialogVisible })
</script>

<style lang="less" scoped>
.upload-demo {
  width: 100%;
  height: 62px;
  display: flex;
  align-items: center;
}
.impmrt {
  display: flex;
}
.batchLeft {
  height: 125px;
}
.batchRight {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .Righttitle {
    font-size: 16px;
    color: #c0c4cc;
  }
  .Rightbody {
    color: #f9492d;
    font-size: 13px;
  }
}
/deep/.el-step__icon.is-text {
  color: #c0c4cc;
  border-color: #c0c4cc;
}
</style>
