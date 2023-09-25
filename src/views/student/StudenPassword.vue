<template>
  <el-dialog v-model="dialogVisible" title="重置密码" width="30%" :before-close="handleClose">
    <el-form :model="form" label-width="120px">
      <el-form-item label="姓名:">
        {{ form.name }}
      </el-form-item>
      <el-form-item label="密码:">
        <el-input type="password" v-model="form.oldpass" />
      </el-form-item>
      <el-form-item label="确认密码:">
        <el-input type="password" v-model="form.pass" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancellation">取消</el-button>
        <el-button type="primary" @click="add"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { classesadd } from '@/assets/api/studen/studen'
import { errorMsg, succesMsg } from '@/untils/msg'

import { ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'

const props = defineProps({
  call: {
    type: Object,
    required: true
  },
  fal: {
    type: Function,
    required: true
  }
})
let form = reactive({
  id: props.call.id,
  name: props.call.name,
  classid: props.call.classid,
  username: props.call.username,
  oldpass: '',
  pass: ''
})
const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要退出吗? ')
    .then(() => {
      done()
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
const cancellation = () => {
  props.fal()
}
const add = async () => {
  let res = await classesadd(form)
  if (res.errCode === 10000) {
    succesMsg('重置成功！')
    props.fal()
  }
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
