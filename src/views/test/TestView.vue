<template>
  <div style="display: flex; justify-content: space-between">
    <div style="font-size: 20px">考试管理</div>
    <el-button type="primary" @click="Addexam" v-authority="{ model: '考试', name: '添加' }"
      >创建考试</el-button
    >
  </div>
  <el-row :gutter="24">
    <el-col :span="3">
      <div class="grid-content ep-bg-purple" />
      <el-form-item label="关键字">
        <el-input v-model="TestData.key" placeholder="请输入关键字" clearable />
      </el-form-item>
    </el-col>
    <el-col :span="3">
      <div class="grid-content ep-bg-purple" />
      <el-form-item label="创建人">
        <el-input
          v-model="TestData.admin"
          placeholder="请输入创建人"
          @input="AdminInput"
          clearable
        />
      </el-form-item>
    </el-col>
    <el-col :span="18" style="padding-right: 5px; padding-left: 5px">
      <div class="grid-content ep-bg-purple" />
      <el-form-item>
        <el-checkbox v-model="created" label="我创建的" @change="isxuanze" />
      </el-form-item>

      <el-form-item label="开放时间" style="margin-left: 15px">
        <el-radio-group v-model="Openinghours" @change="radiotest">
          <el-radio label="永久开放" style="margin-right: 10px" />
          <el-radio label="部分时段" style="margin-right: 0px" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="部分时段" style="margin-left: 15px; width: 300px">
        <el-date-picker
          v-model="Partialtime"
          @change="tiems"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :disabled="Openinghours === '永久开放' ? true : false"
          :shortcuts="shortcuts"
          :size="size"
        />
      </el-form-item>
      <el-form-item label="状态" style="margin-left: 15px">
        <el-select v-model="TestData.state" placeholder="请选择" @change="TestState">
          <el-option label="所有" value="0" />
          <el-option label="已发布" value="1" />
          <el-option label="未发布" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="TestcharAt"
          v-authority="{ model: '考试', name: '查看' }"
          >查询</el-button
        >
      </el-form-item>
    </el-col>
  </el-row>
  <div style="margin-left: 20px; margin-bottom: 20px" v-if="Deletealls.ids != ''">
    <el-button type="danger" @click="Cancelpublication('批量删除')">批量删除</el-button>
    <el-button type="primary" @click="Cancelpublication('发布考试')">发布考试</el-button>
    <el-button type="success" @click="Cancelpublication('取消发布')">取消发布</el-button>
  </div>
  <TableangPage
    :TableData="TestDatas"
    :tableColums="tableColums"
    @allTableData="allTableData"
    @sonhandleSizeChange="sonhandleSizeChange"
    @sonhandleCurrentChange="sonhandleCurrentChange"
    :loading="loading"
    :total="total"
    :isselect="true"
  >
    <template #title="{ data }">
      <div style="color: #409eff; padding-bottom: 3px; cursor: pointer" @click="GetTestAt(data)">
        {{ data.title }}
      </div>
    </template>
    <template #state="{ data }">
      <div v-if="data.state === 1" style="color: #409eff; padding-bottom: 3px; cursor: pointer">
        已通过
      </div>
      <div
        v-else
        style="color: #f56c6c; padding-bottom: 3px; cursor: pointer"
        text
        @click="open(data)"
      >
        未发布
      </div>
    </template>
    <template #time="{ data }">
      <div>
        {{
          data.begintime == null && data.endtime == null
            ? '不限'
            : `${data.begintime}至${data.endtime}`
        }}
      </div>
    </template>
    <template #caozuo="{ data }">
      <div class="caozuox">
        <div class="caozuobutton">
          <el-button type="primary" link @click="student('学生考试列表', true, data)"
            >学生</el-button
          >
          <el-button type="primary" link @click="student('可见老师', false, data)">可见</el-button>
          <el-button
            type="primary"
            link
            @click="student('阅卷老师', false, data)"
            style="border-right: none"
            >阅卷老师</el-button
          >
        </div>
        <div class="caozuobutton" style="margin-top: 15px">
          <el-button type="primary" link @click="Examanalysis(data)">分析</el-button>
          <el-button
            type="primary"
            link
            @click="bianjis(data, data.studentcounts)"
            v-authority="{ model: '考试', name: '修改' }"
            >编辑</el-button
          >
          <el-button
            type="danger"
            link
            style="border-right: none"
            @click="delTest(data.id)"
            v-authority="{ model: '考试', name: '删除' }"
            >删除</el-button
          >
        </div>
      </div>
    </template>
  </TableangPage>
  <SystemTransferVue
    v-if="TrabsList"
    ref="dialog"
    :names="dialogname"
    :ishow="ishow"
    :testid="testid"
    @DelSystemTransfer="DelSystemTransfer"
    @MyClose="MyClose"
  ></SystemTransferVue>
  <TestDogis v-if="getDogisashiw" ref="getDogis" @MyTestDigclose="MyTestDigclose"></TestDogis>
</template>

<script setup name="/test" lang="ts">
import { ref, nextTick } from 'vue'
import type { TestDatatype } from '@/assets/TSinterface/SystemTest'
import {
  TestLists,
  TestUpdateState,
  TestGet,
  TestUpdateStates,
  TestDeleteall,
  TestDelete
} from '@/assets/api/TestList/index'
import dayjs from 'dayjs'
import TableangPage from '@/components/TableangPage.vue'
const size = ref<'default' | 'large' | 'small'>('default')
import { debounce } from '@/untils/antishake'
import { ElMessage, ElMessageBox } from 'element-plus'
import SystemTransferVue from '@/components/SystemTransfer.vue'
import { useRouter } from 'vue-router'
import TestDogis from '@/components/TestDogis.vue'
//路由跳转
let router = useRouter()
//控制穿梭框显示隐藏和名称
let dialog = ref()
let dialogname = ref('')
let TrabsList = ref(false)
//控制子组件班级选中框
let ishow = ref(true)
//考试列表表格数据
let TestDatas: any = ref([])
//考试列表查询对象
let TestData: TestDatatype = ref<any>({
  page: 1,
  psize: 10,
  key: '',
  admin: '',
  ismy: '',
  opentime: '0',
  begindate: '',
  enddate: '',
  state: ''
})
let created = ref<string>('')
let Partialtime = ref<string>('')
let Openinghours = ref<string>('永久开放')
const TestcharAt = debounce(() => {
  loading.value = true
  TestListdata()
}, 500)
//删除单个
const delTest = async (id: any) => {
  let res = await TestDelete({
    id: id
  })
  if (res.errCode === 10000) {
    ElMessage.success('删除成功')
    loading.value = true
    TestListdata()
  }
}
//创建考试
const Addexam = () => {
  router.push({
    path: '/SystemMenu/test/TestAdd'
  })
}
//编辑题库
const bianjis = async (data: any, num: string | number) => {
  if (num === 0) {
    router.push({
      path: '/SystemMenu/test/TestAdd',
      query: {
        id: data.id
      }
    })
  } else {
    ElMessage.warning('本场考试已有学生参加，不可编辑')
  }
}
//取消发布
const Cancelpublication = async (name: string) => {
  ElMessageBox.confirm('此操作将修改选中的考试状态, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      if (name === '批量删除') {
        let res = await TestDeleteall({
          ids: Deletealls.value.ids
        })
        if (res.errCode === 10000) {
          ElMessage.success('删除成功')
        }
      } else {
        let res = await TestUpdateStates({
          ids: Deletealls.value.ids,
          state: name === '发布考试' ? 1 : 2
        })
        if (res.errCode === 10000) {
          if (name !== '发布考试') {
            ElMessage.success('取消成功')
          } else {
            ElMessage.success('发布成功')
          }
        }
      }
      Deletealls.value.ids = []
      loading.value = true
      TestListdata()
    })
    .catch((error) => {
    })
}

//多选
let Deletealls: any = ref({
  ids: []
})
const allTableData = (data: any[]) => {
  let arr: any = []
  data.forEach((item: any) => {
    arr.push(item.id)
  })
  Deletealls.value.ids = [...new Set(arr)]
}
//表单数据
const tableColums = ref([
  {
    label: '考试名称',
    isslot: true,
    slotname: 'title'
  },
  {
    label: '状态',
    isslot: true,
    slotname: 'state'
  },
  {
    label: '总分',
    prop: 'scores'
  },
  {
    label: '通过分数',
    prop: 'pastscores'
  },
  {
    label: '考试人数',
    prop: 'studentcounts'
  },
  {
    label: '通过人数',
    prop: 'passCounts'
  },
  {
    label: '开放时间',
    isslot: true,
    slotname: 'time'
  },
  {
    label: '管理员',
    prop: 'admin'
  },
  {
    label: '操作',
    isslot: true,
    slotname: 'caozuo',

    width: '148px'
  }
])
//关闭操作
const DelSystemTransfer = () => {
  Testdatast.value = []
}
//点击考试名称
//获取弹出框的数据
let getDogis = ref()
let getDogisashiw = ref(false)
const GetTestAt = async (data: any) => {
  getDogisashiw.value = true
  nextTick(async () => {
    let res = await TestGet({
      id: data.id
    })
    if (res.errCode === 10000) {
      getDogis.value.testid = data.id
      getDogis.value.dialogVisible = true
      getDogis.value.getDogisTest = res.data
    }
  })
}
//关闭学生考试分数弹框
const MyTestDigclose = () => {
  getDogisashiw.value = false
}
//学生
//请求成功传给穿梭框的选泽框
let Testdatast: any = ref([])
let testid = ref(0)
const student = debounce(async (name: string, ishows: boolean, data: any) => {
  TrabsList.value = true
  nextTick(() => {
    testid.value = data.id
    ishow.value = ishows
    dialogname.value = name
    dialog.value.dialogVisible = true
  })
}, 300)
//关闭穿梭框页面
const MyClose = () => {
  TrabsList.value = true
}
//表单数据条数和是否开启loading
let loading = ref<boolean>(true)
let total = ref(0)
//分页
//页
const sonhandleCurrentChange = (data: number) => {
  TestData.value.page = data
  loading.value = true
  TestListdata()
}
//条
const sonhandleSizeChange = (data: number) => {
  TestData.value.psize = data
  loading.value = true
  TestListdata()
}
//状态选中
const TestState = (data: any) => {
  TestData.value.state = data
  loading.value = true
  TestListdata()
}
//考试分析
const Examanalysis = (data: any) => {
  if (data.studentcounts === 0) {
    ElMessage.error('没有学生考试')
    return
  }
  if (data.incomplete === 0) {
    router.push({
      path: '/SystemMenu/test/Analyse',
      query: {
        id: data.id
      }
    })
  } else {
    ElMessage.error('该试卷未判完')
  }
}
//未通过选中时
const open = (data: any) => {
  ElMessageBox.confirm('此操作将修改选中的考试状态, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    let arr = {
      state: 1,
      ids: []
    }
    arr.ids = [data.id] as any
    let res = await TestUpdateState({
      state: arr.state,
      ids: arr.ids
    })
    if (res.errCode === 10000) {
      loading.value = true
      ElMessage({
        type: 'success',
        message: '修改成功'
      })
      TestListdata()
    }
  })
}

//开放时间选则
const radiotest = (data: any) => {
  if (data === '永久开放') {
    TestData.value.opentime = '0'
  } else {
    TestData.value.opentime = '1'
  }
}
//获取考试列表管理
const TestListdata = async () => {
  let res = await TestLists(TestData.value)

  if (res.errCode === 10000) {
    TestDatas.value = res.data.list
    total.value = res.data.counts
    loading.value = false
  }
}
TestListdata()
//开始时间和结束时间处理
const tiems = (data: any) => {
  TestData.value.begindate = dayjs(data[0]).format('YYYY-MM-DD')
  TestData.value.enddate = dayjs(data[1]).format('YYYY-MM-DD')
}
//判断多选框是否选中做操作
const isxuanze = (data: any) => {
  if (data === true) {
    TestData.value.ismy = '0'
    TestData.value.admin = ''
  } else {
    TestData.value.ismy = ''
  }
}
//判断input框是否输入值做操作
const AdminInput = (data: any) => {
  if (data !== '') {
    created.value = ''
    TestData.value.ismy = ''
  }
}
//element选中之后时间显示
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
      return [end, start]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      return [end, start]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
      return [end, start]
    }
  }
]
</script>
<style lang="less" scoped>
.el-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  margin-top: 15px;
  border-radius: 4px;
  display: flex;
  align-items: center;

  .el-select {
    width: 100px;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.caozuox {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  .caozuobutton {
    display: flex;
    .el-button {
      padding-right: 4px;
      height: 15px;
      border-right: 1px solid #000;
      margin-left: 0;
      border-radius: 0px;
    }
  }
}
</style>
