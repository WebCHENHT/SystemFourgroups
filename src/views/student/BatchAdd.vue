<template>
  <el-dialog v-model="dialogVisible" title="批量上传学生信息" width="70%">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名"  />
      <el-table-column prop="mobile" label="电话"  />
      <el-table-column prop="classname" label="班级" />
      <el-table-column prop="username" label="账号"  />
      <el-table-column prop="remarks" label="备注"  />
      <el-table-column prop="address" label="状态" />
    </el-table>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let props = defineProps({
  call: {
    type: Object,
    required: true
  }
})
console.log(props.call)

const dialogVisible = ref(false)
const tableData = ref(props.call)
</script>

<style scoped lang="less"></style>
