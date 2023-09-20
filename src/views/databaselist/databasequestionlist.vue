<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-page-header :icon="ArrowLeft" @back="back">
      <template #content>
        <span class="text-large font-600 mr-3"> 《{{ title }}》试题列表 </span>
      </template>
      <template #extra>
        <div class="flex items-center">
          <el-button @click="addTest">添加试题</el-button>
          <el-button type="primary" class="ml-2" @click="isShowAdd=true">批量添加试题</el-button>
        </div>
      </template>
    </el-page-header>
    <el-form :inline="true" :model="data" class="demo-form-inline">
      <el-form-item label="题库名称：">
        <el-input v-model="key" placeholder="请输入题库名称" />
      </el-form-item>
      <el-form-item label="创建人：">
        <el-input v-model="admin" placeholder="请输入创建人" />
      </el-form-item>
      <el-form-item label="题目类型：">
        <el-select style="width: 160px" v-model="type" placeholder="请选择">
          <el-option v-for="(item, index) in types" :key="index" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="danger" v-if="display" @click="delAll">批量删除</el-button>
        <el-button type="danger" v-if="conceal" disabled @click="delAll">批量删除</el-button>
        <el-button @click="excel">导出excel</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <TableangPage
      :TableData="tableData"
      :tableColums="tableColums"
      :total="total"
      :loading = "loading"
      :isselect="true"
      @allTableData="allTableData"
      @sonhandleCurrentChange="sonhandleCurrentChange"
      @sonhandleSizeChange="sonhandleSizeChange"
    >
    <!-- 试卷名称 -->
        <template #default="scoped:any">
          <el-button type="primary" link @click="testDetail(scoped.data)" >
          <div v-html="scoped.data.title"></div>
          </el-button>
        </template>
        <!-- 时间 -->
        <template #addtime="scopeds">
          {{ scopeds.data.addtime.substring(0, 16) }}
        </template>
        <template #actions="slotname:any">
        <el-button type="primary" size="small" link @click="compile(slotname.data)">编辑</el-button>
        <el-button type="primary" size="small" link @click="del(slotname.data.id)">删除</el-button>
      </template>
    </TableangPage>

    <!-- 单条试题详情的抽屉 -->
    <DatabaseDetail v-if="isDatabaseDetail" :getEestDetail="getEestDetail" @closeDrawer="closeDrawer"></DatabaseDetail>
    <!-- 添加试题的抽屉 -->
  <AddtestDrawer
    v-if="isAddtestDrawer"
    :getList="lists"
    :questionData="questionData"
    @closeDrawer="closeDrawer"
  />
   <!-- 批量上传试题 -->
  <AlladdQuestion
    @closeDialog="closeDialog"
    :addUrl="addTestUrl"
    :getList="lists"
    v-if="isShowAdd"
  />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { reactive, ref, toRaw, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {DatabaseDeleteall, DatabaseList , Databasedel, exportExcel} from '@/assets/api/databaselist/DatabaseList'
import DatabaseDetail from '@/components/Databaselist/DatabaseDetail.vue'
import AddtestDrawer from '@/components/Databaselist/AddtestDrawer.vue'
import { debounce } from '@/untils/antishake'
import AlladdQuestion from '@/components/Databaselist/AlladdQuestion.vue'
import { confirmBox, errorMsg, succesMsg } from '@/untils/msg'
import { Downblob } from '@/untils/down';
let display = ref(false) //批量删除显示按钮
let conceal = ref(true) //批量删除隐藏按钮
let tableData = ref([])
let route = useRoute()
let ChangeData = ref([])
let total = ref(0)
const router = useRouter()
//表单数据条数和是否开启loading
let loading = ref<boolean>(true)
let red = route.query.id
let title = route.query.title
const addTestUrl = ref('http://estate.eshareedu.cn/exam/upload/question.xlsx');
// 返回上一级
const back = () => {
  router.push('/SystemMenu/databaselist')
}
const data: any = reactive({
  databaseid: route.query.id, //题库id
  page: 1,
  psize: 10,
  key: '', //搜索关键字(名称)
  tags: '', //标签
  type: '', //类型
  admin: '' //创建人
})
const { key, type, admin } = toRefs(data)
const types: any = ref(['单选题', '多选题', '判断题', '填空题', '问答题'])
const tableColums = reactive([
  {
    slotname: 'default',
    isslot: true,
    label: '题目名称',
    prop: 'title'
  },
  {
    label: '题量类型',
    prop: 'type'
  },
  {
    slotname: 'addtime',
    isslot: true,
    label: '创建时间',
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
const Data=reactive({
  questionData:{}
})
const { questionData } = toRefs(Data)
// 添加试题
const addTest = () => {
  isAddtestDrawer.value = true;
};
const compile = (data: any) => {
  console.log('编辑',data);
  questionData.value = data
  isAddtestDrawer.value = true
}
// 列表
const lists = async() => {
  let res:any = await DatabaseList(data)
  console.log(res);
  if (res.errCode === 10000) {
    tableData.value = res.data.list
    total.value = res.data.counts
    loading.value = false
  }
}
lists()
const state: any = reactive({
  getEestDetail:{}
});
const { getEestDetail } = toRefs(state);
const isDatabaseDetail = ref(false);
const isAddtestDrawer = ref(false)
const isShowAdd = ref(false); //批量添加
// 接受子组件传过来的值  关闭弹窗
const closeDialog = (val: any) => {
  isShowAdd.value = val;
};
// 接收从子组件传过来的值  关闭抽屉
const closeDrawer = (val: any) => {
  questionData.value = {}
  isAddtestDrawer.value = val;
  isDatabaseDetail.value = val
};
// 试题单条数据详情
const testDetail = (val:any) => {
  console.log(val);
  isDatabaseDetail.value = true
  state.getEestDetail=val
}
// 导出excel
let excel = async() => {
  let res = await exportExcel(red).catch(() => {});
  Downblob(res, title + '.xlsx');
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
// 试题批量删除
const delAll = () => {
  confirmBox('确定删除吗???', '你确定吗？', null)
    .then(async () => {
      let data: any = {
        ids: id
      }
      let res = await DatabaseDeleteall(data)
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
// 试题删除
const del = async (id: any) => {
  confirmBox('确定删除吗???', '你确定吗？', null)
    .then(async () => {
      let pwd: any = {
        id: id
      }
      let res = await Databasedel(pwd)
      if (res.errCode === 10000) {
        succesMsg('删除成功')
      }
      lists()
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
// 分页
const sonhandleSizeChange = (val: number) => {
  data.psize = val
  lists()
  loading.value = true
}
const sonhandleCurrentChange = (val: number) => {
  data.page = val
  lists()
  loading.value = true
}
// 搜索
const query = debounce(() => {
  lists()
}, 500)
</script>

<style scoped lang="less">
.el-form {
  margin: 20px 0;
}
</style>
