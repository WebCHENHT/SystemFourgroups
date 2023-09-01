<template>
  <div class="role">
    <div class="role-span">
      <span>角色管理</span>
      <el-button type="primary">添加角色</el-button>
    </div>
    <TableangPage
      :TableData="TableData"
      :tableColums="tableColums"
      :total="total"
      @sonhandleCurrentChange="sonhandleCurrentChange"
      @sonhandleSizeChange="sonhandleSizeChange"
    >
      <template #actions="slotname: any">
        <el-button type="primary" size="small" link>编辑</el-button>
        <el-button type="primary" size="small" link @click="del(slotname.data)">删除</el-button>
      </template>
    </TableangPage>
  </div>
</template>

<script setup lang="ts">
import { RoleDelete, RoleList } from '@/assets/api/Role'
import TableangPage from '@/components/TableangPage.vue'
import { confirmBox, errorMsg, succesMsg } from '@/untils/msg'
import { reactive, ref } from 'vue'
let TableData = ref([])
let total = ref(0)
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
  psize: 5
})
// 角色列表
const list = async () => {
  let res: any = await RoleList(data)
  console.log(res)
  if (res.errCode === 10000) {
    TableData.value = res.data.list
    total.value = res.data.counts
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
// 分页
const sonhandleSizeChange = (val: number) => {
  data.psize = val
  list()
}
const sonhandleCurrentChange = (val: number) => {
  data.page = val
  list()
}
</script>

<style scoped lang="less">
.role {
  .role-span {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
