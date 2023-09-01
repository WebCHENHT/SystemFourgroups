<template>
  <div style="margin-top: 20px">
    <el-page-header @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3">数据分析：{{ systemAnalyObj.title }} </span>
      </template>
    </el-page-header>
    <div class="Analytitle">
      <div class="Titleboxs">
        <div>总分：{{ systemAnalyObj.scores }}</div>
      </div>
      <div class="titleboxs">
        <div>通过分数：{{ systemAnalyObj.pastscores }}</div>
      </div>
      <div class="titleboxs">
        <div>考试时长：0分钟</div>
      </div>
      <div style="padding-left: 20px">
        <div>考试时间：不限</div>
      </div>
    </div>
    <div style="width: 100%; display: flex; justify-content: space-around">
      <EcharTsVue
        ref="Echars"
        style="width: 450px; height: 350px; -webkit-user-drag: none; user-select: none"
      ></EcharTsVue>
      <EcharTsVue
        ref="Echarsa"
        style="width: 600px; height: 350px; -webkit-user-drag: none; user-select: none"
      ></EcharTsVue>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TestAnalyse } from '@/assets/api/TestList'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TestAnalyseModel } from '@/assets/TSinterface/SystemTest'
import EcharTsVue from '@/components/EcharTs.vue'
let route: any = useRoute()
let router = useRouter()
const goBack = () => {
  router.push('/SystemMenu/test')
}
//Echars图表
let Echars = ref()
let Echarsa = ref()
let systemAnalyObj = ref<any>({})
const systemAnalysedata = async () => {
  let res = await TestAnalyse({
    testid: route.query.id
  })
  console.log(res)
  if (res.errCode === 10000) {
    systemAnalyObj.value = res.data.model
    let key = Object.keys(res.data.pieItems)
    let value = Object.values(res.data.pieItems)

    Echars.value.getdom({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      color: ['#95d475', '#f89898'],
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: res.data.passCounts.pass, name: '通过' },
            { value: res.data.passCounts.unpass, name: '未通过' }
          ]
        }
      ]
    })
    window.addEventListener('resize', Echars.value.resize)
    Echarsa.value.getdom({
      xAxis: {
        type: 'category',
        data: key
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: value,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    })
    window.addEventListener('resize', Echarsa.value.resize)
  }
}
systemAnalysedata()
</script>

<style lang="less" scoped>
/deep/.el-page-header__icon {
  font-size: 18px;
  margin-right: 6px;
  display: flex;
  align-items: center;
}
.Analytitle {
  margin-top: 20px;
  font-size: 14px;
  display: flex;

  .Titleboxs {
    padding-right: 20px;
    border-right: 1px solid #666;
  }
  .titleboxs {
    padding-left: 20px;
    padding-right: 20px;
    border-right: 1px solid #666;
  }
}
</style>
