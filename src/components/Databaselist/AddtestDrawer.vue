<template>
  <div>
    <el-drawer
      v-model="table"
      :title="questionData.id ? '试题修改' : '试题添加'"
      direction="rtl"
      size="50%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <div class="Questions">
        <!-- 类型 -->
        <el-radio-group class="MultipleType" v-model="addData.type">
          <el-radio v-for="(item, index) in data.testType" :key="index" :label="item.type">{{
            item.type
          }}</el-radio>
        </el-radio-group>
        <el-form
          ref="ruleFormRef"
          :model="addData"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <!-- 富文本编辑器 -->
          <el-form-item label="题干" prop="title">
            <div class="question_stem">
              <Editor
                style="width: 100%"
                @update:editorValue="update"
                ref="editorRef"
                v-model="addData.title"
                :editorValue="addData.title"
              >
              </Editor>
            </div>
          </el-form-item>
          <el-form-item
            v-if="addData.type == '单选题' || addData.type == '多选题'"
            label="选项"
            prop="content"
          >
            <div class="options">
              <div v-for="(item, index) in addData.answers" :key="index" class="tab_item">
                <span>{{ addData.letters[index] }}:</span>
                <el-input
                  v-model="item.content"
                  :rows="1"
                  :cols="55"
                  type="textarea"
                  style="margin: 10px 10px"
                />
                <el-icon :size="20" style="color: red" @click="delTab"><CircleClose /></el-icon>
              </div>
              <el-icon
                :size="30"
                style="color: #4290f7; margin-left: 30px; margin-top: 5px"
                @click="addTab"
                ><CirclePlus
              /></el-icon>
            </div>
          </el-form-item>
          <!-- 单选题 -->
          <el-form-item label="正确答案" prop="content" v-if="addData.type == '单选题'">
            <el-radio-group v-model="addData.answer" class="Multiple">
              <el-radio
                v-for="(item, index) in addData.answers"
                :key="index"
                :label="item.answerno"
                >{{ item.answerno }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <!-- 多选题 -->
          <el-form-item label="正确答案" prop="content" v-if="addData.type == '多选题'">
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                v-for="(item, index) in addData.answers"
                :key="index"
                :label="item.answerno"
                >{{ item.answerno }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <!-- 判断题 -->
          <el-form-item label="正确答案" v-if="addData.type == '判断题'">
            <el-radio-group v-model="addData.answer">
              <el-radio-button :label="'正确'" />
              <el-radio-button :label="'错误'" />
            </el-radio-group>
          </el-form-item>
          <!-- 填空题、问答题 -->
          <div v-if="addData.type == '填空题' || addData.type == '问答题'">
            <el-form-item label="正确答案" v-if="input.length <= 0 ? false : true">
                <el-input
                  v-for="(item, index) in input"
                  :key="index"
                  v-model="input[index]"
                  @blur="getsoumInput"
                  style="margin-bottom: 15px"
                />
              </el-form-item>
            <el-form-item label="解析">
              <el-input
                v-model="addData.explains"
                :rows="4"
                :cols="30"
                type="textarea"
                style="margin: 10px 10px"
              />
            </el-form-item>
          </div>

          <!-- 分值 -->
          <el-form-item label="分值" prop="scores">
            <el-input-number v-model="addData.scores" controls-position="right" :min="1" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm">保存</el-button>
            <el-button @click="andcontinue">保存并继续</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { databasequestionadd } from '@/assets/api/databaselist/DatabaseList'
import { errorMsg, succesMsg } from '@/untils/msg'
import { CircleClose, CirclePlus } from '@element-plus/icons-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const route = useRoute()
const table = ref(true)
const emit = defineEmits(['update:value', 'blur', 'closeDrawer'])
const props = defineProps({
  getList: {
    type: Function,
    required: true
  },
  questionData: {
    type: Object,
    required: true
  }
})
const update = (value: any) => {
  addData.title = value
}
let input = ref([])

interface IaddData {
  id: number
  databaseid: any
  title: string
  type: string
  answer: any
  tags: string
  explains: string
  scores: number
  answers: Array<any>
  letters: Array<any>
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
  ],
  letters: [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
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

//获取输入框
const getsoumInput = (data: any) => {
  addData.answer = input.value.join('|')
}
// 点击删除一行选项
const delTab = () => {
  if (addData.answers.length <= 4) {
    errorMsg('最少要有4个选项')
    return
  }
  addData.answers.pop()
}
// 点击添加一行选项
const addTab = () => {
  if (addData.answers.length < 26) {
    addData.answers.push({
      id: 0,
      answerno: addData.letters[addData.answers.length],
      content: ''
    })
  } else {
    errorMsg('没有更多选项了')
  }
}
// 表单验证
const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入题干', trigger: 'blur' }],
  scores: [{ required: true, message: '请输入分值', trigger: 'blur' }]
})
const checkList = ref([]) //多选题 正确答案

watch(
  () => props.questionData,
  (newVal, oldVal) => {
    if (newVal) {
      Object.assign(addData, newVal)
      if (newVal.answer) {
        checkList.value = newVal.answer.split('|')
      }
    }
  },
  { deep: true, immediate: true }
)

// 点击保存
const confirm = async () => {
  ConfirmAdd()
  emit('closeDrawer', false)
}
// 点击保存并继续
const andcontinue = () => {
  ConfirmAdd()
  addData.title = ''
  addData.type = '单选题'
  addData.explains = ''
  addData.answers.map((item: any) => {
    return (item.content = '')
  })
}

watch(
  () => addData,
  (a: any, b) => {
    if (a.answer !== '') {
      if (String(a.answer).indexOf('|') !== -1) {
        input.value = a.answer.split('|')
      }
    }
    let res = a.title.match(/\[\]/g)
    if (Array.isArray(res)) {
      let arr = res.map((item: any) => {
        return item !== ''
      })
      
      if (arr) {
        input.value.length = res.length
      }
    } else {
      input.value = []
    }
  },
  { immediate: true, deep: true }
)

// 添加/修改
const ConfirmAdd = async () => {
  if (addData.type == '多选题') {
    addData.answer = checkList.value.join('|')
  }
  if (!addData.title) {
    errorMsg('题干必填！')
    return false
  }
  if (addData.type == '单选题' || addData.type == '多选题') {
    addData.answers.filter((item: any) => {
      if (!item.content) {
        errorMsg('请填写所有选项！')
        return false
      }
      return false
    })
  }
  if (addData.type == '单选题' || addData.type == '多选题' || addData.type == '判断题') {
    if (!addData.answer) {
      errorMsg('正确答案必填！')
      return false
    }
    if (addData.type == '多选题' && addData.answer.length < 3) {
      errorMsg('正确答案至少两项！')
      return false
    }
  }
  if (addData.type === '填空题') {
      if (input.value.length <= 0) {
        ElMessage.error('请在题库输入大括号')
      } else {
        if (input.value[input.value.length - 1] === undefined) {
          ElMessage.error('正确答案,输入框不能为空')
          return false
        }
      }
    }
  if (addData.id === 0) {
    let res: any = await databasequestionadd(addData)
    if (res.errCode !== 10000) {
      errorMsg('添加失败！')
      return false
    }
    succesMsg('添加成功！')
  } else {
    let res = await databasequestionadd(addData)
    if (res.errCode !== 10000) {
      errorMsg('编辑失败！')
      return false
    }
    succesMsg('编辑成功！')
  }
  props.getList()
}
// 点击取消
const cancel = () => {
  emit('closeDrawer', false)
}
// 点空白地方触发事件
const handleClose = () => {
  emit('closeDrawer', false)
}
</script>

<style scoped lang="less">
.Questions {
  margin-left: -40px;
  margin-top: -30px;
  .MultipleType {
    margin-bottom: 20px;
    margin-left: 60px;
  }
  .options {
    line-height: 32px;
    margin-top: -10px;
    .tab_item {
      display: flex;
      height: auto;
      margin: 5px 0px 5px;
      span {
        margin-top: 8px;
      }
      .el-icon {
        color: red;
        font-size: 20px;
        margin-left: 5px;
        margin-top: 15px;
      }
    }
  }
  .Multiple {
    margin-bottom: 20px;
  }
}
</style>
