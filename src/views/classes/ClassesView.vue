<template>
  <div>
    <h3>班级管理</h3>
    <!-- 顶部 -->
    <div style="display: flex; margin-top: 20px">
      <div>
        <el-form-item label="班级名称">
          <el-input v-model="params.key" placeholder="请输入关键字" />
        </el-form-item>
      </div>
      &nbsp;&nbsp;
      <el-form-item label="部门">
        <el-cascader :options="options" :props="props2" @change="handleChange" clearable />
      </el-form-item>
      &nbsp;&nbsp;&nbsp;
      <el-button type="primary" @click="cha" v-authority="{ model: '班级', name: '查看' }"
        >查询</el-button
      >
      <el-button
        type="primary"
        style="position: absolute; left: 90%"
        @click="reser"
        v-authority="{ model: '班级', name: '添加' }"
        >添加班级</el-button
      >
    </div>
    <!-- 批量删除 -->
    <div v-if="show">
      <el-button type="danger" @click="dels">批量删除</el-button>
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
        @allTableData="allTableData"
        :loading="loading"
      >
        <!-- 操作 -->
        <template #actions="scope">
          <el-button
            type="primary"
            link
            @click="reser(scope.data)"
            v-authority="{ model: '班级', name: '修改' }"
            >编辑</el-button
          >
          <el-button
            type="primary"
            link
            @click="classedle(scope.data)"
            v-authority="{ model: '班级', name: '删除' }"
            >删除</el-button
          >
        </template>
      </TableangPage>
    </div>
  </div>
  <ClassesIncrease v-if="user" v-model="user" :carr="daa.ar" :fal="father"></ClassesIncrease>
</template>

<script setup lang="ts">
import { RoleList } from '@/assets/api/DepartMent/department'
import { ClList, classesdelete, classesdeleteall } from '@/assets/api/classes/classe' //网络请求

import TableangPage from '@/components/TableangPage.vue' //封装表格
import { debounce } from '@/untils/antishake'
import { confirmBox, errorMsg, succesMsg } from '@/untils/msg' //提示
import ClassesIncrease from '@/views/classes/ClassesIncrease.vue'
import { reactive, ref, toRaw, toRefs, watch } from 'vue'
// 批量删除默认隐藏
const show = ref(false)
let ChangeData = ref([])
let loading = ref(true)
let tableColums = reactive([
  {
    label: '班级名称',
    prop: 'name'
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
//列表数据
interface Iparams {
  page: number //页码 默认是1
  psize: number //每页显示多少条 默认是2
  key: string //搜索关键字(名称)
  depid: number //部门id
}
// 约束类型
interface T {
  params: Iparams
}
// 所传的参数
const ruform = reactive<T>({
  params: {
    page: 1,
    psize: 10,
    depid: 0,
    key: ''
  }
})
const { params } = toRefs(ruform)
const TableData = ref([])
// 分页
let total = ref()
// 班级列表
let list = async () => {
  let res: any = await ClList(ruform.params)
  if (res.errCode === 10000) {
    TableData.value = res.data.list
    total.value = res.data.counts
    loading.value = false
  }
}
list()
// 分页逻辑
const handleSizeChange = (val: number) => {
  params.value.psize = val
  loading.value = true
  list()
}
const handleCurrentChange = (val: number) => {
  params.value.page = val
  loading.value = true
  list()
}
let id: any = reactive([]) //定义多选数据
// 多选框
const allTableData = (val: any) => {
  ChangeData.value = val
  const arr = val.map((item: { id: any }) => {
    return item.id
  })
  id = arr
}
// 点击复选框显示批量删除
watch(
  () => ChangeData.value,
  (newVal) => {
    if (newVal) {
      show.value = true
    }
    if (toRaw(ChangeData.value).length == 0) {
      show.value = false
    }
  }
)
// 批量删除
const dels = () => {
  confirmBox('确定删除吗???', '你确定吗？', null)
    .then(async () => {
      let data: any = {
        ids: id
      }
      let res = await classesdeleteall(data)
      if (res.errCode === 10000) {
        succesMsg('删除成功')
        // 调用列表
        list()
      }
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
// 删除
const classedle = (id: { id: any }) => {
  confirmBox('确定要删除吗?', '你确定吗？', null)
    .then(async () => {
      let data = {
        id: id.id
      }
      let res = await classesdelete(data)
      if (res.errCode === 10000) {
        succesMsg('删除成功？')
        list()
      }
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
// 添加班级
const user = ref()
const father = () => {
  user.value = false
  list()
}
const daa = reactive({
  ar: {
    name: '',
    ids: '',
    id: 0
  }
})
const reser = (row: any) => {
  daa.ar.name = row.name //名称
  daa.ar.ids = row.depid //部门id
  daa.ar.id = row.id
  user.value = true
}

// 级联框
const props2 = {
  value: 'id',
  label: 'name',
  children: 'children',
  // checkStrictly: true, //点击单选框选中改点击整行选中
  emitPath: false //只获取级联选择器中最后一项
}
// 获取部门id
const handleChange = (data: any) => {
  params.value.depid = data
}
let options = ref([])
// 部门列表
const deplist = async () => {
  let res: any = await RoleList({ page: 1, psize: 12 })
  options.value = res.data.list
}
deplist()
//查询
const cha = debounce(() => {
  list()
  loading.value = true
}, 500)
</script>

<style scoped lang="less">
@import url('../../assets//css//classes/classes.css');
</style>
