<template>
  <el-dialog v-model="dialogVisible" title="题库列表" width="70%">
    <div v-if="show">
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
        @sonhandleCurrentChange="sonhandleCurrentChange"
        @sonhandleSizeChange="sonhandleSizeChange"
      >
        <template #actions="scope">
          <el-radio-group v-model="radio">
            <el-radio :label="scope.data.title" @change="change(scope.data)" />
          </el-radio-group>
        </template>
      </TableangPage>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="add"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { DatabaseList, datalist } from '@/assets/api/databaselist/DatabaseList'
import TableangPage from '@/components/TableangPage.vue'
import { reactive, ref } from 'vue'
let tableData = ref([])
let total = ref(0)
let show = ref(true)
const radio = ref()
const dialogVisible = ref(false)
const tableColums = reactive([
  {
    label: '题库',
    slotname: 'actions',
    isslot: true
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

let props = defineProps({
  fal: {
    type: Function,
    required: true
  }
})
let data: any = reactive({
  page: 1,
  psize: 10,
  key: '',
  admin: '',
  ismy: 1
})
// 单选框获取id
let database = ref({
  databaseid: 0
})
const change = (row: any) => {
  database.value = row.id
}
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
const emit = defineEmits(['allTableDatas'])
// 添加
const add = async () => {
  emit('allTableDatas', 111111)
  let res: any = await DatabaseList({ databaseid: database.value })
  if (res.errCode === 10000) {
    props.fal()
  }
}
</script>

<style scoped></style>
