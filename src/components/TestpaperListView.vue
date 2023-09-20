<template>
  <el-dialog v-model="dialogVisible" title="试卷列表" width="80%">
    <div class="Parperlist">
      <el-form :model="DatabaseListObj">
        <el-form-item label="试卷名称">
          <el-input v-model="DatabaseListObj.key" placeholder="请输入试卷名称" />
        </el-form-item>
        <el-form-item label="创建人">
          <el-input v-model="DatabaseListObj.admin" placeholder="请输入试卷名称" @input="inputs" />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="vuels" label="只看我创建的" size="large" @change="duoxuans" />
        </el-form-item>
        <el-form-item> <el-button type="primary" @click="Csnds">查询</el-button></el-form-item>
      </el-form>
    </div>
    <div class="tab">
      <TableangPage
        :TableData="DatabaseVuels"
        :tableColums="tableColums"
        :loading="loading"
        :total="total"
        @sonhandleCurrentChange="sonhandleCurrentChange"
        @sonhandleSizeChange="sonhandleSizeChange"
      >
        <template #title="{ data }">
          <el-radio-group v-model="id">
            <el-radio :label="data.id">{{ data.title }}</el-radio>
          </el-radio-group>
        </template>
      </TableangPage>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="QuestionOk"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import TableangPage from '@/components/TableangPage.vue'
import { SubjectsList } from '@/assets/api/TestList'

let emit = defineEmits<{
  (name: 'MyTestpapers', value: any): any
}>()
let vuels = ref(false)
let loading = ref(true)
let total = ref(0)
let id = ref()
let DatabaseListObj = reactive({
  key: '',
  admin: '',
  ismy: 0,
  page: 1,
  psize: 10
})

let tableColums = ref([
  {
    label: '题库名称',
    slotname: 'title',
    isslot: true
  },
  {
    label: '题库数量',
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

let DatabaseVuels = ref([])
const Csnds = () => {
  loading.value = true
  DatabaseListDatas()
}
const sonhandleCurrentChange = (data: any) => {
  DatabaseListObj.page = data
  loading.value = true
  DatabaseListDatas()
}
const sonhandleSizeChange = (data: any) => {
  DatabaseListObj.psize = data
  loading.value = true
  DatabaseListDatas()
}
const inputs = (data: any) => {
  if (DatabaseListObj.admin !== '') {
    vuels.value = false
    DatabaseListObj.ismy = 0
  }
}
const duoxuans = (data: any) => {
  if (data === true) {
    DatabaseListObj.ismy = 1
    DatabaseListObj.admin = ''
  } else {
    DatabaseListObj.ismy = 0
  }
}
const QuestionOk = () => {
  if (id.value !== undefined) {
    dialogVisible.value = false
    emit('MyTestpapers', id.value)
    id.value = undefined
  }
}
const DatabaseListDatas = async () => {
  let res: any = await SubjectsList(DatabaseListObj)
  if (res.errCode === 10000) {
    total.value = res.data.counts
    loading.value = false
    DatabaseVuels.value = res.data.list
  }
}
DatabaseListDatas()
const dialogVisible = ref(false)
defineExpose({ dialogVisible })
</script>

<style lang="less" scoped>
.tab {
  margin-top: 5px;
  height: 50vh;
  overflow-y: auto;
}
.Parperlist {
  height: 100%;
}
.el-form {
  margin-top: -15px;
  display: flex;
  align-items: center;
  .el-form-item {
    margin-right: 15px;
  }
}
/deep/.el-form-item__label {
  display: inline-flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex: 0 0 auto;
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
  height: 32px;
  line-height: 32px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
}
.el-radio {
  width: 130px;
}
</style>
