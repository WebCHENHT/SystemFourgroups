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
        <div v-if="ishow">
          <div
            :class="resultdata.studentScores >= resultdata.pastscores ? 'stampBox' : 'Errorboxs'"
          >
            <div
              :class="resultdata.studentScores >= resultdata.pastscores ? 'soumnus' : 'Errormnus'"
            >
              {{ resultdata.studentScores >= resultdata.pastscores ? '已通过' : '未通过' }}
            </div>
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
          <div v-if="ishow">
            <div v-if="resultdata.studentScores >= resultdata.pastscores">
              <div class="suossnum">{{ resultdata.studentScores }}</div>
              <div class="suosstitle">恭喜，通过考试</div>
            </div>
            <div v-else>
              <div class="noPassNum">{{ resultdata.studentScores }}</div>
              <div class="noPasserror">很可惜，未通过</div>
            </div>
          </div>
          <div class="load" v-else>待阅卷</div>
        </div>

        <table>
          <tr class="toplis">
            <td></td>
            <td>
              单选题<span v-if="getstixingsi('单选题') > 0">({{ getstixingsi('单选题') }})</span>
            </td>
            <td>
              多选题<span v-if="getstixingsi('多选题') > 0">({{ getstixingsi('多选题') }})</span>
            </td>
            <td>
              判断题<span v-if="getstixingsi('判断题') > 0">({{ getstixingsi('判断题') }})</span>
            </td>
            <td>
              填空题<span v-if="getstixingsi('填空题') > 0">({{ getstixingsi('填空题') }})</span>
            </td>
            <td>
              问答题<span v-if="getstixingsi('问答题') > 0">({{ getstixingsi('问答题') }})</span>
            </td>
          </tr>
          <tr>
            <td>正确数</td>
            <td>{{ correctNumber('单选题') > 0 ? `${correctNumber('单选题')}题` : '--' }}</td>
            <td>{{ correctNumber('多选题') > 0 ? `${correctNumber('多选题')}题` : '--' }}</td>
            <td>{{ correctNumber('判断题') > 0 ? `${correctNumber('判断题')}题` : '--' }}</td>
            <td v-if="resultdata.result !== '待阅卷'">
              {{ correctNumber('填空题') > 0 ? `${correctNumber('填空题')}题` : '--' }}
            </td>
            <td v-if="resultdata.result !== '待阅卷'">
              {{ correctNumber('问答题') > 0 ? `${correctNumber('问答题')}题` : '--' }}
            </td>
            <td rowspan="2" v-if="resultdata.result === '待阅卷'" style="color: red">待阅卷</td>
            <td rowspan="2" v-if="resultdata.result === '待阅卷'" style="color: red">待阅卷</td>
          </tr>
          <tr>
            <td>错误数</td>
            <td>{{ NumberofErrors('单选题') > 0 ? `${NumberofErrors('单选题')}题` : '--' }}</td>
            <td>{{ NumberofErrors('多选题') > 0 ? `${NumberofErrors('多选题')}题` : '--' }}</td>
            <td>{{ NumberofErrors('判断题') > 0 ? `${NumberofErrors('判断题')}题` : '--' }}</td>
            <td v-if="resultdata.result !== '待阅卷'">
              {{ NumberofErrors('填空题') > 0 ? `${NumberofErrors('填空题')}题` : '--' }}
            </td>
            <td v-if="resultdata.result !== '待阅卷'">
              {{ NumberofErrors('问答题') > 0 ? `${NumberofErrors('问答题')}题` : '--' }}
            </td>
          </tr>
        </table>
        <div class="succssbutttons" v-if="ishow">
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
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
let route = useRoute()
let router = useRouter()
let resultdata = ref<any>([])
let ishow = ref(false)
let boxs = ref(false)
watch(
  () => resultdata.value,
  (a, b) => {
    if (a.result === '待阅卷') {
      ishow.value = false
    } else {
      ishow.value = true
    }
  }
)
//查看试卷
const view = () => {
  router.push({
    path: '/SystemMenu/stutest/ViewthetestpaperVview',
    query: {
      testid: route.query.id
    }
  })
}

//获取试卷结果
const TestGetForResultdata = async () => {
  let res = await TestGetForResult({
    testid: route.query.id as unknown as number
  })
  if (res.errCode === 10000) {
    console.log(res.data)
    resultdata.value = res.data as any
    boxs.value = true
  }
}
TestGetForResultdata()

const getstixingsi = (name: string) => {
  let arr: any = resultdata.value.questions
  if (Array.isArray(arr)) {
    if (name === '单选题') {
      return arr.filter((item: any) => item.type === '单选题').length as any
    }
    if (name === '多选题') {
      return arr.filter((item: any) => item.type === '多选题').length as any
    }
    if (name === '判断题') {
      return arr.filter((item: any) => item.type === '判断题').length as any
    }
    if (name === '填空题') {
      return arr.filter((item: any) => item.type === '填空题').length as any
    }
    if (name === '问答题') {
      return arr.filter((item: any) => item.type === '问答题').length as any
    }
  }
}
const correctNumber = (name: any) => {
  let arr: any[] = resultdata.value.questions
  if (Array.isArray(arr)) {
    if (name === '单选题') {
      return arr
        .filter((item: any) => item.type === '单选题')
        .filter((item: any) => item.studentscores !== null && item.studentscores !== 0)
        .length as any
    }
    if (name === '多选题') {
      return arr
        .filter((item: any) => item.type === '多选题')
        .filter((item: any) => item.studentscores !== null && item.studentscores !== 0)
        .length as any
    }
    if (name === '判断题') {
      return arr
        .filter((item: any) => item.type === '判断题')
        .filter((item: any) => item.studentscores !== null && item.studentscores !== 0)
        .length as any
    }
    if (name === '填空题') {
      return arr
        .filter((item: any) => item.type === '填空题')
        .filter((item: any) => item.studentscores !== null && item.studentscores !== 0)
        .length as any
    }
    if (name === '问答题') {
      return arr
        .filter((item: any) => item.type === '问答题')
        .filter((item: any) => item.studentscores !== null && item.studentscores !== 0)
        .length as any
    }
  }
}
const NumberofErrors = (name: any) => {
  let arr: any[] = resultdata.value.questions
  if (Array.isArray(arr)) {
    if (name === '单选题') {
      return arr
        .filter((item: any) => item.type === '单选题')
        .filter((item: any) => {
          return item.studentscores === null || item.studentscores === 0
        }).length as any
    }
    if (name === '多选题') {
      return arr
        .filter((item: any) => item.type === '多选题')
        .filter((item: any) => item.studentscores === null || item.studentscores === 0)
        .length as any
    }
    if (name === '判断题') {
      return arr
        .filter((item: any) => item.type === '判断题')
        .filter((item: any) => item.studentscores === null || item.studentscores === 0)
        .length as any
    }
    if (name === '填空题') {
      return arr
        .filter((item: any) => item.type === '填空题')
        .filter((item: any) => item.studentscores === null || item.studentscores === 0)
        .length as any
    }
    if (name === '问答题') {
      return arr
        .filter((item: any) => item.type === '问答题')
        .filter((item: any) => item.studentscores === null || item.studentscores === 0)
        .length as any
    }
  }
}
const goBack = () => {
  router.push({
    path: '/SystemMenu/stutest'
  })
}
</script>

<style lang="less" scoped>
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
  .Errormnus {
    width: 86px;
    height: 86px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    border: 4px solid rgba(255, 0, 0, 0.197);
    color: red;
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
  .soumnus {
    width: 86px;
    height: 86px;
    border-radius: 50%;
    border: #14bd8229 solid 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    color: #14bd83;
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
.toplis {
  background-color: rgb(251, 252, 252);
  height: 45px;
}
table {
  width: 100%;
  border-top: 1px solid rgb(241, 241, 241);
  border-left: 1px solid rgb(241, 241, 241);
  border-collapse: collapse;
  margin-top: 30px;
  tr {
    height: 60px;
    td {
      border-bottom: 1px solid rgb(241, 241, 241);
      border-right: 1px solid rgb(241, 241, 241);
      text-align: center;
      font-size: 14px;
    }
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
  .suosstitle {
    font-size: 21px;
  }
  .noPassNum {
    display: flex;
    justify-content: center;
    font-size: 68px;
    color: red;
    margin: 15px 0px;
  }
  .noPasserror {
    font-size: 21px;
  }
}
</style>
