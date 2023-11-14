<template>
  <div>
    <el-drawer
      v-model="drawer"
      :title="props.id === 0 ? '试题添加' : '试题修改'"
      :direction="direction"
      size="52%"
      :close-on-click-modal="false"
      @close="guabviwangs"
    >
      <div class="radio">
        <el-radio-group v-model="questionsData.type" @change="gattabtype">
          <el-radio :label="'单选题'" size="large">单选题</el-radio>
          <el-radio :label="'多选题'" size="large">多选题</el-radio>
          <el-radio :label="'判断题'" size="large">判断题</el-radio>
          <el-radio :label="'填空题'" size="large">填空题</el-radio>
          <el-radio :label="'问答题'" size="large">问答题</el-radio>
        </el-radio-group>
      </div>
      <div class="conent">
        <el-form :model="form" label-width="80px">
          <el-form-item label="题干" style="max-width: 700px; height: 300px">
            <WangEditor v-model="questionsData.title" @updata:modelValue="modelValue"></WangEditor>
          </el-form-item>
          <div v-if="questionsData.type === '填空题' || questionsData.type === '问答题'">
            <div v-if="questionsData.type === '填空题'">
              <el-form-item label="正确答案" v-if="input.length <= 0 ? false : true">
                <el-input
                  v-for="(item, index) in input"
                  :key="index"
                  v-model="input[index]"
                  @blur="getsoumInput"
                  style="margin-bottom: 15px"
                />
              </el-form-item>
            </div>
            <el-form-item label="解析">
              <el-input
                v-model="questionsData.explains"
                :rows="2"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="请输入"
              />
            </el-form-item>
          </div>

          <div v-if="questionsData.type === '判断题'">
            <el-form-item label="正确答案">
              <el-radio-group v-model="questionsData.answer">
                <el-radio-button label="正确" />
                <el-radio-button label="错误" />
              </el-radio-group>
            </el-form-item>
          </div>
          <div v-if="questionsData.type === '单选题' || questionsData.type === '多选题'">
            <el-form-item label="选项">
              <div v-for="(item, index) in questionsData.answers" :key="index">
                <div class="tiao">
                  <span style="font-size: 14px; margin-right: 10px">{{ item.answerno }}:</span>
                  <el-input v-model="item.content"></el-input>

                  <div
                    style="font-size: 25px; color: #f56c6c; margin-left: 10px; cursor: pointer"
                    @click="delinput(item, index)"
                  >
                    <CircleClose style="width: 1em; height: 1em; margin-right: 8px" />
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div
                style="
                  font-size: 30px;
                  margin-left: 26px;
                  margin-top: -5px;
                  color: #48a2ff;
                  cursor: pointer;
                "
                @click="AddXuaninput"
              >
                <CirclePlus style="width: 1em; height: 1em" />
              </div>
            </el-form-item>
            <el-form-item label="正确答案">
              <div v-if="questionsData.type === '单选题'">
                <el-radio-group v-model="questionsData.answer" class="ml-4">
                  <div v-for="(item, index) in questionsData.answers" :key="index">
                    <el-radio :label="'' + item.answerno" size="large">{{
                      item.answerno
                    }}</el-radio>
                  </div>
                </el-radio-group>
              </div>
              <div v-else>
                <el-checkbox-group v-model="vaule" @change="getduoxu">
                  <div
                    v-for="(item, index) in questionsData.answers"
                    :key="index"
                    class="checkboxs"
                  >
                    <el-checkbox :label="'' + item.answerno" />
                  </div>
                </el-checkbox-group>
              </div>
            </el-form-item>
          </div>
          <el-form-item label="分值">
            <el-input
              type="text"
              v-model="questionsData.scores"
              style="width: 77px; height: 28px"
              @blur="inputs($event)"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="baocuns">保存</el-button>
            <el-button>保存并继续</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { CircleClose, CirclePlus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import WangEditor from './WangEditor.vue'
let emits = defineEmits<{
  (name: 'MywangAdd', value: any): any
  (name: 'MywangColos'): any
}>()
let props = defineProps<{
  id: number
}>()
let vaule = ref()
let input = ref([])
let questionsData = ref({
  id: 0,
  testid: 0,
  title: '<p><br></p>',
  type: '单选题',
  scores: 1,
  answer: 'A',
  tags: '',
  explains: '',
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
//关闭回调
const guabviwangs = () => {
  emits('MywangColos')
}
//提交
const baocuns = () => {
  if (questionsData.value.title === '') {
    ElMessage.error('题干不能为空')
  } else {
    if (questionsData.value.type === '多选题' || questionsData.value.type === '单选题') {
      if (!questionsData.value.answers.every((item: any) => item.content !== '')) {
        ElMessage.error('选项输入框不能为空')
      } else {
        if (questionsData.value.type === '多选题') {
          if (questionsData.value.answer.split('|').length < 2) {
            ElMessage.error('至少选择两项')
          } else {
            emits('MywangAdd', questionsData.value)
          }
        }

        if (questionsData.value.type === '单选题') {
          if (questionsData.value.answer === '') {
            ElMessage.error('至少选择一项')
          } else {
            emits('MywangAdd', questionsData.value)
          }
        }
      }
    }

    if (questionsData.value.type === '判断题') {
      if (questionsData.value.answer === '') {
        ElMessage.error('至少选择一项')
      } else {
        emits('MywangAdd', questionsData.value)
      }
    }
    if (questionsData.value.type === '填空题') {
      if (input.value.length <= 0) {
        ElMessage.error('请在题库输入大括号')
      } else {
        if (input.value[input.value.length - 1] === undefined) {
          ElMessage.error('正确答案,输入框不能为空')
        } else {
          emits('MywangAdd', questionsData.value)
        }
      }
    }
    if (questionsData.value.type === '问答题') {
      if (questionsData.value.explains === '') {
        ElMessage.error('解析不能为空请输入')
      } else {
        emits('MywangAdd', questionsData.value)
      }
    }
  }
}
const inputs = (data: any) => {
  if ((questionsData.value.scores as any) == '') {
    ElMessage.warning('分值不能为空')
  }
}

watch(
  () => questionsData.value,
  (a: any, b) => {
    if (a.answer !== '') {
      if (String(a.answer).indexOf('|') !== -1) {
        input.value = a.answer.split('|')
      }
    }
    let res = a.title.match(/\[\]/g)
    console.log(res)

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
const drawer = ref(false)
const form = reactive({
  name: ''
})
let yinwens: any = ref([
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
])
//点击顶部题目类型
const gattabtype = (data: any) => {
  if (data === '填空题') {
    questionsData.value.answer = ''
    questionsData.value.explains = ''
  } else {
    input.value = []
  }
  if (data === '问答题') {
    questionsData.value.answer = ''
    questionsData.value.explains = ''
  }
  if (data === '判断题') {
    questionsData.value.answer = ''
    questionsData.value.explains = ''
  }
  if (data === '单选题' || data === '多选题') {
    if (data === '单选题') {
      questionsData.value.answer = 'A'
    }
    questionsData.value.explains = ''
  } else {
    questionsData.value.answers = [
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
  }
}
//获取输入框
const getsoumInput = (data: any) => {
  questionsData.value.answer = input.value.join('|')
}
//多选
const getduoxu = (data: string[]) => {
  questionsData.value.answer = data.join('|')
}
//删除
const delinput = (data: any, key: any) => {
  if (questionsData.value.answers.length <= 3) {
    ElMessage.error('至少保留3个')
  } else {
    questionsData.value.answers = questionsData.value.answers.filter((item: any, index) => {
      return index !== key
    })

    questionsData.value.answers = questionsData.value.answers.map((item: any, index) => {
      return {
        ...item,
        answerno: yinwens.value[index]
      }
    })
  }
}
//添加框
const AddXuaninput = () => {
  if (questionsData.value.answers.length >= 24) {
    ElMessage.info('不能在添加了')
  } else {
    questionsData.value.answers.push({
      answerno: yinwens.value[questionsData.value.answers.length],
      content: ''
    })
  }
}

const modelValue = (data: any) => {
  questionsData.value.title = data
}
const direction = ref('rtl')

defineExpose({ drawer, questionsData })
</script>

<style lang="less" scoped>
/deep/.el-checkbox-group {
  width: 455px;
  display: flex;
  .el-checkbox {
    margin-right: 10px;
  }
}
.tiao {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.radio {
  padding: 0 30px;
  margin-top: -30px;
}
.conent {
  padding: 15px 0 15px 10px;
}
/deep/ .el-input__wrapper {
  height: 32px;
  width: 400px;
  font-size: 13px;
}
</style>
