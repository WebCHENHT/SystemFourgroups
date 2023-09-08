<template>
  <el-dialog v-model="dialogVisible" title="批量上传学生信息" width="70%">
    <el-table
      v-loading="loading"
      :data="tableData"
      height="450"
      style="width: 100%; background-color: aquamarine"
    >
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="mobile" label="电话" />
      <el-table-column prop="classname" label="班级" />
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="remarks" label="备注" />
      <el-table-column prop="address" label="状态">
        <el-button type="success" :icon="Check" circle />
      </el-table-column>
    </el-table>

    <template #footer>
      <div style="display: flex; justify-content: space-between">
        <div>
          <span> 全部：{{ tableData.length }}</span>
          <span> 成功：<span style="color: rgb(114, 199, 73)">202</span></span>
          <span> 失败：<span style="color: rgb(245, 114, 114)">0</span></span>
        </div>
        <div>
          <el-button @click="add">完成</el-button>
          <el-button type="primary" @click="excel"> 导出数据 </el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { classesadd } from '@/assets/api/studen/studen'
import { Check } from '@element-plus/icons-vue'
import { ref } from 'vue'
import * as XLSX from 'xlsx' // 导出文件
const loading = ref(false)
let props = defineProps({
  call: {
    type: Object,
    required: true
  },
  fal: {
    type: Function,
    required: true
  }
})

const dialogVisible = ref(false)
const tableData = ref(props.call)

const add = async () => {
  loading.value = true
  tableData.value.forEach(async (row: any) => {
    let data = {
      id: row.id,
      name: row.name,
      username: row.username,
      pass: row.pass
    }
    let res = await classesadd(data)
    if (res.errCode === 10000) {
      loading.value = false
      props.fal()
    }
  })
}
// 导出excel
let excel = () => {
  // 1.创建工作表
  let data = XLSX.utils.json_to_sheet(tableData.value) // 2.创建工作簿
  let wb = XLSX.utils.book_new() // 3.把工作表放到工作簿中
  XLSX.utils.book_append_sheet(wb, data, 'data') // 4.生成文件并下载
  XLSX.writeFile(wb, '哈哈哈' + '.xlsx')
}
</script>

<style scoped lang="less">
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
/deep/.el-table__row {
  background-color: #f0f9eb;
}
</style>
