<template>
  <div>
    <h3>试卷管理</h3>
    <div>
      <div style="display: flex; margin-top: 20px">
        <el-form-item label="关键字">
          <el-input placeholder="考试名称" v-model="params.key" />
        </el-form-item>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <el-form-item label="创建人">
          <el-input placeholder="创建人" v-model="params.admin" @input="inputs" />
        </el-form-item>
        &nbsp;&nbsp;
        <el-checkbox @change="duoxuans" v-model="vuels">只看我创建的</el-checkbox>
        &nbsp;&nbsp;
        <el-button type="primary" @click="Csnds" v-authority="{ model: '试卷', name: '查看' }"
          >查询</el-button
        >
        <el-button
          type="primary"
          style="position: absolute; left: 93%; top: 10px"
          @click="cuan"
          v-authority="{ model: '试卷', name: '创建' }"
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
        :loading="loading"
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
          <el-button
            type="primary"
            link
            @click="edit(scoped.data)"
            v-authority="{ model: '试卷', name: '修改' }"
            >编辑</el-button
          >|
          <el-button
            type="primary"
            link
            @click="del(scoped.data)"
            v-authority="{ model: '试卷', name: '删除' }"
            >删除</el-button
          >
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
let loading = ref(true)
let data = reactive<any>({
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
    loading.value = false
  }
}
list()
// 试卷名称
let getDogis = ref()
const paper = async (row: any) => {
  let res: any = await subjectsget({ id: row.id })
  if (res.errCode === 10000) {
    getDogis.value.id = row.id
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
// 编辑试卷
const edit = (row: any) => {
  console.log(row)

  router.push({
    path: 'SystemMenu/subjects/SubjectsAdd',
    query: {
      id: row.id
    }
  })
}
//  分页
const handleCurrentChange = (val: number) => {
  params.value.page = val
  loading.value = true
  list()
}
const nhandleSizeChange = (val: number) => {
  params.value.psize = val
  loading.value = true
  list()
}
// 搜索
let vuels = ref(false)
const inputs = (data: any) => {
  if (params.value.admin !== '') {
    vuels.value = false
    params.value.ismy = 0
  }
}
const duoxuans = (data: any) => {
  if (data === true) {
    params.value.ismy = 1
    params.value.admin = ''
  } else {
    params.value.ismy = 0
  }
}
const Csnds = () => {
  loading.value = true
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
