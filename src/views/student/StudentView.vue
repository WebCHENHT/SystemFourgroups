<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <h3>学员管理</h3>
      <div>
        <el-button @click="batch">批量添加</el-button>
        <el-button type="primary" @click="add" v-authority="{ model: '学员', name: '添加' }"
          >添加学生</el-button
        >
      </div>
    </div>

    <el-form style="display: flex; margin-top: 20px">
      <el-form-item label="学员名称">
        <el-input v-model="params.key" placeholder="请输入关键字" />
      </el-form-item>

      <el-form-item label="部门">
        <el-cascader :options="options" :props="props2" @change="handleChange" clearable />
      </el-form-item>

      <el-form-item label="班级">
        <el-select v-model="params.classid" placeholder="请选择">
          <el-option v-for="(item, index) in arr" :key="index" :label="item.name" :value="index" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="cha" v-authority="{ model: '学员', name: '查看' }"
          >查询</el-button
        >
      </el-form-item>

      <el-form-item v-if="show">
        <el-button type="danger" disabled>批量删除</el-button>
      </el-form-item>

      <el-form-item v-if="shows">
        <el-button type="danger" @click="dels">批量删除</el-button>
      </el-form-item>
    </el-form>

    <div>
      <!-- 列表 -->
      <TableangPage
        :tableColums="tableColums"
        :TableData="TableData"
        :isselect="true"
        :total="total"
        @allTableData="allTableData"
        @sonhandleSizeChange="handleSizeChange"
        @sonhandleCurrentChange="handleCurrentChange"
        :loading="loading"
      >
        <!-- 操作 -->
        <template #default="scoped">
          <el-button type="primary" link @click="resetting(scoped.data)">重置密码</el-button>
          <el-button
            type="primary"
            link
            @click="edit(scoped.data)"
            v-authority="{ model: '学员', name: '修改' }"
            >编辑</el-button
          >
          <el-button
            type="primary"
            link
            @click="del(scoped.data)"
            v-authority="{ model: '学员', name: '删除' }"
            >删除</el-button
          >
        </template>
      </TableangPage>
    </div>
    <!-- 添加 -->
    <StudenAdd
      v-if="user"
      v-model="user"
      :falv="fal"
      :carr="carr"
      :getListDialog="studenlist"
    ></StudenAdd>
    <!-- 密码 -->
    <StudenPassword v-if="users" v-model="users" :call="call" :fal="father"></StudenPassword>
    <!-- 批量添加 -->
    <StudentBatch
      v-if="sersr"
      v-model="sersr"
      :call="fathers"
      @allTableDatas="allTableDatas"
      :rado="sex"
      :title="title"
    ></StudentBatch>
  </div>
</template>

<script setup lang="ts">
import { RoleList } from '@/assets/api/DepartMent/department'
import { ClList } from '@/assets/api/classes/classe'
import { studentdelete, studentdeletes, studentlist } from '@/assets/api/studen/studen'
import TableangPage from '@/components/TableangPage.vue'
import { debounce } from '@/untils/antishake'
import { confirmBox, errorMsg, succesMsg } from '@/untils/msg'
import StudenAdd from '@/views/student/StudenAdd.vue'
import StudenPassword from '@/views/student/StudenPassword.vue'
import StudentBatch from '@/views/student/StudentBatch.vue'

import { reactive, ref, toRaw, toRefs, watch } from 'vue'
let sex = 'http://apis.90000p.com/exam2212/api/student/upload'
let title: any = ref('“学生信息模板”')
// 批量删除默认隐藏
const show = ref(true)
const shows = ref(false)
let loading = ref(true)
let sersr = ref(false)
let ChangeData = ref([])
let user = ref()
let users = ref()
//列表数据
interface Iparams {
  page: number //页码 默认是1
  psize: number //每页显示多少条 默认是2
  key: string //搜索关键字(名称)
  depid: number //部门id
  classid: string //班级id
}
// 约束类型
interface T {
  params: Iparams
}
let data = reactive<T>({
  params: {
    page: 1,
    psize: 10,
    depid: 0,
    classid: '',
    key: ''
  }
})
const { params } = toRefs(data)
// 级联框
const props2 = {
  value: 'id',
  label: 'name',
  children: 'children',
  // checkStrictly: true, //点击单选框选中改点击整行选中
  emitPath: false //只获取级联选择器中最后一项
}
// 获取部门id
const handleChange = async (data: any) => {
  params.value.depid = data
  // 班级列表
  let res: any = await ClList({
    page: 1,
    psize: 0,
    depid: data,
    key: ''
  })

  arr.value = res.data.list
}
let options = ref([])
// 部门列表
const deplist = async () => {
  let res: any = await RoleList({ page: 1, psize: 12 })
  options.value = res.data.list
}
deplist()
let arr: any = ref([])
// 班级列表
let tableColums = reactive([
  {
    label: '学生姓名',
    prop: 'name'
  },
  {
    label: '备注',
    prop: 'remarks'
  },
  {
    label: '所属部门',
    prop: 'depname'
  },
  {
    label: '所在班级',
    prop: 'classname'
  },
  {
    label: '账号',
    prop: 'username'
  },
  {
    label: '添加时间',
    prop: 'addtime'
  },
  {
    label: '操作',
    isslot: true,
    slotname: 'default'
  }
])
let id: any = reactive([]) //定义多选数据
// 多选
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
      show.value = false
      shows.value = true
    }
    if (toRaw(ChangeData.value).length == 0) {
      show.value = true
      shows.value = false
    }
  }
)
let TableData = ref([])
let total = ref()
// 学员列表
let studenlist = async () => {
  let res: any = await studentlist(params.value)
  if (res.errCode === 10000) {
    loading.value = false
    TableData.value = res.data.list
    total.value = res.data.counts
  }
}
studenlist()
const allTableDatas = (val: any) => {
  console.log(val)
}
// 分页
const handleCurrentChange = (val: number) => {
  loading.value = true
  params.value.page = val
  studenlist()
}
const handleSizeChange = (val: number) => {
  loading.value = true
  params.value.psize = val
  studenlist()
}
// 删除
const del = async (id: any) => {
  confirmBox('确定要删除吗?', '你确定吗？', null)
    .then(async () => {
      let res = await studentdelete({ id: id.id })
      if (res.errCode === 10000) {
        succesMsg('删除成功？')
        studenlist()
      }
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
// 批量删除
const dels = () => {
  confirmBox('确认要删除吗？', '确定吗?', null)
    .then(async () => {
      let data: any = {
        ids: id
      }
      console.log(data)

      let res = await studentdeletes(data)
      if (res.errCode === 10000) {
        succesMsg('删除成功')
        // 调用列表
        studenlist()
      }
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
// 查询
const cha = debounce(() => {
  studenlist()
  loading.value = true
}, 500)

// 点击添加
const add = () => {
  carr = {}
  user.value = true
}
const fal = () => {
  user.value = false
}
const father = () => {
  users.value = false
  studenlist()
}
// 重置密码
let call = reactive({})
const resetting = (val: any) => {
  call = val
  users.value = true
}
// 编辑
let carr = reactive({})
const edit = (val: any) => {
  console.log(val)

  carr = val
  user.value = true
}
// 批量添加
const batch = () => {
  sersr.value = true
}
const fathers = () => {
  sersr.value = false
  studenlist()
}
</script>

<style scoped>
.el-input {
  width: 200px;
}
h3 {
  font-size: 20px;
}
.el-form-item {
  margin-left: 10px;
}
</style>
