<template>
  <div class="Testboxtop">创建考试</div>
  <div class="TestBoxs">
    <div class="Basicinformation">
      <div class="Basickey">1</div>
      <div class="initsxin">基本信息</div>
    </div>
    <div class="Basicinputs">
      <el-form :model="TestData" label-width="100px">
        <el-form-item label="考试名称：">
          <el-input v-model="TestData.title" placeholder="请输入考试名称" />
        </el-form-item>
        <el-form-item label="考试说明：">
          <el-input
            v-model="TestData.info"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入考试说明"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>

  <div class="TestBoxs">
    <div class="Basicinformation">
      <div class="Basickey">2</div>
      <div class="initsxin">内容设置</div>
    </div>
    <div class="BasicAdds">
      <el-form :model="TestData" label-width="120px">
        <el-form-item label="考试内容：">
          <div class="Testchuanz">
            <div class="TestchuanTop">
              <div style="font-size: 16.5px; font-weight: 600">试题列表</div>
              <div class="Testright">
                <div>总分：{{ result }}</div>
                <div class="boxasd">已添加{{ TestData.questions.length }}题</div>
                <el-button @click="qinkongs">清空</el-button>
              </div>
            </div>

            <div class="Calculationtopic">
              <div v-for="(item, index) in arraytest" :key="index">
                <span style="margin-left: 10px">{{
                  `${item.type}${
                    TestData.questions.filter((i: any) => i.type == item.type).length
                  }道`
                }}</span>
                <div class="Calculatidan" v-if="item.type === '单选题'">
                  <div class="meiti">
                    每题
                    <el-input
                      :model-value="MultipleChoice"
                      @update:model-value="onchange($event, item.type)"
                      style="width: 45px"
                    ></el-input
                    >分
                  </div>
                </div>
                <div class="Calculatidan" v-if="item.type === '多选题'">
                  <div class="meiti">
                    每题
                    <el-input
                      :model-value="Multiplechoicequestions"
                      @update:model-value="onchange($event, item.type)"
                      style="width: 45px"
                    ></el-input
                    >分
                  </div>
                </div>
                <div class="Calculatidan" v-if="item.type === '判断题'">
                  <div class="meiti">
                    每题
                    <el-input
                      :model-value="trueorfalse"
                      @update:model-value="onchange($event, item.type)"
                      style="width: 45px"
                    ></el-input
                    >分
                  </div>
                </div>
                <div class="Calculatidan" v-if="item.type === '填空题'">
                  <div class="meiti">
                    每题
                    <el-input
                      :model-value="fillintheblanks"
                      @update:model-value="onchange($event, item.type)"
                      style="width: 45px"
                    ></el-input
                    >分
                  </div>
                </div>
                <div class="Calculatidan" v-if="item.type === '问答题'">
                  <div class="meiti">
                    每题
                    <el-input
                      :model-value="essayquestion"
                      @update:model-value="onchange($event, item.type)"
                      style="width: 45px"
                    ></el-input
                    >分
                  </div>
                </div>
              </div>
            </div>
            <div class="concsTitle">
              <div class="TestContent" v-if="TestData.questions.length >= 1">
                <div
                  v-for="(item, index) in TestData.questions"
                  :key="index"
                  style="margin-bottom: 15px"
                >
                  <div class="TestContentTop">
                    <div class="TestContentLeft">
                      <div>{{ index + 1 }}.{{ item.type }}</div>
                      <div style="padding: 0 10px">分值</div>
                      <el-form-item>
                        <el-input v-model="item.scores" style="width: 82px; height: 32px" />
                      </el-form-item>
                    </div>
                    <div class="TestContentRight">
                      <span @click="getTestadd(item, index + 1)"
                        ><EditPen
                          style="width: 1em; height: 1em; margin-right: 8px; cursor: pointer"
                      /></span>
                      <span @click="getTestDel(item, index)">
                        <Delete style="width: 1em; height: 1em; margin-right: 8px; cursor: pointer"
                      /></span>
                    </div>
                  </div>
                  <div
                    class="TestcontTitle"
                    v-if="item.type === '填空题'"
                    v-html="filter(item.title, item.answer)"
                  ></div>
                  <div class="TestcontTitle" v-else v-html="item.title"></div>
                  <div v-if="item.type === '填空题' || item.type === '问答题'">
                    <div class="judge" v-if="item.type === '填空题'">
                      <span>正确答案</span>
                      <span style="margin-left: 20px">{{ item.answer }}</span>
                    </div>
                    <div class="jud">
                      <span>答案分析:</span> <span>{{ item.explains }}</span>
                    </div>
                  </div>
                  <div v-if="item.type === '单选题' || item.type === '多选题'">
                    <div v-for="(item1, index1) in item.answers" :key="index1">
                      <div
                        :class="
                          !item.answer.split('|').includes(item1.answerno)
                            ? 'Testone'
                            : 'Testone Testonesoum'
                        "
                      >
                        <el-radio :label="3"> {{ item1.answerno }}:</el-radio>
                        <div>{{ item1.content }}</div>
                      </div>
                    </div>
                  </div>

                  <div v-if="item.type === '判断题'">
                    <div class="judge">
                      <span>正确答案</span>
                      <span style="margin-left: 20px">{{ item.answer }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="TestButtom">
              <el-button @click="Wangtitle">添加题目</el-button>
              <el-button @click="plilsAdds">批量导入</el-button>
              <el-button @click="questionbank">从题库中导入</el-button>
              <el-button @click="yiyousi">选择已有试卷</el-button>
            </div>
          </div>
        </el-form-item>
        
        <el-form-item label="试题存入题库：">
          <div style="display: flex">
            <el-select v-model="TestData.teacherid" class="m-2" placeholder="请选择">
              <el-option
                v-for="item in baseDatas"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </div>
          <el-button style="margin-left: 15px" @click="chujians">+创建考试</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="TestBoxs">
      <div class="Basicinformation">
        <div class="Basickey">3</div>
        <div class="initsxin">考试设置</div>
      </div>
      <div class="examcontent">
        <el-form :model="TestData" label-width="110px">
          <el-form-item label="通过分数：">
            <el-input v-model="TestData.pastscores" style="width: 90px" />
          </el-form-item>

          <el-form-item label="考试时长：">
            <el-radio-group v-model="TestData.isshow">
              <el-radio :label="1" size="large" @click="xianshix">不限时时长</el-radio>
              <el-radio :label="2" size="large">限时时长</el-radio>
            </el-radio-group>
            <div style="display: flex" v-if="TestData.isshow === 2">
              <el-input
                v-model="TestData.limittime"
                style="height: 32px; width: 88px; margin-right: 10px"
              />分钟
            </div>
          </el-form-item>
          <el-form-item label="开放时间：">
            <div style="width: 420px; height: 30px">
              <el-date-picker
                v-model="value2"
                type="datetimerange"
                :shortcuts="shortcuts"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="shijian"
              />
            </div>
            <span style="font-size: 14px; color: #c3c3c3; margin-top: 7px; margin-left: 10px"
              >不填表示永久</span
            >
          </el-form-item>
          <el-form-item label="答案解析">
            <el-radio-group v-model="TestData.answershow">
              <el-radio :label="0" size="large">交卷后显示</el-radio>
              <el-radio :label="1" size="large">不允许查看</el-radio>
              <el-radio :label="2" size="large">仅可查看对错</el-radio>
              <el-radio :label="3" size="large">仅查看错题</el-radio>
              <el-radio :label="4" size="large">考试结束后查看</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="防作弊：">
            <el-checkbox v-model="check1" label="试题顺序打乱" size="large" @change="checkbox1" />
            <el-checkbox
              v-model="check2"
              label="选项顺序打乱(单选题,多选题,判断题)"
              size="large"
              @change="checkbox2"
            />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="TestBoxs">
      <div class="Basicinformation">
        <div class="Basickey">4</div>
        <div class="initsxin">教师范围</div>
      </div>
      <div class="BasicAdds">
        <el-form :model="TestData" label-width="110px">
          <el-form-item label="可见老师">
            <el-badge :value="TestData.limits.length" class="item" type="primary">
              <el-button @click="Markingteacher('可见老师')">+选择</el-button>
            </el-badge>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="TestBoxs">
      <div class="Basicinformation">
        <div class="Basickey">5</div>
        <div class="initsxin">考试学生</div>
      </div>
      <div class="BasicAdds">
        <el-form :model="TestData" label-width="110px">
          <el-form-item label="考生范围">
            <el-badge :value="TestData.students.length" class="item" type="primary">
              <el-button @click="Markingteacher('考生范围')">+选择</el-button>
            </el-badge>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="TestBoxs">
      <div class="Basicinformation">
        <div class="Basickey">6</div>
        <div class="initsxin">协同设置</div>
      </div>
      <div class="BasicAdds">
        <el-form :model="TestData" label-width="110px">
          <el-form-item label="阅卷老师">
            <el-badge :value="TestData.markteachers.length" class="item" type="primary">
              <el-button @click="Markingteacher('阅卷老师')">+选择</el-button>
            </el-badge>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="Testboxs">
      <el-button type="primary" @click="releaseadd('发布')">发布</el-button>
      <el-button @click="releaseadd('保存不发布')">保存(不发布)</el-button>
      <el-button @click="router.push('/SystemMenu/test')">取消</el-button>
    </div>
  </div>
  <SystemTransfer
    v-if="Bulletbox"
    ref="Transfe"
    :ishow="ishow"
    :names="names"
    :testid="0"
    @MySystemTransferAdd="MySystemTransferAdd"
    @MyClose="MyClose"
  ></SystemTransfer>
  <CreatetestQuestions
    v-if="Createtest"
    ref="Questions"
    @MybaseAdd="MybaseAdd"
    @myCrcolcs="myCrcolcs"
  ></CreatetestQuestions>
  <TestAddWangEditor
    v-if="wangis"
    ref="WangAdd"
    :id="TestData.id"
    @MywangAdd="MywangAdd"
    @MywangColos="MywangColos"
  ></TestAddWangEditor>
  <TestStepsDialog
    v-if="batch"
    ref="Stepslog"
    @MyStepsAdd="MyStepsAdd"
    @Myialogclose="Myialogclose"
  ></TestStepsDialog>
  <QuestionBankLogView ref="Questio" @myQunstions="myQunstions"></QuestionBankLogView>
  <TestpaperListView
    v-if="Testpape"
    ref="TestpaperList"
    @MyTestpapers="MyTestpapers"
    @closetpaperList="closetpaperList"
  >
  </TestpaperListView>
</template>

<script setup lang="ts">
import { DatabaseAdd, DatabaseList, SubjectsGet, TestAdd, TestGet } from '@/assets/api/TestList'
import CreatetestQuestions from '@/components/CreatetestQuestions.vue'
import QuestionBankLogView from '@/components/QuestionBankLogView.vue'
import SystemTransfer from '@/components/SystemTransfer.vue'
import TestAddWangEditor from '@/components/TestAddWangEditor.vue'
import TestStepsDialog from '@/components/TestStepsDialog.vue'
import TestpaperListView from '@/components/TestpaperListView.vue'
import { useCounterStore } from '@/stores/counter'
import { accuracy } from '@/untils/accuracy'
import { Delete, EditPen } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { computed, nextTick, reactive, ref, toRefs, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
let Store = useCounterStore()
//控制组件显示隐藏
let Createtest = ref(false)
let wangis = ref(false)
let batch = ref(false)

let Testpape = ref(false)
const TestpaperList = ref()
const WangAdd = ref()
const Questions = ref()
const Stepslog = ref()
const Questio = ref()
const router = useRouter()
const route = useRoute()
//题目input
let TestTypeo = reactive({
  MultipleChoice: '',
  Multiplechoicequestions: '',
  trueorfalse: '',
  fillintheblanks: '',
  essayquestion: ''
})
let tesGetid: any = ref(route.query.id)
let { MultipleChoice, Multiplechoicequestions, trueorfalse, fillintheblanks, essayquestion } =
  toRefs(TestTypeo)
let TestData: any = ref({
  id: 0,
  title: '',
  info: '',
  admin: 'ldq',
  begintime: null,
  endtime: null,
  limittime: '',
  scores: 0,
  incomplete: '',
  pastscores: 60,
  qorder: '',
  aorder: '',
  answershow: 0,
  isshow: 1,
  databaseid: 0,
  teacherid: '',
  state: 1,
  limits: [],
  markteachers: [],
  students: [],
  questions: [],
  subjectnum: 0,
  addtime: '',
  currenttime: ''
})
//时间
const value2 = ref('')
let check1 = ref(false)
let check2 = ref(false)
//多选1
const checkbox1 = (data: any) => {
  if (data === true) {
    TestData.value.qorder = '1'
  } else {
    TestData.value.qorder = '0'
  }
}
//多选2
const checkbox2 = (data: any) => {
  if (data === true) {
    TestData.value.aorder = '1'
  } else {
    TestData.value.aorder = '0'
  }
}
const Testgets = async () => {
  if (tesGetid.value !== 0) {
    let res = await TestGet({
      id: tesGetid.value
    })
    if (res.errCode === 10000) {
      TestData.value = res.data
      TestData.value.students = []
      ElMessage.warning('注意学生需要重新选择')
    }
  }
}
Testgets()
//监听编辑传没传入
watch(
  () => TestData.value,
  (a: any, b) => {
    if (a != '') {
      value2.value = [a.begintime, a.endtime] as any
      if (TestData.value.qorder == 1) {
        check1.value = true
      }
      if (TestData.value.aorder == 1) {
        check2.value = true
      }
    }
  },
  { immediate: true, deep: true }
)
//发布
const releaseadd = async (name: string) => {
  TestData.value.scores = result
  TestData.value.subjectnum = TestData.value.questions.length
  if (TestData.value.title === '') {
    ElMessage.error('考试名称不能为空')
  } else if (TestData.value.info === '') {
    ElMessage.error('考试说明不能为空')
  } else if (TestData.value.questions.length <= 0) {
    ElMessage.error('请添加考试内容')
  } else if (TestData.value.limits.length <= 0) {
    ElMessage.error('请选择可见老师')
  } else if (TestData.value.students.length <= 0) {
    ElMessage.error('请选择考生范围')
  } else if (TestData.value.markteachers.length <= 0) {
    ElMessage.error('请选择阅卷老师')
  } else {
    let res = await TestAdd(TestData.value)
    console.log(res.data)
    if (res.errCode === 10000) {
      if (Store.TestAddid !== 0) {
        Store.TestAddid = 0
      }
      ElMessage.success('发布成功')
      if (name === '发布') {
        router.push('/SystemMenu/test')
      } else {
        location.reload()
      }
    }
  }
}
//限时控制
const xianshix = (data: any) => {
  if (TestData.value.isshow === '1') {
    TestData.value.limittime = ''
  }
}
//已有试卷提交
const MyTestpapers = async (id: any) => {
  let res: any = await SubjectsGet({
    id
  })
  if (res.errCode === 10000) {
    TestData.value.questions = res.data.questions
  }
}
//点击已有试卷
const yiyousi = () => {
  Testpape.value = true
  nextTick(() => {
    TestpaperList.value.dialogVisible = true
  })
}
//关闭已有试卷弹框
const closetpaperList = () => {
  Testpape.value = false
}
//试题提交
const myQunstions = (data: any) => {
  TestData.value.questions = data
}
//打开题库列表
const questionbank = () => {
  Questio.value.dialogVisible = true
}
//批量上传成功添加
const MyStepsAdd = (data: any) => {
  Stepslog.value.dialogVisible = false
  TestData.value.questions = data
}

//关闭批量上传弹框
const Myialogclose = () => {
  batch.value = false
}
//点击批量导入试题
const plilsAdds = () => {
  batch.value = true
  nextTick(() => {
    Stepslog.value.dialogVisible = true
  })
}
//删除
const getTestDel = (data: any, key: number) => {
  TestData.value.questions.splice(key, 1)
}
//编辑
const getTestadd = (data: any, key: number) => {
  WangAdd.value.drawer = true
  WangAdd.value.questionsData = JSON.parse(JSON.stringify(data))
  WangAdd.value.questionsData.id = key
}
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
    TestData.value.questions
      .filter((item: any) => item.type === type)
      .forEach((i: any) => {
        i.scores = data
      })
  }
}
//判断题型显示或不显示
const Arraytype = ref<string[]>(['单选题', '多选题', '判断题', '填空题', '问答题'])
const listarray = ref<any[]>([])
const arraytest: any = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  listarray.value.splice(0)
  Arraytype.value.forEach((item: any) => {
    if (TestData.value.questions.find((items: any) => items.type == item)) {
      listarray.value.push(TestData.value.questions.find((items: any) => items.type == item))
    }
  })
  // })
  return listarray.value
})
//添加标题处理
const filter = (title: any, answer: any) => {
  const answerList = answer.split('|')
  console.log(answerList)
  let i = 0
  while (title.includes('[]')) {
    title = title.replace(
      '[]',
      `<span style=" padding: 2px 10px;
        border-bottom: 1px solid #000;
        min-width: 40px;
        display: inline-block;
        text-align: center;
        height: 25px;">${answerList[i]}</span>,`
    )
    i++
  }
  return title
}
//点击清空
const qinkongs = () => {
  TestData.value.questions = []
  MultipleChoice.value = ''
  trueorfalse.value = ''
  Multiplechoicequestions.value = ''
  essayquestion.value = ''
  fillintheblanks.value = ''
}
// 总分计算属性
const result = computed(() => {
  let num = TestData.value.questions.reduce(
    (past: any, item: any) => Number(past) + Number(item.scores),
    0
  )

  return accuracy(num) ? accuracy(num) : 0
})
//题型添加
const MywangAdd = (data: any) => {
  if (data.id === 0) {
    TestData.value.questions.push(data)
    WangAdd.value.drawer = false
  } else {
    console.log(data.id)

    TestData.value.questions[data.id - 1] = data
    WangAdd.value.drawer = false
  }
}
//关闭题型添加弹框
const MywangColos = () => {
  wangis.value = false
}
//打开编辑器
const Wangtitle = () => {
  wangis.value = true
  nextTick(() => {
    WangAdd.value.drawer = true
  })
}
//获取弹框暴露属性
let Transfe = ref()
let Bulletbox = ref(false)
//控制班级显示隐藏
const ishow = ref(true)
//弹框名称
const names = ref('')

//打开题库弹框
const chujians = () => {
  Createtest.value = true
  nextTick(() => {
    Questions.value.dialogVisible = true
  })
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
//关闭题库页面
const myCrcolcs = () => {
  Createtest.value = false
}
const shijian = (data: any) => {
  TestData.value.begintime = dayjs(data[0]).format('YYYY-MM-DD HH:mm:ss') + '.0'
  TestData.value.endtime = dayjs(data[1]).format('YYYY-MM-DD HH:mm:ss') + '.0'
}
//关闭穿梭框操作
const MyClose = () => {
  Bulletbox.value = false
}
//获取左侧穿梭框数据
const MySystemTransferAdd = (data: any) => {
  let res: any = data.filter((item: any) => {
    return item.name === item.name
      ? {
          id: item
        }
      : ''
  })
  if (names.value === '阅卷老师') {
    TestData.value.markteachers = res
  }
  if (names.value === '可见老师') {
    TestData.value.limits = res
  }
  if (names.value === '考生范围') {
    let res: any = data.map((item: any) => {
      return item.name === item.name
        ? {
            studentid: item.id
          }
        : ''
    })
    TestData.value.students = res
  }
  Transfe.value.dialogVisible = false
}
//获取部门
const Markingteacher = (data: any) => {
  Bulletbox.value = true
  nextTick(() => {
    names.value = data
    if (data === '考生范围') {
      ishow.value = true
    } else {
      ishow.value = false
    }
    Transfe.value.dialogVisible = true
  })
}
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() + 3600 * 1000 * 24 * 7)
      return [end, start]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
      return [end, start]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
      return [end, start]
    }
  }
]
</script>

<style lang="less" scoped>
.jud {
  background-color: #f5faff;
  color: #9dadbc;
  padding: 8px;
  margin-top: 10px;
}
.judge {
  background-color: #eefaf6;
  color: #5acda6;
  padding: 8px;
}
.Testboxs {
  padding-left: 228px;
  margin-top: 46px;
  padding-bottom: 100px;
}
.examcontent {
  margin-left: 109px;
  margin-top: 10px;
}
.Testonesoum {
  background-color: #eefaf6;
  margin-bottom: 10px;
}
.Testone {
  display: flex;
  align-items: center;
  height: 26px;
  padding: 8px;
}
/deep/.el-radio {
  margin-right: 10px;
}
/deep/.el-radio__inner {
  width: 20px;
  height: 20px;
}
.TestcontTitle {
  padding: 7px 0px;
}
.concsTitle {
  overflow-y: scroll;
  max-height: 60vh;
  .TestContent {
    padding: 20px 15px;
    overflow-y: auto;
    .TestContentTop {
      display: flex;
      color: #6a6a6a;
      justify-content: space-between;
      .TestContentLeft {
        display: flex;
      }
    }
    .TestContentRight {
      font-size: 20px;
      color: #299aff;
    }
  }
}
.Calculationtopic {
  width: 120px;
  position: absolute;
  left: -130px;
  font-size: 13px;
  color: #848484;
  .Calculatidan {
    width: 100%;
    border: solid 1px #ececec;
    padding: 7px 0;
  }
  .meiti {
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    .el-input {
      width: 55px;
      height: 28px;
      padding: 0 5px;
      font-size: 12px;
    }
  }
}
.Testboxtop {
  padding: 10px 30px;
  font-size: 20px;
  margin-bottom: 10px;
}
.TestBoxs {
  .Basicinformation {
    display: flex;
    align-items: center;
    background-color: #f9faff;
    padding: 5px 30px;
    .Basickey {
      font-size: 35px;
      color: #c7e5ff;
    }
    .initsxin {
      padding-left: 17px;
      font-size: 16px;
    }
  }
  .Basicinputs {
    width: 500px;
    margin-left: 128px;
    margin-top: 10px;
    font-size: 14px;
    .el-input {
      height: 30px;
    }
  }
}
.BasicAdds {
  margin-left: 119px;
  margin-top: 10px;
  .Testchuanz {
    width: 1025px;
    border: 1px solid #dcdfe6;
    .TestchuanTop {
      padding: 10px 15px;
      border-bottom: 1px solid #dcdfe6;
      display: flex;
      justify-content: space-between;
      .Testright {
        display: flex;
        color: #90909e;
        .boxasd {
          padding: 0 40px;
        }
      }
    }
  }
}
.TestButtom {
  padding: 10px 15px;
  font-size: 12px;
  border-top: 2px solid #dcdfe6;
}
</style>
