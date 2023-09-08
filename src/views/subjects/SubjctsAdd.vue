<template>
  <div>
    <h3>创建试卷</h3>
    <div class="one">
      <span class="ones">1</span>
      <span data-v-ab382b7d="" style="padding-left: 17px">基本信息</span>
    </div>
    <el-form-item label="试卷名称：" style="margin-left: 150px; margin-top: 10px">
      <el-input v-model="from.title" />
    </el-form-item>
    <div class="one">
      <span class="ones">2</span>
      <span style="padding-left: 17px">内容设置</span>
    </div>
    <div style="display: flex">
      <div>
        <!-- 内容 -->
        <div style="display: flex; margin: 10px; margin-left: 110px">
          <div>
            <el-form-item label="试卷名称：" style="margin-left: 40px"> </el-form-item>
            <!-- 分值 -->
            <div v-for="(item, index) in arraytest" :key="index">
              <div class="Score" v-if="item.type === '单选题'">
                <p>单选题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
                <p>
                  每题&nbsp;&nbsp;<el-input
                    :model-value="MultipleChoice"
                    style="width: 50px"
                    @update:model-value="onchange($event, item.type)"
                  />&nbsp;&nbsp;分
                </p>
              </div>
              <div class="Score" v-if="item.type === '多选题'">
                <p>多选题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
                <p>
                  每题&nbsp;&nbsp;<el-input
                    :model-value="Multiplechoicequestions"
                    style="width: 50px"
                    @update:model-value="onchange($event, item.type)"
                  />&nbsp;&nbsp;分
                </p>
              </div>
              <div class="Score" v-if="item.type === '判断题'">
                <p>判断题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
                <p>
                  每题&nbsp;&nbsp;<el-input
                    :model-value="trueorfalse"
                    style="width: 50px"
                    @update:model-value="onchange($event, item.type)"
                  />&nbsp;&nbsp;分
                </p>
              </div>
              <div class="Score" v-if="item.type === '填空题'">
                <p>填空题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
                <p>
                  每题&nbsp;&nbsp;<el-input
                    :model-value="fillintheblanks"
                    style="width: 50px"
                    @update:model-value="onchange($event, item.type)"
                  />&nbsp;&nbsp;分
                </p>
              </div>
              <div class="Score" v-if="item.type === '问答题'">
                <p>问答题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
                <p>
                  每题&nbsp;&nbsp;<el-input
                    :model-value="essayquestion"
                    style="width: 50px"
                    @update:model-value="onchange($event, item.type)"
                  />&nbsp;&nbsp;分
                </p>
              </div>
            </div>
          </div>
          <div>
            <!-- 上面 -->
            <div class="god">
              <b>试题列表</b>
              <div class="right">
                <span>总分：{{ scores }}</span>
                <span>已添加{{ from.questions.length }}题</span>
                <el-button style="position: relative; left: 30px" @click="del">清空</el-button>
              </div>
            </div>
            <!-- 中间 -->
            <div class="gods Testboxs" v-if="from.questions.length >= 1">
              <div v-for="(item, index) in from.questions" :key="item.id">
                <!-- 单选题 -->
                <div v-if="item.type === '单选题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span @click="getTestadd(item, index + 1)"
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div v-html="item.title"></div>

                  <div v-for="items in item.answers" :key="items.id">
                    <div class="bo color" v-if="item.answer === items.answerno">
                      <div class="box"></div>
                      &nbsp; &nbsp;
                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                    <div class="bo" v-if="item.answer != items.answerno">
                      <div class="box"></div>
                      &nbsp; &nbsp;
                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                  </div>
                </div>
                <!-- 多选题 -->
                <div v-if="item.type === '多选题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span @click="getTestadd(item, index + 1)"
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div v-html="item.title"></div>

                  <div v-for="items in item.answers" :key="items.id">
                    <div
                      class="bo color"
                      v-if="
                        item.answer.includes(items.answerno) ===
                        items.answerno.includes(items.answerno)
                      "
                    >
                      <div class="box"></div>
                      &nbsp; &nbsp;
                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                    <div
                      class="bo"
                      v-if="
                        item.answer.includes(items.answerno) !=
                        items.answerno.includes(items.answerno)
                      "
                    >
                      <div class="box"></div>
                      &nbsp; &nbsp;
                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                  </div>
                </div>
                <!-- 填空题 -->
                <div v-if="item.type === '填空题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span @click="getTestadd(item, index + 1)"
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div v-html="item.title.replace(/\[\]/g, '_____')"></div>

                  <div v-if="item.type == '填空题' || item.type == '问答题'">
                    <p v-if="item.type == '填空题'" class="Corrects">正确答案：{{ item.answer }}</p>

                    <p class="parse">答案解析：{{ item.explains }}</p>
                  </div>
                  <div v-for="items in item.answers" :key="items.id"></div>
                </div>
                <!-- 判断题 -->
                <div v-if="item.type === '判断题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span @click="getTestadd(item, index + 1)"
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div v-html="item.title"></div>
                  <p class="CorrectAnswer">正确答案：{{ item.answer }}</p>
                </div>
                <!-- 问答题 -->
                <div v-if="item.type === '问答题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span
                  >&nbsp;&nbsp;
                  <span
                    >分值:&nbsp;&nbsp;<el-input v-model="item.scores" style="width: 50px"></el-input
                  ></span>
                  <span @click="getTestadd(item, index + 1)"
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div v-html="item.title.replace(/\[\]/g, '_____')"></div>

                  <div v-if="item.type == '填空题' || item.type == '问答题'">
                    <p v-if="item.type == '填空题'" class="Corrects">正确答案：{{ item.answer }}</p>

                    <p class="parse">答案解析：{{ item.explains }}</p>
                  </div>
                  <div v-for="items in item.answers" :key="items.id"></div>
                </div>
              </div>
            </div>
            <!-- 下面 -->
            <div class="god">
              <el-button @click="Wangtitle"> 添加题目 </el-button>
              <el-button @click="Batch"> 批量导入 </el-button>
              <el-button @click="questionbank"> 从题库中导入 </el-button>
            </div>

            <div
              id="el-id-9465-1"
              class="el-form-item__label"
              style="width: 110px; margin-left: -110px; margin-top: 20px"
            >
              试题存入题库：
            </div>
            <el-select placeholder="请选择题库" v-model="from.databaseid">
              <el-option v-for="item in arr" :key="item.id" :label="item.title" :value="item.id" />
            </el-select>
            <button
              class="el-button"
              aria-disabled="false"
              type="button"
              style="font-size: 13px; margin-left: 20px"
               @click="chujians"
            >
              + 创建题库
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="one">
      <span class="ones">3</span>
      <span style="padding-left: 17px">教师范围</span>
    </div>
    <div
      id="el-id-9465-1"
      class="el-form-item__label"
      style="width: 110px; margin-left: 100px; margin-top: 20px"
    >
      可见老师：
    </div>
    <el-button
      aria-disabled="false"
      style="font-size: 13px; position: relative"
      @click="Markingteacher"
    >
      <sup class="el-badge__content el-badge__content--primary is-fixed">{{
        from.limits.length
      }}</sup>
      + 选择
    </el-button>
  </div>
  <div style="margin-left: 210px; margin-top: 50px">
    <el-button type="primary" @click="add">提交</el-button>
    <el-button @click="cancellation">取消</el-button>
  </div>
  <!-- 批量添加 -->
  <BatchImport
    v-if="user"
    v-model="user"
    @allTableData="allTableData"
    :call="father"
    :rado="sex"
    :title="title"
  ></BatchImport>
  <!-- 题库添加 -->
  <QuestionBankLogView ref="Questio" @myQunstions="myQunstions"></QuestionBankLogView>
  <!-- 创建题库 -->
<CreatetestQuestions ref="Questions" @MybaseAdd="MybaseAdd"></CreatetestQuestions>
  <!-- 单个添加 -->
  <TestAddWangEditor ref="WangAdd" :id="from.id" @MywangAdd="MywangAdd"></TestAddWangEditor>
  <!-- 穿梭框 -->
  <QuestionBanklist v-if="shows" v-model="shows" :fla="flase" @all="all"></QuestionBanklist>
</template>

<script setup lang="ts">
import { DatabaseAdd, DatabaseList } from '@/assets/api/TestList'
import { datalist } from '@/assets/api/databaselist/DatabaseList'
import { subjectsadd, subjectsget } from '@/assets/api/subjects/subjects'
import BatchImport from '@/components/BatchImport.vue'
import CreatetestQuestions from '@/components/CreatetestQuestions.vue'
import QuestionBankLogView from '@/components/QuestionBankLogView.vue'
import TestAddWangEditor from '@/components/TestAddWangEditor.vue'
import { errorMsg, succesMsg } from '@/untils/msg'
import QuestionBanklist from '@/views/subjects/QuestionBanklist.vue'
import { Delete, EditPen } from '@element-plus/icons-vue'
import { computed, reactive, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//题目input
let TestTypeo = reactive({
  MultipleChoice: '',
  Multiplechoicequestions: '',
  trueorfalse: '',
  fillintheblanks: '',
  essayquestion: ''
})
let { MultipleChoice, Multiplechoicequestions, trueorfalse, fillintheblanks, essayquestion } =
  toRefs(TestTypeo)
let useroute = useRoute()
let userouter = useRouter()
let user = ref(false)
const Questio = ref()
const Questions = ref()
let adds = ref(false)
let shows = ref(false)
let from: any = ref({
  id: 0,
  title: '',
  info: '',
  admin: 'ldq',
  begintime: '',
  endtime: '',
  limittime: '0',
  scores: '',
  pastscores: '',
  qorder: '0',
  aorder: '1',
  answershow: '0',
  isshow: 1,
  databaseid: '',
  teacherid: 0,
  state: 1,
  limits: [],
  markteachers: [],
  students: [],
  questions: []
})
const allTableData = (val: any) => {
  from.value.questions = val
  adds.value = true
}
// 详情编辑回显
let subjlist = async () => {
  let res: any = await subjectsget({ id: useroute.query.id })
  Object.assign(from.value, res.data)
}
subjlist()
let sex = 'http://estate.eshareedu.cn/exam/api/test/upload'
let title = ref('试题上传')
let arr: any = ref([])
let list = async () => {
  let res: any = await datalist({
    page: 1,
    psize: 10,
    key: '',
    admin: '',
    ismy: ''
  })
  if (res.errCode === 10000) {
    arr.value = res.data.list
  }
}
list()

// 添加或编辑
const add = async () => {
  if (from.value.title === '') {
    errorMsg('试卷名称不能为空')
    return
  } else if (from.value.questions.length <= 0) {
    errorMsg('题干不能为空')
    return
  } else if (from.value.limits.length <= 1) {
    errorMsg('可见老师不能为空')
    return
  }
  let res = await subjectsadd(from.value)
  if (res.errCode === 10000) {
    if (from.value.id === 0) {
      succesMsg('添加成功')
      userouter.push('/SystemMenu/subjects')
    } else {
      succesMsg('编辑成功')
      userouter.push('/SystemMenu/subjects')
    }
  } else {
    errorMsg(res.errMsg)
  }
}
// 总分
const scores = computed(() => {
  let a = from.value.questions.reduce(
    (prev: any, next: any) => Number(prev) + Number(next.scores),
    0
  )
  return a
})
//输入input题型输入操作
const onchange = (data: any, type: any) => {
  if (data.length > 2) {
    return
  } else {
    if (type === '单选题') {
      MultipleChoice.value = data
    }
    if (type === '判断题') {
      trueorfalse.value = data
    }
    if (type === '多选题') {
      Multiplechoicequestions.value = data
    }
    if (type === '问答题') {
      essayquestion.value = data
    }
    if (type === '填空题') {
      fillintheblanks.value = data
    }
    from.value.questions
      .filter((item: any) => item.type === type)
      .forEach((i: any) => {
        i.scores = data
      })
  }
}
// 清空
const del = () => {
  from.value.questions = []
  adds.value = false
}
// 单个删除
const dels = (i: any) => {
  if (from.value.questions.length <= 1) {
    adds.value = false
  }
  from.value.questions.splice(i, 1)
}
//打开题库列表
const questionbank = () => {
  Questio.value.dialogVisible = true
}
//试题提交
const myQunstions = (data: any) => {
  from.value.questions = data
}
//题库
let baseDatas = ref()
const DatabaseData = async () => {
  let res: any = await DatabaseList()
  if (res.errCode === 10000) {
    baseDatas.value = res.data.list
  }
}
DatabaseData()
//添加题库
const MybaseAdd = async (data: any) => {
  let res = await DatabaseAdd(data)
  if (res.errCode === 10000) {
    Questions.value.dialogVisible = false
    DatabaseData()
  }
}
const Arraytype = ref<string[]>(['单选题', '多选题', '判断题', '填空题', '问答题'])
const listarray = ref<any[]>([])
const arraytest: any = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  listarray.value.splice(0)
  Arraytype.value.forEach((item: any) => {
    if (from.value.questions.find((items: any) => items.type == item)) {
      listarray.value.push(from.value.questions.find((items: any) => items.type == item))
    }
  })
  return listarray.value
})
const WangAdd = ref()
//打开编辑器
const Wangtitle = () => {
  WangAdd.value.drawer = true
}
//打开题库弹框
const chujians = () => {
  Questions.value.dialogVisible = true
}
//题型添加
const MywangAdd = (data: any) => {
  if (data.id === 0) {
    from.value.questions.push(data)
    adds.value = true
    WangAdd.value.drawer = false
  } else {
    from.value.questions[data.id - 1] = data
    WangAdd.value.drawer = false
  }
}
//编辑
const getTestadd = (data: any, key: number) => {
  WangAdd.value.drawer = true
  WangAdd.value.questionsData = JSON.parse(JSON.stringify(data))
  WangAdd.value.questionsData.id = key
}
const Markingteacher = () => {
  shows.value = true
}
// 可见老师
const all = (row: any) => {
  from.value.limits = row
}
// 取消
const cancellation = () => {
  userouter.push('/SystemMenu/subjects')
}
const father = () => {
  user.value = false
  list()
}
const flase = () => {
  shows.value = false
  list()
}

const Batch = () => {
  user.value = true
}
</script>

<style scoped lang="less">
.CorrectAnswer {
  background-color: #f0faf6;
  color: #84d5b1;
  padding: 12px;
}
.Corrects {
  background-color: #f0faf6;
  color: #84d5b1;
  padding: 12px;
  margin-bottom: 15px;
}
.parse {
  background-color: #f6faff;
  color: #a0adbd;
  padding: 12px;
}
.color {
  background-color: #eefaf6;
  padding-left: 10px;
}
.Score {
  width: 122px;
  height: 90px;
  border: 1px solid #dcdfe6;
  position: relative;
  top: 10px;
  left: -10px;
  font-size: 13px;
  color: #848484;
  text-align: center;
  line-height: 40px;
}
h3 {
  font-size: 20px;
  padding: 20px;
}
.one {
  display: flex;
  align-items: center;
  background-color: #f9faff;
  padding: 5px 30px;
}
.ones {
  font-size: 35px;
  color: #c7e5ff;
}
.el-input {
  width: 300px;
}

.god {
  display: flex;
  width: 1005px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #dcdfe6;
  padding: 10px 30px;
}
.gods {
  width: 1005px;
  line-height: 30px;
  border: 1px solid #dcdfe6;
  padding: 10px 30px;
}
b {
  font-weight: bold;
  font-size: 1rem;
}
.right {
  color: #90909e;
  margin-left: 65%;
}
.right span {
  margin-left: 36px;
}

.el-badge__content--primary {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 5px;
  transform: translateY(-50%) translate(100%);
  background-color: var(--el-color-primary);
  font-size: 12px;
}
.Testboxs {
  max-height: 74vh;
  overflow-y: scroll;
}
.el-icon {
  color: #409eff;
  font-size: 25px;
  position: relative;
  left: 800px;
}
.box {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #e0e0e0;
  margin-top: 5px;
}
.bo {
  display: flex;
  color: #606266;
  margin: 10px;
  padding-left: 10px;
}
</style>
