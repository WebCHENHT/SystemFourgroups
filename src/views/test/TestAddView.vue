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
            v-model="TestData.teacherid"
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
                <div>总分：0</div>
                <div class="boxasd">已添加0题</div>
                <el-button>清空</el-button>
              </div>
            </div>
            <div class="Calculationtopic" v-if="TestData.questions.length >= 1">
              <div v-for="(item, index) in TestData.questions" :key="index">
                <div class="Calculatidan" v-if="item.type === '单选题'">
                  <div style="margin-left: 10px">单选题道</div>
                  <div class="meiti">每题<el-input />分</div>
                </div>
                <div class="Calculatidan" v-if="item.type === '多选题'">
                  <div style="margin-left: 10px">多选题道</div>
                  <div class="meiti">每题<el-input />分</div>
                </div>
                <div class="Calculatidan" v-if="item.type === '判断题'">
                  <div style="margin-left: 10px">判断题道</div>
                  <div class="meiti">每题<el-input />分</div>
                </div>
                <div class="Calculatidan" v-if="item.type === '填空题'">
                  <div style="margin-left: 10px">填空题道</div>
                  <div class="meiti">每题<el-input />分</div>
                </div>
                <div class="Calculatidan" v-if="item.type === '问答题'">
                  <div style="margin-left: 10px">问答题道</div>
                  <div class="meiti">每题<el-input />分</div>
                </div>
              </div>
            </div>
            <div class="concsTitle">
              <div class="TestContent" v-if="TestData.questions.length >= 1">
                <div v-for="(item, index) in TestData.questions" :key="index">
                  <div class="TestContentTop">
                    <div class="TestContentLeft">
                      <div>{{ index + 1 }}.{{ item.type }}</div>
                      <div style="padding: 0 10px">分值</div>
                      <el-form-item>
                        <el-input v-model="item.scores" style="width: 82px; height: 32px" />
                      </el-form-item>
                    </div>
                    <div class="TestContentRight">
                      <span
                        ><EditPen
                          style="width: 1em; height: 1em; margin-right: 8px; cursor: pointer"
                      /></span>
                      <span>
                        <Delete style="width: 1em; height: 1em; margin-right: 8px; cursor: pointer"
                      /></span>
                    </div>
                  </div>
                  <div class="TestcontTitle" v-html="getitle(item)"></div>
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
              <el-button>批量导入</el-button>
              <el-button>从题库中导入</el-button>
              <el-button>选择已有试卷</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="试题存入题库：">
          <div style="display: flex">
            <el-select v-model="TestData.info" class="m-2" placeholder="请选择">
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
            <el-radio-group v-model="TestData.limittime">
              <el-radio label="0" size="large">不限时时长</el-radio>
              <el-radio label="1" size="large">限时时长</el-radio>
            </el-radio-group>
            <div style="display: flex" v-if="TestData.limittime === '1'">
              <el-input style="height: 32px; width: 88px; margin-right: 10px" />分钟
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
              <el-radio label="0" size="large">交卷后显示</el-radio>
              <el-radio label="1" size="large">不允许查看</el-radio>
              <el-radio label="2" size="large">仅可查看对错</el-radio>
              <el-radio label="3" size="large">仅查看错题</el-radio>
              <el-radio label="4" size="large">考试结束后查看</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="防作弊：">
            <el-checkbox v-model="TestData.qorder" label="试题顺序打乱" size="large" />
            <el-checkbox
              v-model="TestData.aorder"
              label="选项顺序打乱(单选题,多选题,判断题)"
              size="large"
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
      <el-button type="primary">发布</el-button>
      <el-button>保存(不发布)</el-button>
      <el-button>取消</el-button>
    </div>
  </div>
  <SystemTransfer
    ref="Transfe"
    :ishow="ishow"
    :names="names"
    :datas="datas"
    :TransferDatas="TransferDatas"
    :ClassesDatas="ClassesDatas"
    @MyDepartment="MyDepartment"
    @MySystemTransferAdd="MySystemTransferAdd"
    @MyClasses="MyClasses"
    @DelSystemTransfer="DelSystemTransfer"
  ></SystemTransfer>
  <CreatetestQuestions ref="Questions" @MybaseAdd="MybaseAdd"></CreatetestQuestions>
  <TestAddWangEditor ref="WangAdd" :id="TestData.id" @MywangAdd="MywangAdd"></TestAddWangEditor>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Delete, EditPen } from '@element-plus/icons-vue'
import SystemTransfer from '@/components/SystemTransfer.vue'
import TestAddWangEditor from '@/components/TestAddWangEditor.vue'
import {
  DepartmentList,
  TeacherList,
  ClassesList,
  StudentList,
  DatabaseList,
  DatabaseAdd
} from '@/assets/api/TestList'
import dayjs from 'dayjs'
import CreatetestQuestions from '@/components/CreatetestQuestions.vue'
const value = ref('')
const WangAdd = ref()
const Questions = ref()
let TestData: any = ref({
  id: 0,
  title: '',
  info: '',
  admin: 'ldq',
  begintime: '2021-12-07 15:33:59.0',
  endtime: '2021-12-02 15:34:03.0',
  limittime: '0',
  scores: 100,
  pastscores: 60,
  qorder: '0',
  aorder: '1',
  answershow: '0',
  isshow: 1,
  databaseid: 20,
  teacherid: 0,
  state: 1,
  limits: [],
  markteachers: [],
  students: [],
  questions: []
})
//添加标题处理
const getitle = (data: any) => {
  // data.title.replace(/\[\]/g, '')
  let res = data.answer.split('|')

  res.forEach((item: any, index: any) => {
    data.title.replace(/\[\]/g, `<span class="as">${item}</span>,`)
  })
  return data.title.replace
}
//题型添加
const MywangAdd = (data: any) => {
  TestData.value.questions.push(data)
  console.log(TestData.value.questions)

  WangAdd.value.drawer = false
}
//打开编辑器
const Wangtitle = () => {
  WangAdd.value.drawer = true
}
//获取弹框暴露属性
let Transfe = ref()
//控制班级显示隐藏
const ishow = ref(true)
//弹框名称
const names = ref('')

//打开题库弹框
const chujians = () => {
  Questions.value.dialogVisible = true
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
const shijian = (data: any) => {
  TestData.value.begintime = dayjs(data[0]).format('YYYY-MM-DD')
  TestData.value.endtime = dayjs(data[1]).format('YYYY-MM-DD')
}
//获取左侧穿梭框数据
const MySystemTransferAdd = (data: any) => {
  let res: any = data.map((item: any) => {
    return item === item
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
      return item === item
        ? {
            studentid: item
          }
        : ''
    })
    TestData.value.students = res
  }
  Transfe.value.dialogVisible = false
}

//阅卷老师
//处理部门
let TransferDatas = ref()
let ClassesDatas = ref()
const MyDepartment = async (data: any) => {
  if (names.value === '阅卷老师' || names.value === '可见老师') {
    Transfe.value.loading = true
    let res = await TeacherList({
      depid: data
    })
    if (res.errCode === 10000) {
      TransferDatas.value = res.data.list
      Transfe.value.Classes = []
      Transfe.value.loading = false
    }
  } else {
    let res = await ClassesList({
      depid: data
    })
    if (res.errCode === 10000) {
      ClassesDatas.value = res.data.list
    }
  }
}
//班级
const MyClasses = async (data: any) => {
  Transfe.value.loading = true
  let res = await StudentList(data)
  if (res.errCode === 10000) {
    TransferDatas.value = res.data.list
    Transfe.value.Classes = []
    Transfe.value.loading = false
  }
}

//部门数据
let datas = ref()
//获取部门
const Markingteacher = async (data: any) => {
  let res = await DepartmentList()
  if (res.errCode === 10000) {
    datas.value = res.data.list
    names.value = data
    if (data === '考生范围') {
      ishow.value = true
    } else {
      ishow.value = false
    }
    Transfe.value.dialogVisible = true
  }
}
//关闭弹框回调
const DelSystemTransfer = () => {
  datas.value = []
  TransferDatas.value = []
  ClassesDatas.value = []
}
//时间
const value2 = ref('')
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
</script>

<style lang="less" scoped>
.as {
  padding: 2px 10px;
  border-bottom: 1px solid #000;
  min-width: 40px;
  display: inline-block;
  text-align: center;
  height: 25px;
}
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
