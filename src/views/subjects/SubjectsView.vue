<template>
  <div>
    <h3>试卷管理</h3>
    <div>
      <div style="display: flex; margin-top: 20px">
        <el-form-item label="关键字">
          <el-input placeholder="考试名称" />
        </el-form-item>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <el-form-item label="创建人">
          <el-input placeholder="创建人" />
        </el-form-item>
        &nbsp;&nbsp;
        <el-checkbox>只看我创建的</el-checkbox>
        &nbsp;&nbsp;
        <el-button type="primary">查询</el-button>
        <el-button type="primary" style="position: absolute; left: 93%; top: 10px" @click="cuan"
          >创建试卷</el-button
        >
      </div>
    </div>
    <!-- 列表 -->
    <div>
      <TableangPage
        :tableColums="tableColums"
        :TableData="TableData"
        :total="total"
        @sonhandleCurrentChange="handleCurrentChange"
        @sonhandleSizeChange="nhandleSizeChange"
      >
        <!-- 试卷名称 -->
        <template #default="scoped">
          <el-button type="primary" link @click="paper(scoped.data)">{{
            scoped.data.title
          }}</el-button>
        </template>
        <!-- 时间 -->
        <template #addtime="scoped">
          {{ scoped.data.addtime.substring(0, 16) }}
        </template>
        <!-- 操作 -->
        <template #defaults="scoped">
          <el-button type="primary" link>编辑</el-button>|
          <el-button type="primary" link @click="del(scoped.data)">删除</el-button>
        </template>
      </TableangPage>
    </div>
    <PaperView ref="getDogis"></PaperView>
  </div>
</template>

<script setup lang="ts">
import { subjectsdelete, subjectsget, subjectslist } from '@/assets/api/subjects/subjects'
import TableangPage from '@/components/TableangPage.vue'
import { confirmBox, errorMsg, succesMsg } from '@/untils/msg'
import PaperView from '@/views/subjects/PaperView.vue'
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
let router = useRouter()
// 试卷表格数据
let TableData = ref([])
let tableColums = reactive([
  {
    slotname: 'default',
    isslot: true,
    label: '试卷名称',
    prop: 'title'
  },
  {
    label: '题量',
    prop: 'counts'
  },
  {
    label: '单选',
    prop: 'blanks'
  },
  {
    label: '多选',
    prop: 'judges'
  },
  {
    label: '判断',
    prop: 'multiples'
  },
  {
    label: '填空',
    prop: 'qas'
  },
  {
    label: '问答',
    prop: 'singles'
  },
  {
    label: '总分',
    prop: 'scores'
  },
  {
    label: '创建人',
    prop: 'admin'
  },
  {
    slotname: 'addtime',
    isslot: true,
    label: '更新时间'
  },
  {
    slotname: 'defaults',
    isslot: true,
    label: '操作'
  }
])
// 条数
let total = ref()
//列表数据
interface Iparams {
  page: number //页码 默认是1
  psize: number //每页显示多少条 默认是2
  key: string //搜索关键字(名称)
  admin: string //创建人
  ismy: string //只看我的 >0
}
// 约束类型
interface T {
  params: Iparams
}
let data = reactive<T>({
  params: {
    page: 1,
    psize: 10,
    admin: '',
    ismy: '',
    key: ''
  }
})
const { params } = toRefs(data)
// 试卷列表
let list = async () => {
  let res: any = await subjectslist(params.value)
  if (res.errCode === 10000) {
    TableData.value = res.data.list
    total.value = res.data.counts
  }
}
list()
// 试卷名称
let getDogis = ref()
const paper = async (row: any) => {
  let res = await subjectsget({ id: row.id })
  if (res.errCode === 10000) {
    console.log(res.data)
    getDogis.value.dialogVisible = true
    getDogis.value.getDogisTest = res.data
  }
}
// 删除
let del = async (val: any) => {
  confirmBox('确定要删除吗?', '确定吗?', null)
    .then(async () => {
      let res = await subjectsdelete({ id: val.id })
      list()
      succesMsg('删除成功！')
      console.log(res)
    })
    .catch(() => {
      errorMsg('已取消')
    })
}
// 创建试卷
const cuan = () => {
  router.push({
    path: 'SystemMenu/subjects/SubjectsAdd'
  })
}
//  分页
const handleCurrentChange = (val: number) => {
  params.value.page = val
  list()
}
const nhandleSizeChange = (val: number) => {
  params.value.psize = val
  list()
}
</script>

<style scoped>
.el-input {
  width: 200px;
}
h3 {
  font-size: 20px;
}
</style>
