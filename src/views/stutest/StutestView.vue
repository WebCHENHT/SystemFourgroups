<template>
  <div class="Stutestop">
    <div class="liebiaos">考试列表</div>
    <div class="Stutesfrom">
      <el-form-item label="关键字">
        <el-input v-model="StutestModel.key" placeholder="考试名称" clearable />
      </el-form-item>
      <el-form-item label="状态">
        <el-select
          v-model="StutestModel.result"
          class="m-2"
          placeholder="请输入"
          @change="xuanzes()"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chzhaos">查询</el-button>
      </el-form-item>
    </div>
  </div>
  <el-empty description="空空如也" v-if="StutesDatas.length <= 0" />
  <keep-alive>
    <component
      :is="ExamListView"
      :StutesDatas="StutesDatas"
      :loading="loading"
      :total="total"
      @MyhandleSize="MyhandleSize"
      @MyhandleCurrent="MyhandleCurrent"
    />
  </keep-alive>
</template>

<script setup lang="ts">
import { reactive, ref, onActivated } from 'vue'
import { TestLists } from '@/assets/api/TestList'
import ExamListView from '@/components/ExamListView.vue'
let loading = ref(true)
let total = ref(0)
let StutestModel = reactive({
  page: 1,
  psize: 12,
  key: '',
  result: ''
})
let StutesDatas: any = ref([])
onActivated(() => {
  console.log('aaaa')
})

const StutestDatas = async () => {
  let res = await TestLists(StutestModel)
  if (res.errCode === 10000) {
    StutesDatas.value = res.data.list
    total.value = res.data.counts as unknown as number
    loading.value = false
  }
}
StutestDatas()
const MyhandleSize = (data: any) => {
  StutestModel.key = ''
  StutestModel.psize = data

  StutestDatas()
}
const MyhandleCurrent = (data: any) => {
  StutestModel.key = ''
  StutestModel.page = data
  StutestDatas()
}
const xuanzes = () => {
  loading.value = true
  StutestDatas()
}
const chzhaos = () => {
  loading.value = true

  StutestDatas()
}

const options = [
  {
    value: '',
    label: '所有'
  },
  {
    value: '未考试',
    label: '未考试'
  },
  {
    value: '待阅卷',
    label: '待阅卷'
  },
  {
    value: '已通过',
    label: '已通过'
  },
  {
    value: '未通过',
    label: '未通过'
  }
]
</script>
<style lang="less" scoped>
.Stutestop {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  .liebiaos {
    font-size: 20px;
  }
  .Stutesfrom {
    display: flex;
    align-items: center;
    .el-form-item {
      margin-right: 15px;
    }
    .el-select {
      width: 100px;
    }
  }
}
</style>
