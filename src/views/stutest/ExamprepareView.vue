<template>
  <div>
    <div class="examPrepareBody">
      <div class="Examsbox">
        <div class="toptitle">
          <el-page-header @back="goBack">
            <template #content>
              <span class="text-large font-600 mr-3"> {{ TestgetLists.title }} </span>
            </template>
          </el-page-header>
        </div>
        <div class="toptiem">
          <div class="toptitembox">
            <p>开放时间</p>
            <p class="time">
              {{
                TestgetLists.begintime !== null && TestgetLists.endtime !== null
                  ? `${dayjs(TestgetLists.begintime).format('YYYY-MM-DD HH:mm')}至${dayjs(
                      TestgetLists.endtime
                    ).format('YYYY-MM-DD HH:mm')}`
                  : '不限'
              }}
            </p>
          </div>
        </div>
        <div class="testlibox">
          <div class="fraction">
            <div class="titlenum">题目数量</div>
            <div class="num">{{ TestgetLists.subjectnum }}题</div>
          </div>
          <div class="solid"></div>
          <div class="fraction">
            <div class="titlenum">考试时长</div>
            <div class="num">
              {{
                TestgetLists.limittime === undefined
                  ? ''
                  : TestgetLists.limittime === 0
                  ? '不限'
                  : `${TestgetLists.limittime}min`
              }}
            </div>
          </div>
          <div class="solid"></div>
          <div class="fraction">
            <div class="titlenum">考试总分</div>
            <div class="num">{{ TestgetLists.scores }}分</div>
          </div>
          <div class="solid"></div>
          <div class="fraction">
            <div class="titlenum">通过分数</div>
            <div class="num">{{ TestgetLists.pastscores }}分</div>
          </div>
        </div>

        <div class="testbuttoms">
          <div v-if="TestgetLists.begintime !== null && TestgetLists.endtime !== null">
            <el-button
              @click="Figures"
              type="primary"
              :disabled="resan > 300 ? true : resan !== 0 ? true : false"
            >
              {{
                resan > 300
                  ? '未到考试时间'
                  : resan !== 0
                  ? dayjs.duration(resan, 'seconds').format('mm:ss')
                  : '开始考试'
              }}
            </el-button>
          </div>

          <div v-else>
            <el-button type="primary" @click="Figures"> 开始考试 </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
// 导入 duration 插件
dayjs.extend(duration)
import { TestGet } from '@/assets/api/TestList'
import {  ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
let router = useRouter()
let route = useRoute()
let TestgetLists: any = ref([])
//点击开始考试跳转答题页面携带id
const Figures = () => {
  router.push({
    path: '/SystemMenu/stutest/Questions',
    query: {
      id: route.query.id
    }
  })
}
let interv: any = null
let resan = ref(0)
const TestGetData = async () => {
  let res = await TestGet({
    id: route.query.id as unknown as number
  }).catch(() => {})
  if (res?.errCode === 10000) {
    TestgetLists.value = res.data as any
    let begintime = dayjs(dayjs(TestgetLists.value.begintime).format('YYYY-MM-DD HH:mm')).unix()
    let currenttime = dayjs(dayjs(TestgetLists.value.currenttime).format('YYYY-MM-DD HH:mm')).unix()
    if (begintime > currenttime) {
      resan.value = begintime - currenttime
      interv = setInterval(() => {
        resan.value--
        if (resan.value <= 0) {
          clearInterval(interv)
        }
      }, 1000)
    }
  }
}
TestGetData()

const goBack = () => {
  router.push('/SystemMenu/stutest')
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
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
.Examsbox {
  width: 650px;
  background-color: #fff;
  padding: 55px 65px;
}
.toptitle {
}
.toptiem {
  border-bottom: #e7e4e4 1px solid;
  margin-top: 20px;
  .toptitembox {
    padding: 0 50px 25px;
    font-size: 16px;
    .time {
      font-size: 14px;
      margin-top: 8px;
    }
  }
}
.testlibox {
  padding: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .fraction {
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .titlenum {
      font-size: 14px;
      color: #999b9d;
    }
    .num {
      font-size: 28px;
      margin-top: 8px;
    }
  }
}
.solid {
  width: 1px;
  height: 70px;
  background-color: #e7e4e4;
}
.testbuttoms {
  width: 100%;
  display: flex;
  justify-content: center;
}
.el-button {
  width: 240px;
  height: 45px;
}
</style>
