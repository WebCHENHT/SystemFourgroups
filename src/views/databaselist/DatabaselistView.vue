<template>
  <div class="database">
    <div class="database-span">
      <span>题库管理</span>
      <el-button type="primary" @click="Create" v-authority="{ model: '题库', name: '创建' }">创建题库</el-button>
    </div>
    <el-form :inline="true" :model="data" class="demo-form-inline">
      <el-form-item label="题库名称:">
        <el-input v-model="data.key" placeholder="请输入题库名称" clearable />
      </el-form-item>
      <el-form-item label="创建人:">
        <el-input v-model="data.admin" placeholder="请输入创建人" @input="inputs" clearable />
      </el-form-item>
      <el-form-item>
        <el-checkbox
          v-model="vuels"
          :true-label="1"
          :false-label="0"
          label="只看我创建的"
          size="large"
          @change="onlyMine"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query" v-authority="{ model: '题库', name: '查看' }">查询</el-button>
        <el-button type="danger" v-if="display" @click="delAll">批量删除</el-button>
        <el-button type="danger" v-if="conceal" @click="delAll" disabled>批量删除</el-button>
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
      <!-- 题库名称 -->
      <template #default="scoped">
        <el-button type="primary" link @click="paper(scoped.data)">{{
          scoped.data.title
        }}</el-button>
      </template>
      <!-- 时间 -->
      <template #addtime="scoped">
        {{ scoped.data.addtime.substring(0, 16) }}
      </template>
      <template #actions="slotname: any">
        <el-button type="primary" size="small" link @click="paper(slotname.data)" v-authority="{ model: '题库', name: '查看' }">试题</el-button>
        <el-button type="primary" size="small" link @click="edit(slotname.data)" v-authority="{ model: '题库', name: '修改' }">编辑</el-button>
        <el-button type="primary" size="small" link @click="del(slotname.data)" v-authority="{ model: '题库', name: '删除' }">删除</el-button>
      </template>
    </TableangPage>
    <!-- 添加、修改 -->
    <CreatetestQuestions ref="flag" @MybaseAdd="MybaseAdd"></CreatetestQuestions>
  </div>
</template>

<script setup lang="ts">
import {
  DatabaseAdd,
  DatabaseDelete,
  datalist,
  deleteall
} from '@/assets/api/databaselist/DatabaseList'
import CreatetestQuestions from '@/components/CreatetestQuestions.vue'
import TableangPage from '@/components/TableangPage.vue'
import { debounce } from '@/untils/antishake'
import { confirmBox, errorMsg, succesMsg } from '@/untils/msg'
import { nextTick, reactive, ref, toRaw, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
let router = useRouter()
let display = ref(false) //批量删除显示按钮
let conceal = ref(true) //批量删除隐藏按钮
let tableData = ref([])
let total = ref(0)
let ChangeData = ref([])
let flag = ref()
let data = reactive({
  page: 1,
  psize: 10,
  key: '',
  admin: '',
  ismy: 0
})
const tableColums = reactive([
  {
    slotname: 'default',
    isslot: true,
    label: '题库',
    prop: 'title'
  },
  {
    label: '题目数量',
    prop: 'counts'
  },
  {
    slotname: 'addtime',
    isslot: true,
    label: '创建时间'
  },
  {
    label: '创建人',
    prop: 'admin'
  },
  {
    label: '操作',
    slotname: 'actions',
    isslot: true
  }
])
// 题库名称 /试题
const paper = async (val: any) => {
  router.push({
    path: '/SystemMenu/databaselist/databasequestionlist',
    query: {
      id: val.id,
      title: val.title
    }
  })
}
// 搜索
let vuels = ref(false)
const inputs = (data: any) => {
  if (data.admin !== '') {
    vuels.value = false
  }
}
// //添加题库
const MybaseAdd = async (data: any) => {
  let res = await DatabaseAdd(data)
  console.log(res)
  if (res.errCode === 10000) {
    flag.value.dialogVisible = false
    if (flag.value.ruleForm.id !== 0) {
      ElMessage.success('修改成功')
    } else {
      ElMessage.success('添加成功')
    }
    lists()
  }
}
//打开题库弹框
const Create = () => {
  flag.value.dialogVisible = true
}

// 题库列表
const lists = async () => {
  let res: any = await datalist(data)
  // console.log(res)
  if (res.errCode === 10000) {
    tableData.value = res.data.list
    total.value = res.data.counts
  }
}
lists()
// 点击只看我的
const onlyMine = (val: any) => {
  if (val == 1) {
    data.admin = ''
    data.ismy = 1
  }
}

// 编辑题库
const edit = (val: any) => {
  console.log(val)

  flag.value.dialogVisible = true
  nextTick(() => {
    //延迟函数  回显
    flag.value.ruleForm.title = val.title
    flag.value.ruleForm.id = val.id
    flag.value.ruleForm.isshow = val.isshow
    // flag.value.ruleForm.limits = val.limits
  })
}
// 题库删除
const del = async (id: any) => {
  confirmBox('确定删除吗???', '你确定吗？', null)
    .then(async () => {
      // dataid.id = id.id
      let res: any = await DatabaseDelete(id)
      if (res.errCode === 10000) {
        succesMsg('删除成功')
      }
      lists()
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
let id: any = reactive([]) //定义多选数据
//多选获取id
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
      display.value = true
      conceal.value = false
    }
    if (toRaw(ChangeData.value).length == 0) {
      display.value = false
      conceal.value = true
    }
  }
)
// 题库批量删除
const delAll = () => {
  confirmBox('确定删除吗???', '你确定吗？', null)
    .then(async () => {
      let data: any = {
        ids: id
      }
      let res = await deleteall(data)
      if (res.errCode === 10000) {
        succesMsg('删除成功')
        // 调用列表
        lists()
      }
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
// 搜索
const query = debounce(() => {
  lists()
}, 500)
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

<style scoped lang="less">
.database {
  .database-span {
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .el-form-item {
    margin-left: -22px;
  }
  .el-input {
    width: 170px;
  }
  .el-form-item:first-child {
    margin-left: 0;
  }
}
</style>
