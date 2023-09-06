<template>
  <el-dialog v-model="dialogVisible" title="题库列表" width="70%">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="题库名称:">
        <el-input placeholder="请输入题库名称" clearable />
      </el-form-item>
      <el-form-item label="创建人:">
        <el-input placeholder="请输入创建人" clearable />
      </el-form-item>
      <el-form-item>
        <el-checkbox :true-label="1" :false-label="0" label="只看我创建的" size="large" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <TableangPage
      :TableData="tableData"
      :tableColums="tableColums"
      :total="total"
      :isselect="true"
      @allTableData="allTableData"
      @sonhandleCurrentChange="sonhandleCurrentChange"
      @sonhandleSizeChange="sonhandleSizeChange"
    >
    </TableangPage>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { datalist } from '@/assets/api/databaselist/DatabaseList'
import { reactive, ref } from 'vue'
let tableData = ref([])
let total = ref(0)
const dialogVisible = ref(false)
const tableColums = reactive([
  {
    label: '题库',
    prop: 'title'
  },
  {
    label: '题目数量',
    prop: 'counts'
  },
  {
    label: '创建时间',
    prop: 'addtime'
  },
  {
    label: '创建人',
    prop: 'admin'
  }
])
let id: any = reactive([]) //定义多选数据
//多选获取id
const allTableData = (val: any) => {
  const arr = val.map((item: { id: any }) => {
    return item.id
  })
  id = arr
  console.log(id)
}
let data: any = reactive({
  page: 1,
  psize: 10,
  key: '',
  admin: '',
  ismy: 1
})
// 题库列表
const lists = async () => {
  let res: any = await datalist(data)
  if (res.errCode === 10000) {
    tableData.value = res.data.list
    total.value = res.data.counts
  }
}
lists()
// 分页
const sonhandleSizeChange = (val: number) => {
  data.psize = val
  lists()
}
const sonhandleCurrentChange = (val: number) => {
  data.page = val
  lists()
}
</script>

<style scoped></style>
