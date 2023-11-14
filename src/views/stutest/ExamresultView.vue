<template>
  <div class="examPrepareBody" v-loading="!boxs">
    <div class="box">
      <div v-if="boxs">
        <div class="title">
          <el-page-header @back="goBack">
            <template #content>
              <span class="text-large font-600 mr-3"> {{ resultdata.title }} </span>
            </template>
          </el-page-header>
        </div>
        <div v-if="resultdata.result !== '待阅卷'">
          <div
            :class="{
              stampBox: resultdata.result === '已通过',
              Errorboxs: resultdata.result === '未通过'
            }"
          >
            {{ resultdata.result }}
          </div>
        </div>
        <div class="titmesa">
          <div>
            用时:{{
              dayjs(resultdata.stuEndTime).diff(dayjs(resultdata.studentStartTime), 'seconds') / 60
            }}分钟
          </div>
          <div class="siold"></div>
          <div>交卷时间: {{ resultdata.stuEndTime }}</div>
          <div class="siold"></div>
          <div>试卷总分:{{ resultdata.scores }}分</div>
          <div class="siold"></div>
          <div>通过分数:{{ resultdata.pastscores }}分</div>
        </div>
        <div class="boxNbm">
          <div v-if="resultdata.result !== '待阅卷'">
            <div
              :class="{
                suossnum: resultdata.result === '已通过',
                noPassNum: resultdata.result === '未通过'
              }"
            >
              {{ resultdata.studentScores }}
            </div>
            <div style="font-size: 21px">
              {{
                resultdata.studentScores >= resultdata.pastscores
                  ? '恭喜，通过考试'
                  : '很可惜，未通过'
              }}
            </div>
          </div>
          <div class="load" v-else>待阅卷</div>
        </div>
        <div class="tebleboxs">
          <div class="tebleli">
            <div></div>
            <div>正确数</div>
            <div>错误数</div>
          </div>
          <div class="tebleli" v-for="(item, index) in questionTypes" :key="index">
            <div>
              {{ item.name }} <span v-show="item.counts">({{ item.counts }})</span>
            </div>
            <div :class="{ heshei: item.error === '' }">
              {{ item.correct }}<span v-show="item.correct !== '--'">题</span>
            </div>
            <div v-if="item.error !== ''">
              {{ item.error }}<span v-show="item.error !== '--'">题</span>
            </div>
          </div>
        </div>
        <div class="succssbutttons" v-if="resultdata.result !== '待阅卷'">
          <el-button
            :style="
              resultdata.studentScores >= resultdata.pastscores
                ? 'background-color: rgb(20, 189, 131)'
                : 'background-color: red;    border: red 1px solid;'
            "
            @click="view"
            >查看答卷</el-button
          >
        </div>
        <div v-else style="margin-bottom: 60px"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TestGetForResult } from '@/assets/api/TestList'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import dayjs from 'dayjs'
let route = useRoute()
let router = useRouter()
let resultdata = ref<any>([])
let boxs = ref(false)
//查看试卷
const view = () => {
  router.push({
    path: '/SystemMenu/stutest/ViewthetestpaperVview',
    query: {
      testid: route.query.id
    }
  })
}

const questionTypes: any = ref([
  { name: '单选题', counts: 0, correct: 0, error: 0 },
  { name: '多选题', counts: 0, correct: 0, error: 0 },
  { name: '判断题', counts: 0, correct: 0, error: 0 },
  { name: '填空题', counts: 0, correct: 0, error: 0 },
  { name: '问答题', counts: 0, correct: 0, error: 0 }
])
//获取试卷结果
const TestGetForResultdata = async () => {
  let res = await TestGetForResult({
    testid: route.query.id as unknown as number
  }).catch(() => {})
  if (res?.errCode === 10000) {
    resultdata.value = res.data as any
    boxs.value = true

    let arr: any = resultdata.value.questions
    questionTypes.value.forEach((item1: any) => {
      item1.counts = arr.filter((item2: any) => item2.type === item1.name).length
      item1.correct = arr.filter(
        (item2: any) => item2.type === item1.name && item2.scores === item2.studentscores
      ).length

      item1.error = item1.counts - item1.correct

      if (
        resultdata.value.result === '待阅卷' &&
        (item1.name === '填空题' || item1.name === '问答题')
      ) {
        item1.correct = '等待阅卷'
        item1.error = ''
      } else if (item1.counts !== 0) {
        if (item1.correct === 0) {
          item1.correct = '--'
        } else if (item1.error === 0) {
          item1.error = '--'
        }
      } else {
        item1.correct = '--'
        item1.error = '--'
      }
    })
  }
}
TestGetForResultdata()
const goBack = () => {
  router.push({
    path: '/SystemMenu/stutest'
  })
}

let fuuhsah = () => {
  // 监听浏览器的历史记录变化
  window.addEventListener('popstate', function (event) {
    // 判断是否是要返回到指定页面
    if (String(event.state.current).includes('/SystemMenu/stutest/Questions')) {
      // 取消返回操作
      window.history.forward()
    }
  })
}
fuuhsah()
</script>

<style lang="less" scoped>
.heshei {
  height: 100%;
  color: red;
}
.tebleboxs {
  width: 100%;
  border: 1px solid rgb(241, 241, 241);
  margin-top: 30px;
  display: flex;
  .tebleli {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgb(241, 241, 241);
    &:last-child {
      border-right: none;
    }
    div {
      min-height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px rgb(241, 241, 241) solid;
      font-size: 14px;
      padding: 15px;
      &:last-child {
        border-bottom: none;
      }
      &:first-child {
        background-color: rgb(241, 241, 241);
        min-height: 25px;
      }
    }
  }
}
.load {
  font-size: 68px;
  font-weight: 700;
  color: #f39134;
  margin-top: 20px;
  margin-bottom: 30px;
}
.Errorboxs {
  border: 2px solid red;
  position: absolute;
  right: 70px;
  top: 50px;

  border-radius: 50%;
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(340deg);
  color: red;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 4px solid rgba(255, 0, 0, 0.197);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;

    box-sizing: border-box;
  }
}
.stampBox {
  position: absolute;
  right: 70px;
  top: 50px;
  border: 2px solid #14bd83;
  border-radius: 50%;
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(340deg);
  color: #14bd83;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: #14bd8229 solid 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;

    box-sizing: border-box;
  }
}
.succssbutttons {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  .el-button {
    width: 240px;
    height: 45px;
    font-size: 17px;
    color: #fff;
  }
}

.examPrepareBody {
  width: 100%;
  height: 100vh;
  background: url('../../assets/img/kaoshibeijing.jpg') no-repeat;
  background-size: cover;
  overflow: hidden;
  background-position: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 700px;
  padding: 50px 60px 30px;
  background-color: rgb(255, 255, 255);
  position: relative;

  .titmesa {
    margin: 0 10px;
    border-bottom: 1px solid rgb(241, 241, 241);
    height: 35px;
    margin-top: 10px;
    display: flex;
    div {
      font-size: 13px;
      color: rgb(160, 165, 171);
    }
  }
}
.siold {
  width: 1px;
  height: 15px;
  background-color: rgb(153, 155, 157);
  margin: 2px 12px 0px;
  transform: scaleX(0.5);
}
.boxNbm {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .suossnum {
    display: flex;
    justify-content: center;
    font-size: 68px;
    color: rgb(20, 189, 131);
    margin: 15px 0;
  }

  .noPassNum {
    display: flex;
    justify-content: center;
    font-size: 68px;
    color: red;
    margin: 15px 0px;
  }
}
</style>
