<template>
  <div>
    <h3>创建试卷</h3>
    <div class="one">
      <span class="ones">1</span>
      <span style="padding-left: 17px">基本信息</span>
    </div>
    <el-form-item label="考试名称：" style="margin-left: 150px; margin-top: 10px">
      <el-input v-model="from.title" />
    </el-form-item>
    <div class="one">
      <span class="ones">2</span>
      <span style="padding-left: 17px">内容设置</span>
    </div>

    <!-- 试卷 -->
    <div>
      <el-form style="display: flex; margin-top: 20px" label-width="190px">
        <div>
          <el-form-item label="试卷名称：" style="margin-left: 40px" />
          <!-- 分值 -->
          <div v-for="(item, index) in arraytest" :key="index">
            <div class="Score" v-if="item.type === '单选题'">
              <p>单选题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
              <p>
                每题
                <el-input
                  :model-value="MultipleChoice"
                  style="width: 50px"
                  @update:model-value="onchange($event, item.type)"
                />
                分
              </p>
            </div>
            <div class="Score" v-if="item.type === '多选题'">
              <p>多选题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
              <p>
                每题
                <el-input
                  :model-value="Multiplechoicequestions"
                  style="width: 50px"
                  @update:model-value="onchange($event, item.type)"
                />
                分
              </p>
            </div>
            <div class="Score" v-if="item.type === '判断题'">
              <p>判断题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
              <p>
                每题
                <el-input
                  :model-value="trueorfalse"
                  style="width: 50px"
                  @update:model-value="onchange($event, item.type)"
                />
                分
              </p>
            </div>
            <div class="Score" v-if="item.type === '填空题'">
              <p>填空题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
              <p>
                每题
                <el-input
                  :model-value="fillintheblanks"
                  style="width: 50px"
                  @update:model-value="onchange($event, item.type)"
                />
                分
              </p>
            </div>
            <div class="Score" v-if="item.type === '问答题'">
              <p>问答题{{ from.questions.filter((i: any) => i.type == item.type).length }}道</p>
              <p>
                每题
                <el-input
                  :model-value="essayquestion"
                  style="width: 50px"
                  @update:model-value="onchange($event, item.type)"
                />
                分
              </p>
            </div>
          </div>
        </div>

        <div class="godtop">
          <div>
            <!-- 上面 -->
            <div class="god">
              <b>试题列表</b>
              <div class="right">
                <span>总分：{{ scores }}</span>
                <span>已添加{{ from.questions.length }}题</span>
                <el-button @click="del">清空</el-button>
              </div>
            </div>
            <!-- 中间 -->
            <div class="gods Testboxs" v-if="from.questions.length >= 1">
              <div v-for="(item, index) in from.questions" :key="item.id">
                <!-- 单选题 -->
                <div class="top" v-if="item.type === '单选题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span>
                  <span>分值:<el-input v-model="item.scores" style="width: 50px"></el-input></span>
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

                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                    <div class="bo" v-if="item.answer != items.answerno">
                      <div class="box"></div>

                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                  </div>
                </div>
                <!-- 多选题 -->
                <div class="top" v-if="item.type === '多选题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span>
                  <span>分值:<el-input v-model="item.scores" style="width: 50px"></el-input></span>
                  <span @click="getTestadd(item, index + 1)"
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div class="title" v-html="item.title"></div>

                  <div v-for="items in item.answers" :key="items.id">
                    <div
                      class="bo color"
                      v-if="
                        item.answer.includes(items.answerno) ===
                        items.answerno.includes(items.answerno)
                      "
                    >
                      <div class="box"></div>

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

                      <span>{{ items.answerno }}：</span>
                      <span>{{ items.content }}</span>
                    </div>
                  </div>
                </div>
                <!-- 填空题和问答题 -->
                <div class="top" v-if="item.type === '填空题' || item.type == '问答题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span>
                  <span>分值:<el-input v-model="item.scores" style="width: 50px"></el-input></span>
                  <span @click="getTestadd(item, index + 1)"
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div class="title" v-html="item.title.replace(/\[\]/g, '_____')"></div>

                  <div v-if="item.type == '填空题' || item.type == '问答题'">
                    <p v-if="item.type == '填空题'" class="Corrects">正确答案：{{ item.answer }}</p>

                    <p class="parse">答案解析：{{ item.explains }}</p>
                  </div>
                  <div v-for="items in item.answers" :key="items.id"></div>
                </div>
                <!-- 判断题 -->
                <div class="top" v-if="item.type === '判断题'">
                  <span>{{ index + 1 }}.{{ item.type }}</span>
                  <span>分值:<el-input v-model="item.scores" style="width: 50px"></el-input></span>
                  <span @click="getTestadd(item, index + 1)"
                    ><el-icon><EditPen /></el-icon
                  ></span>
                  <span @click="dels(index)"
                    ><el-icon><Delete /></el-icon
                  ></span>
                  <div class="title" v-html="item.title"></div>
                  <p class="CorrectAnswer">正确答案：{{ item.answer }}</p>
                </div>
              </div>
            </div>
            <!-- 下面 -->
            <div class="godst">
              <el-button @click="Wangtitle"> 添加题目 </el-button>
              <el-button @click="Batch"> 批量导入 </el-button>
              <el-button @click="questionbank"> 从题库中导入 </el-button>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <!-- 试题 -->
    <el-form style="display: flex; margin-top: 20px">
      <el-form-item label="试题存入题库：" style="margin-left: 120px">
        <el-select placeholder="请选择题库" v-model="from.databaseid">
          <el-option v-for="item in arr" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: 20px">
        <el-button aria-disabled="false" @click="chujians"> + 创建题库 </el-button>
      </el-form-item>
    </el-form>

    <div class="one">
      <span class="ones">3</span>
      <span style="padding-left: 17px">教师范围</span>
    </div>

    <el-form-item label="可见老师： " style="margin-left: 150px; margin-top: 20px">
      <el-button @click="Markingteacher('可见老师')">
        + 选择
        <div class="but">{{ from.limits.length }}</div>
      </el-button>
    </el-form-item>
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
  <CreatetestQuestions
    v-if="Createtest"
    ref="Questions"
    @MybaseAdd="MybaseAdd"
    @myCrcolcs="myCrcolcs"
  ></CreatetestQuestions>
  <!-- 单个添加 -->
  <TestAddWangEditor
    v-if="wangis"
    ref="WangAdd"
    :id="from.id"
    @MywangAdd="MywangAdd"
    @MywangColos="MywangColos"
  ></TestAddWangEditor>
  <!-- 穿梭框 -->
  <SystemTransfer
    v-if="Bulletbox"
    ref="Transfe"
    :ishow="ishow"
    :names="names"
    :testid="0"
    @MySystemTransferAdd="MySystemTransferAdd"
    @my-close="myclose"
  ></SystemTransfer>
</template>

<script setup lang="ts">
import { DatabaseAdd, DatabaseList } from '@/assets/api/TestList'
import { datalist } from '@/assets/api/databaselist/DatabaseList'
import { subjectsadd, subjectsget } from '@/assets/api/subjects/subjects'
import BatchImport from '@/components/BatchImport.vue'
import CreatetestQuestions from '@/components/CreatetestQuestions.vue'
import QuestionBankLogView from '@/components/QuestionBankLogView.vue'
import SystemTransfer from '@/components/SystemTransfer.vue'
import TestAddWangEditor from '@/components/TestAddWangEditor.vue'
import { errorMsg, succesMsg } from '@/untils/msg'
import { Delete, EditPen } from '@element-plus/icons-vue'
import { computed, nextTick, reactive, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//获取弹框暴露属性
let Transfe = ref()
//控制班级显示隐藏
const ishow = ref(false)
let Bulletbox = ref(false)
let wangis = ref(false)
let Createtest = ref(false)
//弹框名称
const names = ref('')
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
}
// 详情编辑回显
let subjlist = async () => {
  let res: any = await subjectsget({ id: useroute.query.id } as any).catch(() => {})
  if (res?.errCode === 10000) {
    Object.assign(from.value, res.data)
  }
}
subjlist()
let sex = 'http://apis.90000p.com/exam2212/api/test/upload'
let title = ref('“试题上传”')
let arr: any = ref([])
let list = async () => {
  let res: any = await datalist({
    page: 1,
    psize: 10,
    key: '',
    admin: '',
    ismy: 0
  }).catch(() => {})
  if (res?.errCode === 10000) {
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
  } else if (from.value.limits.length <= 0) {
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
  Createtest.value = true
  nextTick(() => {
    Questions.value.dialogVisible = true
  })
}
//关闭题库页面
const myCrcolcs = () => {
  Createtest.value = false
}
//试题提交
const myQunstions = (data: any) => {
  from.value.questions = data
}
//题库
let baseDatas = ref()
const DatabaseData = async () => {
  let res: any = await DatabaseList().catch(() => {})
  if (res?.errCode === 10000) {
    baseDatas.value = res.data.list
  }
}
DatabaseData()
//添加题库
const MybaseAdd = async (data: any) => {
  let res = await DatabaseAdd(data).catch(() => {})
  if (res?.errCode === 10000) {
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

//打开题库弹框
const chujians = () => {
  Createtest.value = true
  nextTick(() => {
    Questions.value.dialogVisible = true
  })
} //关闭穿梭框操作
const myclose = () => {
  Bulletbox.value = false
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
  wangis.value = true
  nextTick(() => {
    WangAdd.value.drawer = true
    WangAdd.value.questionsData = JSON.parse(JSON.stringify(data))
    WangAdd.value.questionsData.id = key
  })
}
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
const MySystemTransferAdd = (data: any) => {
  let res: any = data.filter((item: any) => {
    return item.name === item.name
      ? {
          id: item
        }
      : ''
  })

  if (names.value === '可见老师') {
    from.value.limits = res
  }

  from.value.students = res

  Transfe.value.dialogVisible = false
}
// 取消
const cancellation = () => {
  userouter.push('/SystemMenu/subjects')
}
const father = () => {
  user.value = false
  list()
}
const Batch = () => {
  user.value = true
}
</script>

<style scoped lang="less">
@import url('../../assets/css/SubjctsAdd/SubjctsAdd.less');
</style>
