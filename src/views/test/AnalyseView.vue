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
        <div>考试时间：时间不限</div>
      </div>
    </div>
    <div style="width: 100%; display: flex; justify-content: space-around">
      <EcharTsVue
        ref="Echars"
        style="min-width: 450px; height: 350px; -webkit-user-drag: none; user-select: none"
      ></EcharTsVue>
      <EcharTsVue
        ref="Echarsa"
        style="min-width: 450px; height: 350px; -webkit-user-drag: none; user-select: none"
      ></EcharTsVue>
    </div>
    <div>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="学员统计" name="first" style="transform: translateX(35px)">
          <el-form :model="StudentTestform">
            <el-form-item label="学员姓名">
              <el-input v-model="StudentTestform.key" placeholder="请输入考试名称" clearable />
            </el-form-item>
            <el-form-item label="部门">
              <el-cascader
                v-model="Departmentvalue"
                :options="Departmentoptions"
                :props="{ label: 'name', value: 'id', children: 'children' }"
                @change="handleChange"
                placeholder="请选择"
                clearable
              />
            </el-form-item>
            <el-form-item label="班级">
              <el-select
                v-model="StudentTestform.classid"
                clearable
                placeholder="请选择"
                :disabled="Classesis"
              >
                <el-option
                  v-for="item in Classesoptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="状态" style="width: 150px">
              <el-select v-model="StudentTestform.state" clearable placeholder="请选择">
                <el-option
                  v-for="item in Stateoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="chAkans"> 查询</el-button>
              <TestExpor
                :url="StudentExportExcel"
                :testid="route.query.id"
                :wenjis="systemAnalyObj.title + '的成绩单'"
                :name="'导出'"
              ></TestExpor>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <TableangPage
        :TableData="Studentdatas"
        :tableColums="tableColums"
        :loading="loading"
        :showPage="false"
      >
        <template #scores="{ data }">
          <div style="color: #67c23a" v-if="data.scores >= 60">已通过</div>
          <div style="color: #f56c6c" v-else>未通过</div>
        </template>
        <template #caozuo="{ data }">
          <el-button type="primary" link @click="AchahStudent(data)">查看</el-button>
        </template>
      </TableangPage>
    </div>
  </div>
  <SystemDrawer
    ref="drawer"
    v-if="Drawertableisas"
    @MySystemDrawerClose="MySystemDrawerClose"
  ></SystemDrawer>
</template>
<script setup lang="ts">
import {
  TestAnalyse,
  DepartmentList,
  ClassesList,
  StudentTest,
  TestGetForResult,
  StudentExportExcel
} from '@/assets/api/TestList'
import { nextTick, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import EcharTsVue from '@/components/EcharTs.vue'
import TableangPage from '@/components/TableangPage.vue'
import SystemDrawer from '@/components/SystemDrawer.vue'
import TestExpor from '@/components/TestExpor.vue'
let route: any = useRoute()
let router = useRouter()
let loading = ref(true)
let Drawertableisas = ref(false)
const goBack = () => {
  router.push('/SystemMenu/test')
}
//学员统计
const StudentTestform = reactive({
  page: 1,
  psize: 10,
  key: '',
  depid: '',
  classid: '',
  state: '',
  testid: route.query.id
})
//学员状态选则
let Stateoptions = ref([
  {
    value: '0',
    label: '所有'
  },
  {
    value: '1',
    label: '通过'
  },
  {
    value: '2',
    label: '未通过'
  }
])
//获取学生列表
let tableColums = ref([
  {
    label: '学员姓名',
    prop: 'name'
  },
  {
    label: '部门',
    prop: 'depname'
  },
  {
    label: '班级',
    prop: 'classname'
  },
  {
    label: '通过情况',
    isslot: true,
    slotname: 'scores'
  },
  {
    label: '用时',
    prop: 'scores'
  },
  {
    label: '考试时间',
    prop: 'stuBeginTime'
  },
  {
    label: '交卷时间',
    prop: 'stuEndTime'
  },
  {
    label: '操作',
    isslot: true,
    slotname: 'caozuo'
  }
])

//点击学员列表查看
//点击查询
const chAkans = () => {
  loading.value = true
  Studentdata()
}
//控制抽屉
let drawer = ref()

//给抽屉传数据
const AchahStudent = async (data: any) => {
  Drawertableisas.value = true
  nextTick(async () => {
    let res = await TestGetForResult({
      testid: route.query.id,
      studentid: data.id
    }).catch(()=>{})
    if (res?.errCode === 10000) {
      drawer.value.DrawerDatas = res.data
      drawer.value.Drawertableis = true
    }
  })
}
//关闭抽屉
const MySystemDrawerClose = () => {
  Drawertableisas.value = false
}
//获取学员列表
let Studentdatas = ref<any[]>([])

const Studentdata = async () => {
  let res = await StudentTest(StudentTestform).catch(()=>{})

  if (res?.errCode === 10000) {
    loading.value = false
    Studentdatas.value = res.data.list
  }
}
Studentdata()
//标签页
const activeName = ref('first')
//部门级联选择框
const Departmentvalue = ref([])
const Departmentoptions = ref<any[]>([])
const Departmentcascader = async () => {
  let res = await DepartmentList().catch(()=>{})
  if (res?.errCode === 10000) {
    Departmentoptions.value = res.data.list
  }
}
Departmentcascader()
//控制班级禁用
let Classesis = ref(true)
//获取班级数据
let Classesoptions = ref<any[]>([])
const handleChange = async (value: []) => {
  if (value !== null) {
    StudentTestform.classid = ''
    Classesoptions.value = []
    let depid = value[value.length - 1]
    StudentTestform.depid = depid
    let res = await ClassesList({
      depid: depid
    }).catch(()=>{})
    if (res?.errCode === 10000) {
      Classesoptions.value = res.data.list
      Classesis.value = false
    }
  } else {
    Classesis.value = true
    StudentTestform.classid = ''
    Classesoptions.value = []
  }
}
//Echars图表
let Echars = ref()
let Echarsa = ref()

let systemAnalyObj = ref<any>({})
const systemAnalysedata = async () => {
  let res = await TestAnalyse({
    testid: route.query.id
  }).catch(()=>{})

  if (res?.errCode === 10000) {
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
/deep/.el-tabs__nav {
  width: 56px !important;
  transform: translateX(35px) !important;
}

.el-form-item {
  display: inline-flex;
  vertical-align: middle;
  margin-right: 32px;
}
/deep/.el-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  line-height: 32px;
  position: relative;
  font-size: var(--font-size);
  min-width: 0;
}
</style>
