<template>
  <div>
    <h3>班级管理</h3>
    <!-- 顶部 -->
    <div style="display: flex; margin-top: 20px">
      <div>
        <el-form-item label="班级名称">
          <el-input v-model="form.name" placeholder="请输入关键字" />
        </el-form-item>
      </div>
      &nbsp;&nbsp;
      <el-form-item label="部门">
        <!-- <el-cascader :options="options" :props="props2" clearable /> -->
      </el-form-item>
      &nbsp;&nbsp;&nbsp;
      <el-button type="primary">查询</el-button>
    </div>
    <!-- 表格 -->
    <div>
      <TableangPage
        :tableColums="tableColums"
        :TableData="TableData"
        :isselect="true"
        :total="total"
        @sonhandleCurrentChange="handleCurrentChange"
        @sonhandleSizeChange="handleSizeChange"
      >
        <!-- 操作 -->
        <template #actions>
          <el-button type="primary" link>编辑</el-button>
          <el-button type="primary" link>删除</el-button>
        </template>
      </TableangPage>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClList } from '@/assets/api/classes/classe'
import TableangPage from '@/components/TableangPage.vue'
import { reactive, ref } from 'vue'
let form = reactive({
  name: '',
  region: ''
})
// 级联框
// const props2 = {
//   multiple: true,
//   checkStrictly: true,
// }
let tableColums = reactive([
  {
    label: '班级名称',
    prop: 'name',
    width: '80'
  },
  {
    label: '部门',
    prop: 'depname'
  },
  {
    label: '操作',
    slotname: 'actions',
    isslot: true
  }
])
// 约束类型
interface T {
  page: number
  psize: number
  depid: number
  key: string
}
// 所传的参数
const ruform = reactive<T>({
  page: 1,
  psize: 12,
  depid: 0,
  key: ''
})
const TableData = ref([])
// 分页
let total = ref()
let list = async () => {
  let res: any = await ClList(ruform)
  if (res.errCode === 10000) {
    TableData.value = res.data.list
    total.value = res.data.counts
  }
}
list()
// 分页逻辑
const handleSizeChange = (val: number) => {
  ruform.psize = val
  list()
}
const handleCurrentChange = (val: number) => {
  ruform.page = val
  list()
}
</script>

<style scoped lang="less">
.el-input {
  width: 200px;
}
</style>
