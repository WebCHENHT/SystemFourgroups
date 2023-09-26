<template>
  <div class="Questions">
    <div class="Questionstoptitle">{{ name }}</div>

    <div class="QuestionsList">
      <div class="timexbox" v-if="ishowtime">
        <el-icon><AlarmClock /></el-icon>
        <span style="font-size: 5px; margin-top: 8px">倒计时</span>
        <span style="margin-top: 5px; font-size: 13px"> {{ dataTime }}</span>
      </div>
      <div
        class="Questionsli"
        :id="'id' + index"
        v-for="(item, index) in examinationdatas"
        :key="index"
      >
        <div class="QuestionsTyoe">
          <div class="Type">
            <div class="keynum">{{ index + 1 }}</div>
            <div class="typetitle">{{ item.type }}</div>
          </div>
          <span class="scors">分值：{{ item.scores }}</span>
        </div>
        <div class="title" v-html="inpurs(item.title, index)" v-if="item.type === '填空题'"></div>
        <div class="title" v-html="htmlEncode(item.title)" v-else></div>
        <div v-if="item.type === '判断题'">
          <div
            :class="item1 === item.studentanswer ? 'optionsconcent SelectedBox' : 'optionsconcent'"
            v-for="(item1, index1) in zhenq"
            :key="index1"
            @click="panduns(item1, index)"
          >
            <div class="concentleft">
              <div class="yuexi" v-if="item1 !== item.studentanswer"></div>
              <div class="Selectednum" v-else>
                <Select style="color: #fff; width: 15px; height: 20px" />
              </div>
              {{ item1 }}
            </div>
          </div>
        </div>

        <div v-if="item.type == '单选题'">
          <div
            :class="
              item1.answerno === item.studentanswer
                ? 'optionsconcent SelectedBox'
                : 'optionsconcent'
            "
            v-for="(item1, index1) in item.answers"
            :key="index1"
            @click="danxuan(index1, item.title)"
          >
            <div class="concentleft">
              <div :class="item1.answerno === item.studentanswer ? 'Selectednum' : 'yuexi'">
                {{ item.answers.map((item: any) => item.answerno).sort()[index1] }}
              </div>
              {{ item1.content }}
            </div>
          </div>
        </div>

        <div v-if="item.type === '多选题'">
          <div
            :class="
              item.studentanswer
                ? item.studentanswer.includes(item1.answerno)
                  ? 'optionsconcent SelectedBox'
                  : 'optionsconcent'
                : 'optionsconcent'
            "
            v-for="(item1, index1) in item.answers"
            :key="index1"
            @click="duoxuan(index, item1.answerno, item.id)"
          >
            <div class="concentleft">
              <div
                :class="
                  item.studentanswer
                    ? item.studentanswer.includes(item1.answerno)
                      ? 'checkboxs'
                      : 'yuexicheckbox'
                    : 'yuexicheckbox'
                "
              >
                {{ item.answers.map((item: any) => item.answerno).sort()[index1] }}
              </div>
              {{ item1.content }}
            </div>
          </div>
        </div>
        <div v-if="item.type === '问答题'">
          <div class="textinput">
            <el-input
              v-model="item.studentanswer"
              min-height="31"
              :show-word-limit="true"
              type="textarea"
              placeholder="Please input"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <AnswerSheetVue ref="Answers" :Questionlists="examinationdatas"></AnswerSheetVue>
</template>

<script setup lang="ts">
import { TestStart } from '@/assets/api/TestList/index'
import AnswerSheetVue from '@/components/AnswerSheet.vue'
import { htmlEncode } from '@/untils/Dilist'
import { debounce } from '@/untils/antishake'

import { AlarmClock, Select } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
// 导入 duration 插件
dayjs.extend(duration)
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
let route = useRoute()
let Answers = ref()
let zhenq = ref(['正确', '错误'])
let examinationdatas: any = ref([])
watch(
  () => examinationdatas.value,
  (a: any[], b) => {
    huancuns(route.query.id, JSON.stringify(examinationdatas.value))
    a.forEach((item: any) => {
      if (item.studentanswer == '') {
        item.studentanswer = null
        if (item.type === '填空题') {
          item.studentanswer = ''
        }
      }
    })
  },
  { deep: true }
)
//乱序
const randomSortArray = (arr: any) => {
  var stack = []
  while (arr.length) {
    //Math.random()：返回 [0,1) 之间的一个随机数
    var index = parseInt((Math.random() * arr.length) as unknown as string) // 利用数组长度生成随机索引值
    stack.push(arr[index]) // 将随机索引对应的数组元素添加到新的数组中
    arr.splice(index, 1) // 删除原数组中随机生成的元素
  }
  return stack
}

let name = ref('')
let time = ref<any>('')
let dataTime = ref<any>('')
let ishowtime = ref(false)

const getexaminationlist = async () => {
  let timer: any
  let res: any = await TestStart({
    testid: route.query.id as string
  }).catch(() => {})
  if (res?.errCode === 10000) {
    name.value = res.data.title
    const result = computed(() => {
      return dayjs(res.data.endtime).diff(dayjs(res.data.studentStartTime), 'seconds')
    })

    time.value = result.value
    if (res.data.limittime !== 0) {
      ishowtime.value = true
      const limittimeInSeconds = res.data.limittime * 60
      const currentTime = dayjs(res.data.currenttime)
      const studentStartTime = dayjs(res.data.studentStartTime)
      const timeDifferenceInSeconds = currentTime.diff(studentStartTime, 'seconds')
      let times: any = limittimeInSeconds - timeDifferenceInSeconds

      const countDown = () => {
        //获取当前时间的时间戳（单位毫秒）
        timer = setInterval(() => {
          //把剩余时间毫秒数转化为秒
          times--
          time.value--
          //计算小时数 转化为整数

          dataTime.value = dayjs.duration(times, 'seconds').format('HH:mm:ss')

          if (times <= 0) {
            //倒计时结束关闭循环提交
            clearInterval(timer)
            Answers.value.confirmEvent()
          }
        }, 1000)
      }
      countDown()
    }
    if (!JSON.parse(localStorage.getItem('data' + route.query.id) as any)) {
      examinationdatas.value = res.data.questions
      //qorder 顺序打乱
      if (res.data.qorder === 1) {
        examinationdatas.value = randomSortArray(examinationdatas.value)
      }
      //aorder 选项打乱
      if (res.data.aorder === 1) {
        let arr = examinationdatas.value.filter((item: any) => {
          return item.type === '单选题' || item.type === '多选题' || item.type === '选择题'
            ? item
            : ''
        })
        arr.forEach((item: any) => {
          item.answers = randomSortArray(item.answers)
        })
      }
    } else {
      examinationdatas.value = JSON.parse(localStorage.getItem('data' + route.query.id) as any)
    }

    nextTick(() => {
      document.querySelectorAll('.input').forEach((item: any, index: number) => {
        if (JSON.parse(localStorage.getItem('data' + route.query.id) as any)) {
          let indexa = item.getAttribute('data-index')
          document.querySelectorAll('.input' + indexa).forEach((ite: any, indexas: number) => {
            ite.value =
              String(examinationdatas.value[indexa].studentanswer).split('|')[indexas] === 'null' ||
              String(examinationdatas.value[indexa].studentanswer).split('|')[indexas] === undefined
                ? ''
                : String(examinationdatas.value[indexa].studentanswer).split('|')[indexas]
          })
        }
        item.oninput = function () {
          let index = this.getAttribute('data-index')
          let arr: any = []
          document.querySelectorAll('.input' + index).forEach((ite: any) => {
            if (ite.value) {
              arr.push(ite.value)
            }
          })
          examinationdatas.value[index].studentanswer = arr.length === 0 ? null : arr.join('|')
        }
      })
    })
  }
}
getexaminationlist()

//填空题
const inpurs = (data: any, index: number) => {
  if (data.includes('[]')) {
    data = data.replace(
      /\[\]/g,
      `<input data-index="${index}" type="text" class="input input${index}" style="outline-style:none;margin:0 2px"></input>`
    )
  }
  return data
}
//防止复制文字
const jinzhis = () => {
  document.oncontextmenu = new Function('event.returnValue=false') as any
  document.onselectstart = new Function('event.returnValue=false') as any
}
jinzhis()
//缓存
const huancuns = (id: any, data: any) => {
  localStorage.setItem('data' + id, data)
}
//多选题
const duoxuan = debounce((index: number, answerno: any) => {
  let _studentanswer = examinationdatas.value[index].studentanswer
  let stuAnswers = _studentanswer ? _studentanswer.split('|') : []

  if (stuAnswers.length > 0 && stuAnswers.includes(answerno)) {
    stuAnswers = stuAnswers.filter((item: any) => item != answerno)
  } else {
    stuAnswers.push(answerno)
  }

  examinationdatas.value[index].studentanswer = stuAnswers.sort().join('|')
}, 200)

//单选题
const danxuan = debounce((data: any, index1: number) => {
  examinationdatas.value.filter((item: any) => item.title === index1)[0].studentanswer =
    examinationdatas.value.filter((item: any) => item.title === index1)[0].answers[data].answerno
}, 200)

//判断题
const panduns = debounce((data1: any, index: any) => {
  examinationdatas.value[index].studentanswer = data1
}, 200)
</script>

<style lang="less" scoped>
.el-icon {
  font-size: 29px !important;
  margin-top: 15px;
}
.timexbox {
  width: 85px;
  height: 100px;
  border-radius: 5px;
  background-color: #e98478;
  position: fixed;
  top: 20px;
  right: 344px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}
.textinput {
  /deep/.el-input {
    height: 110px;
  }
}

.SelectedBox {
  background-color: #f1f5fb;
  border: 1px solid #0089ff;
}
.checkboxs {
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: #d3d4d8 1px solid;
  border-radius: 5px;
  margin-right: 10px;
  border: #0089ff 1px solid;
  color: #fff;
  background-color: #0089ff;
}
.Selectednum {
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 10px;
  font-size: 12px;
  border: #0089ff 1px solid;
  color: #fff;
  background-color: #0089ff;
}

.optionsconcent {
  height: 35px;
  width: 1000px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  margin-bottom: 10px;
  cursor: pointer;
  .concentleft {
    display: flex;
    align-items: center;
    font-size: 14px;
    .yuexi {
      width: 23px;
      height: 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: #d3d4d8 1px solid;
      border-radius: 50%;
      margin-right: 10px;
      color: #777f86;
      font-size: 12px;
    }
    .yuexicheckbox {
      width: 23px;
      height: 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: #d3d4d8 1px solid;
      border-radius: 5px;
      margin-right: 10px;
      color: #777f86;
      font-size: 12px;
    }
  }
}
.title {
  margin: 20px 0;
  font-size: 16px;
}
.scors {
  font-size: 12px;
  color: #aca4ab;
  margin: 0 10px;
}
.QuestionsTyoe {
  display: flex;
  align-items: center;
  .Type {
    height: 21px;
    width: 80px;
    border: 1px #3377f9 solid;
    display: flex;
    align-items: center;
    border-radius: 5px;
    overflow: hidden;
    font-size: 13px;
    .keynum {
      width: 30%;
      height: 100%;
      background-color: #3377f9;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .typetitle {
      flex: 1;
      height: 100%;
      background-color: #f1f5fb;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #3377f9;
    }
  }
}
.Questions {
  padding: 0 50px;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #fafbfd;
  user-select: none;
  .Questionstoptitle {
    font-size: 20px;
    margin-top: 25px;
  }
  .QuestionsList {
    margin-top: 20px;
    .Questionsli {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      width: 1020px;
      padding-bottom: 20px;
      border-top: 1px #f0f0f0 solid;
      padding-top: 20px;
    }
  }
}
</style>
