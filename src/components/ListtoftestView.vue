<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="ListtoftestObj.title === undefined ? '' : ListtoftestObj.title + ' ' + '试卷列表'"
      width="80%"
    >
      <TestquestiondetailsView ref="Testquest"></TestquestiondetailsView>
      <div class="Parperlist">
        <el-form :model="DatabasequestObj">
          <el-form-item label="题库名称">
            <el-input v-model="DatabasequestObj.key" placeholder="请输入试卷名称" />
          </el-form-item>
          <el-form-item label="题目类型">
            <el-select v-model="DatabasequestObj.type" class="m-2" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item> <el-button type="primary" @click="Csnds">查询</el-button></el-form-item>
        </el-form>
      </div>
      <div class="tab">
        <TableangPage
          :isselect="true"
          :TableData="Listtoftestlists"
          :tableColums="tableColums"
          :loading="loading"
          :total="total"
          @sonhandleCurrentChange="sonhandleCurrentChange"
          @sonhandleSizeChange="sonhandleSizeChange"
          @allTableData="allTableData"
        >
          <template #title="{ data }">
            <div class="nasnd" v-html="data.title" @click="ListftesOk(data)"></div>
          </template>
        </TableangPage>
      </div>
      <template #footer>
        <div class="butttonlog">
          <div>已选{{ Listtoftestlists.length }}道题</div>
          <div>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="Oktijiaos"> 确定 </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { DatabasequestionList } from '@/assets/api/TestList'
import TestquestiondetailsView from './TestquestiondetailsView.vue'

let loading = ref(true)
let Testquest = ref()
let total = ref(0)
let emits = defineEmits<{
  (name: 'Mytijiaos', value: any): void
}>()
let tableColums = ref([
  {
    label: '题目',
    slotname: 'title',
    isslot: true
  },
  {
    label: '题目类型',
    prop: 'type'
  },
  {
    label: '分数',
    prop: 'scores'
  }
])
const options = [
  {
    value: '单选题',
    label: '单选题'
  },
  {
    value: '多选题',
    label: '多选题'
  },
  {
    value: '问答题',
    label: '问答题'
  },
  {
    value: '判断题',
    label: '判断题'
  },
  {
    value: '填空值',
    label: '填空值'
  }
]
const Csnds = () => {
  loading.value = true
  dataquesDatas()
}
const ListftesOk = (data: any) => {
  console.log(data)
  Testquest.value.Optionstyles = data
  Testquest.value.drawer = true
}
let DatabasequestObj = reactive({
  databaseid: 0,
  page: 1,
  psize: 10,
  key: '',
  type: ''
})
//提交
let tixindataLists = ref([])

const Oktijiaos = () => {
  if (tixindataLists.value.length >= 1) {
    dialogVisible.value = false

    emits('Mytijiaos', tixindataLists.value)
    tixindataLists.value = []
  }
}
//多选
const allTableData = (data: any) => {
  tixindataLists.value = data
  console.log(data)
}

let Listtoftestlists = ref([])
let ListtoftestObj: any = ref({})
const dataquesDatas = async () => {
  if (DatabasequestObj.databaseid !== 0) {
    let res: any = await DatabasequestionList(DatabasequestObj)
    if (res.errCode === 10000) {
      ListtoftestObj.value = res.data.database

      let Arrs = res.data.list.filter((item: any) => {
        return !String(item.answer).split('').includes(',')
      })
      console.log(Arrs)

      Listtoftestlists.value = Arrs
      loading.value = false
      total.value = res.data.counts
    }
  }
}

const sonhandleCurrentChange = (data: any) => {
  DatabasequestObj.page = data
  loading.value = true
  dataquesDatas()
}
const sonhandleSizeChange = (data: any) => {
  DatabasequestObj.psize = data
  loading.value = true
  dataquesDatas()
}
const dialogVisible = ref(false)

defineExpose({ dialogVisible, dataquesDatas, DatabasequestObj })
</script>

<style lang="less" scoped>
.nasnd {
  color: rgb(83, 167, 255);
  cursor: pointer;
}
.butttonlog {
  display: flex;
  justify-content: space-between;
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
.tab {
  margin-top: 5px;
  height: 50vh;
  overflow-y: auto;
}
</style>
