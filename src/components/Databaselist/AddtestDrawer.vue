<template>
  <div>
    <el-drawer
      v-model="table"
      title="添加试题"
      direction="rtl"
      size="50%"
      :before-close="handleClose"
    >
      <div class="Questions">
        <!-- 类型 -->
        <el-radio-group class="MultipleType" v-model="addData.type">
          <el-radio v-for="(item, index) in testType" :key="index" :label="item.type">{{
            item.type
          }}</el-radio>
        </el-radio-group>
        
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  getList: {
    type: Function,
    required: true
  },
  questionData: {
    type: Object
  }
})
console.log(props.getList)

interface IaddData {
  id: number
  databaseid: any
  title: string
  type: string
  answer: string
  tags: string
  explains: string
  scores: number
  answers: Array<any>
}
interface Idata {
  testType: Array<any>
}

const addData: IaddData = reactive({
  id: 0,
  databaseid: route.query.id,
  title: '',
  type: '单选题',
  answer: '',
  tags: '',
  explains: '', //解析
  scores: 1,
  answers: [
    {
      answerno: 'A',
      content: ''
    },
    {
      answerno: 'B',
      content: ''
    },
    {
      answerno: 'C',
      content: ''
    },
    {
      answerno: 'D',
      content: ''
    }
  ]
})
const data: Idata = reactive({
  testType: [
    { type: '单选题', id: 1 },
    { type: '多选题', id: 2 },
    { type: '判断题', id: 3 },
    { type: '填空题', id: 4 },
    { type: '问答题', id: 5 }
  ]
})
const { testType } = toRefs(data)

const emit = defineEmits(['update:value', 'blur', 'closeDrawer'])
const table = ref(true)
const handleClose = (done: any) => {
  emit('closeDrawer', false)
}
</script>

<style scoped lang="less">
.Questions {
  margin-left: -40px;
  margin-top: -20px;
  .MultipleType {
    margin-bottom: 20px;
    margin-left: 60px;
  }
}
</style>
