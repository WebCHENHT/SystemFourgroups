<template>
  <div class="role">
    <div class="role-span">
      <span>角色管理</span>
      <el-button type="primary" @click="add" v-authority="{ model: '角色', name: '添加' }">添加角色</el-button>
    </div>
    <TableangPage
      :TableData="tableData"
      :tableColums="tableColums"
      :total="total"
      :loading="loading"
      @sonhandleCurrentChange="sonhandleCurrentChange"
      @sonhandleSizeChange="sonhandleSizeChange"
    >
      <template #actions="slotname: any">
        <el-button type="primary" size="small" link @click="add(slotname.data)" v-authority="{ model: '角色', name: '修改' }">编辑</el-button>
        <el-button type="primary" size="small" link @click="del(slotname.data)" v-authority="{ model: '角色', name: '删除' }">删除</el-button>
      </template>
    </TableangPage>
    <!-- 添加/修改 -->
    <AddModifyRoles
      v-model="showDialog"
      :addEditData="addEditData"
      @fatherDate="fatherDate"
    ></AddModifyRoles>
  </div>
</template>


<script setup lang="ts">
import { RoleDelete, RoleList } from '@/assets/api/Role/rols'
import AddModifyRoles from '@/components/AddRoles/AddModifyRoles.vue'
import TableangPage from '@/components/TableangPage.vue'
import { confirmBox, errorMsg, succesMsg } from '@/untils/msg'
import { reactive, ref } from 'vue'
//表单数据条数和是否开启loading
let loading = ref<boolean>(true)
let tableData = ref([])
let total = ref(0)
const showDialog = ref(false)
const tableColums = reactive([
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '操作',
    slotname: 'actions',
    isslot: true
  }
])
let data = reactive({
  page: 1,
  psize: 10
})
const addEditData = ref({
  id: 0,
  name: ''
})
// 角色列表
const list = async () => {
  let res: any = await RoleList(data)
  if (res.errCode === 10000) {
    tableData.value = res.data.list
    total.value = res.data.counts
    loading.value = false
  }
}
list()
// 删除
const del = async (id: any) => {
  confirmBox('确定删除吗???', '你确定吗？', null)
    .then(async () => {
      // dataid.id = id.id
      let res: any = await RoleDelete(id)
      if (res.errCode === 10000) {
        succesMsg('删除成功')
      }
      list()
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
// 添加
const add = (data: any) => {
  if (data) {
    addEditData.value = data
  } else {
    addEditData.value.id = 0
  }
  showDialog.value = true
}
//刷新页面
const fatherDate = () => {
  showDialog.value = false
  list()
}
// 分页
const sonhandleSizeChange = (val: number) => {
  data.psize = val
  list()
  loading.value = true
}
const sonhandleCurrentChange = (val: number) => {
  data.page = val
  list()
  loading.value = true
}
</script>

<style scoped lang="less">
.role {
  .role-span {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
::v-deep .el-table__row {
  .el-table_1_column_1 {
    text-align: left !important;
  }
  .el-table_1_column_2 {
    text-align: right !important;
  }
  .el-tooltip {
    padding-right: 70px;
  }
}

::v-deep .el-table__header {
  .el-table_1_column_1 {
    text-align: left !important;
  }
  .el-table_1_column_2 {
    text-align: right !important;
    padding-right: 100px;
  }
}
// .el-tree-node.is-expanded {
//     display: block !important;
//     display: flex !important;
// }
</style>
