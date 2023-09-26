<template>
  <div class="viewtest">
    <div class="answerSheet">
      <div class="titles">答题卡</div>
      <div class="is">
        <div class="colorbox"></div>
        <span>正确</span>
        <div class="wecolorbox"></div>
        <span>错误</span>
      </div>
      <div class="answerlist">
        <div
          v-for="(item, index) in DrawerDatas.questions"
          :key="index"
          @click="modians(index)"
          :class="item.studentscores !== 0 ? 'boxs' : 'Errorboxs'"
        >
          {{ index + 1 }}
        </div>
      </div>
    </div>
    <div class="totitle">
      <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3"> {{ DrawerDatas.title }} </span>
        </template>
      </el-page-header>
    </div>
    <div style="width: 130vh">
      <TestBView :DrawerDatas="DrawerDatas"></TestBView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TestGetForResult } from '@/assets/api/TestList'
import TestBView from '@/components/TestBView.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

let route = useRoute()
let router = useRouter()
const goBack = () => {
  router.push({
    path: '/SystemMenu/stutest/examresults',
    query: {
      id: route.query.testid
    }
  })
}
let DrawerDatas: any = ref([])
const result = async () => {
  let res = await TestGetForResult({
    testid: route.query.testid as unknown as number
  }).catch(() => {})
  if (res?.errCode === 10000) {
    DrawerDatas.value = res.data
  }
}
result()
const modians = (index: number) => {
  document
    .getElementById(`id${index}`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
}
</script>

<style lang="less" scoped>
.answerSheet {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 290px;
  padding: 25px 24px;
  background-color: #fff;
  .titles {
    font-size: 20px;
    font-weight: 600;
  }
  .is {
    display: flex;
    align-items: center;
    margin-top: 25px;
    .colorbox {
      width: 20px;
      height: 20px;
      background-color: #eefaf5;
    }
    span {
      margin: 0 16px 0 10px;
    }
    .wecolorbox {
      width: 19px;
      height: 19px;
      border: 1px solid #e9e9e9;
      background-color: #fcf2f0;
    }
  }
}
.xuzix {
  background-color: #fafbfd;
}
.viewtest {
  padding: 0 50px;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #fafbfd;
}
.totitle {
  padding-top: 25px;
  padding-bottom: 20px;
  /deep/.el-page-header__icon {
    margin-right: 5px !important;
  }
  /deep/.el-icon {
    font-size: 20px;
  }
}
.answerlist {
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  .boxs {
    cursor: pointer;
    width: 35px;
    height: 30px;
    border-radius: 3px;
    background-color: #eefaf5;
    color: #97d3af;
    border: 1px solid #e3e3e3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    margin-bottom: 6px;
    font-size: 14px;
  }
  .Errorboxs {
    cursor: pointer;
    width: 35px;
    height: 30px;
    border-radius: 3px;
    background-color: #fcf2f0;
    color: #e9747f;
    border: 1px solid #e3e3e3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    margin-bottom: 6px;
    font-size: 14px;
  }
}
</style>
