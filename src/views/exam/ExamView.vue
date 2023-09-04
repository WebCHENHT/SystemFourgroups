<template>
  <div class="box">
    <div class="top_ter">
      <div class="ter">阅卷管理</div>
     
    </div>
    <div class="watchInput">
      <span class="">关键字</span><el-input class="text" v-model="ruform.key" placeholder="请输入关键字" />
    <el-button class="but" type="primary" @click="sou(ruform)">搜索</el-button>
    </div>
    <TableangPage 
    :TableData="tableData" 
    :tableColums="tableColum"
    :total="total"
    @sonhandleCurrentChange="handleCurrentChange"
    @sonhandleSizeChange="handleSizeChange"
    >
    <template #time="{ data }">
      <div>
        {{
          data.begintime === null && data.endtime === null
            ? '不限'
            : `${data.begintime}至${data.endtime}`
        }}
      </div>
    </template>
      <template v-slot:zuo="scope">
        <el-button type="primary" size="small" @click="tiao(scope.data)" link v-if="scope.data.incomplete == 0">查看</el-button>
        <el-button type="primary" size="small" @click="tiao(scope.data)" link v-if="scope.data.incomplete !== 0">阅卷</el-button>
          
      </template>
    </TableangPage>
  </div>  
  </template>
  <script setup lang="ts">
  import { ref, reactive } from 'vue'
  import {TestLists} from '@/assets/api/Exam/Exam'
  import TableangPage from '@/components/TableangPage.vue'
  import { succesMsg } from '@/untils/msg'
  import{ useRouter } from 'vue-router'
  let router = useRouter()
  // 阅卷数据
  const tableColum = reactive([
    {
      label: '考试名称',
      prop: 'title',
      // width: '150'
    },
    {
      label: '考试说明',
      prop: 'info',
      // width: '150'
    },
    {
      label: '题量',
      prop: 'subjectnum',
      // width: '150'
    },
    {
      label: '考试人数',
      prop: 'studentcounts',
      // width: '120'
    },
    {
      label: '未判人数',
      prop: 'incomplete',
      // width: '120'
    },
    {
      label: '开放时间',
      isslot: true,
      slotname: 'time'
    },
    {
      label: '操作',
      slotname: 'zuo',
      isslot: true,
    },
  ])
// 约束类型
interface T {
  page: number
  psize: number
  ismy: number
  state: number
  key: string
  begindate: string
  admin: string
  enddate: string
  isread:number
}
// 所传的参数
let ruform = reactive<T>({
  page: 1,
  psize: 10,
  key: '',
  ismy:0,
  state:0,
  begindate:'',
  admin:'',
  enddate: '',
  isread:2,

})
// 搜索
const sou =async () => {
  tealist()
}
let total = ref(0)
  // 阅卷列表
  let tableData: any = ref([])
  const tealist = async()=>{
    let res:any = await TestLists(ruform)
    console.log(111,res);
   
    tableData.value = res.data.list
    total.value = res.data.counts
    
    // console.log(22,tableData);
    
  }
  tealist()
  // 分页
  const handleSizeChange = (val: number) => {
    ruform.psize = val
    tealist()
  }
  const handleCurrentChange = (val: number) => {
    ruform.page = val
    tealist()
  }
  // 跳转
  const tiao = (val:any)=>{
    console.log(val);
    
    router.push({
      path:'SystemMenu/exam/ExamsTudent',
      query: {
        id: val.id,
        namexue:val.title
      }
    })
  }
 
  </script>
  <style scoped lang="less">
  .box{
    width: 100%;
    height: 100%;
    .top_ter{
      display: flex;
      justify-content: space-between;
      .ter{
        font-size: 20px;
      }
    }
    .watchInput{
      margin-top: 1%;
      margin-bottom: 1%;
      // margin-right: 1%;
      span{
        font-size: 15px;
        margin-right: 1%;
      }
      .text{
        width: 10%;
        margin-right: 1%;
      }
    }
    .but{
      margin-left: 1%;
    }
  }
  </style>
  