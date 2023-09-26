<template>
  <div class="box">
    <el-page-header class="top_dao" @back="goBack">
      <template #content>
        <span class="text-large font-600 mr-3">{{namexue}} </span>
      </template>
    </el-page-header>
    <div class="top_dao">
      <span class="spa">考生姓名:</span><el-input class="text" v-model="ruform.key" placeholder="请输入考生姓名" />
      <span class="spa">状态:</span>
      <el-select v-model="ruform.state" clearable placeholder="请选择">
      <el-option
        v-for="item in optionList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
      </el-select>
      <span class="spa">部门:</span><el-cascader @change="add" v-model="ruform.depid" class="text" :options="options" :props="props" clearable />
      <span class="spa">班级:</span>
      <el-select v-model="ruform.classid" :disabled="disabled" clearable placeholder="请选择">
      <el-option
        v-for="item in clasList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
      </el-select>
      <el-button class="but" type="primary" @click="search">查询</el-button>
    </div>
    <TableangPage
    :loading="loading"
    :TableData="tableData" 
    :tableColums="tableColum"
    :total="total"
    @sonhandleCurrentChange="handleCurrentChange"
    @sonhandleSizeChange="handleSizeChange"
    >
      <template v-slot:shijian="data">
        {{ data.data.addtime.substring(0,16) }}
      </template>
      <template  v-slot:wei="scope">
        <div style="color: red;" v-if="scope.data.state=='未阅卷'">
        {{ scope.data.state }}
        </div>
        <div style="color: #2c6ce2;" v-if="scope.data.state=='已阅卷'">
          {{ scope.data.state }}
        </div>
      </template>
      <template #actions="slotname: any">
        
        
      <el-button type="primary" size="small" link @click="open(slotname.data)">阅卷</el-button>
          
      </template>
    </TableangPage>
    <!-- 抽屉 -->
      <el-drawer class="drawers" v-model="drawer" :title="`${marginState.name}${'的试卷'}`" :before-close="handleClose" >
        <div class="ti_box" v-for="(item,index) in paperdata" :key="index">
          <div class="ti_top">{{index+1}}  、 {{ item.type }}<span class="tex_hui">分值：{{ item.scores }}</span></div>
          <div class="ti_mu">{{ item.title.replace(/\[\]/g, '_____')}}</div>
          <div class="huida">回答：</div>
          <div class="ti_da">
            <el-form :inline="true" ref="ruleFormRef" :model="paperdata" status-icon class="demo-form-inline">
              <div class="tiTop">
                <el-form-item  class="wenben" label="打分:" :rules="Rules(item.scores)" :prop="'['+index+']'+ '.studentscores'">
                  <el-input class="textsfne" v-model="item.studentscores" />
                </el-form-item>
              </div>
              <el-form-item  class="wenben" label="批注:">
                <el-input
                  v-model="item.comments"
                  maxlength="30"
                  show-word-limit
                  type="textarea"
                />
              </el-form-item>
            </el-form>
            
          </div>
        </div>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="cancelClick">取消</el-button>
            <el-button type="primary" @click="confirmClick()">阅卷完毕</el-button>
          </div>
        </template>
      </el-drawer>
      
  </div>
</template>

<script setup lang="ts">
import TableangPage from '@/components/TableangPage.vue'
import {DepartmentList} from '@/assets/api/teacher/teacher'
import {studentlist,classeslist,queslist,studentanswer} from '@/assets/api/Exam/Exam'
import { ref , reactive, toRefs} from 'vue'
import { useRouter ,useRoute} from 'vue-router'
import type { Examcans,classdata } from '@/assets/TSinterface/Exam';
import{succesMsg,errorMsg,} from '@/untils/msg'
import { ElMessageBox } from 'element-plus';
let router = useRouter()
let loading = ref<boolean>(true)
let route: any = useRoute()
const goBack = () => {
  router.push('/SystemMenu/exam')
}
const Data = reactive({
  quertionData:{}
})
const {quertionData} = toRefs(Data)
const closeDrawer = (val:any)=>{
  isShows.value = val
}


// 状态
const optionList = [
  {
    value: '已阅卷',
    label: '已阅卷',
  },
  {
    value: '未阅卷',
    label: '未阅卷',
  },
  
]
// 班级
const clasList: any = ref([])
// 部门
let options:any = ref([])
const props = {
  value:'id',
  label:'name',
  children:'children',
  // checkStrictly: true, //点击单选框选中改点击整行选中
 emitPath: false //只获取级联选
}
// 部门列表
const DeparList = async ()=>{
  let red:any = await DepartmentList().catch(()=>{})
  if(red?.errCode==10000){
    options.value = red.data.list
  }

}
DeparList()
// 所传的参数
let namexue =route.query.namexue
let ruform = reactive<Examcans>({
  page: 1,
  psize: 10,
  testid: route.query.id,
  key: '',
  depid: 0,
  classid: '',
  state: '',
  pass: 0,
  pastscores: 0
})
  // 考试学生数据
const tableColum = reactive([
    {
      label: '姓名',
      prop: 'name',
      // width: '150'
    },
    {
      label: '班级',
      prop: 'classname',
      // width: '150'
    },
    {
      label: '分数',
      prop: 'scores',
      // width: '150'
    },
    {
      label: '考试时间',
      isslot: true,
      slotname: 'shijian',
      // width: '120'
    },
    {
      label: '状态',
      isslot: true,
      slotname: 'wei'
      // prop: 'state',
    },
    {
    label: '操作',
    slotname: 'actions',
    isslot: true
  }
])
// 班级
let form = reactive<classdata>({
  page: 1,
  psize: 1000,
  key: '',
  depid: 0,
})
const classesdata = async ()=>{
  let red = await classeslist(form).catch(()=>{})
  if(red?.errCode==10000){
    clasList.value = red.data.list 
  }
}

//部门change事件
let disabled = true
const add = async (val: any) => {
  if(val){
    disabled = false
  }else{
    disabled = true
  }
 ruform.depid = val
 form.depid = val
//  班级调用
 classesdata()
}
let tableData: any = ref([])
let total = ref(0)
// 搜索
const search = ()=>{

  loading.value = true
  studentlists()
}
// 考生列表
const studentlists = async ()=>{
  let red = await studentlist(ruform).catch(()=>{})
  if(red?.errCode==10000){
    tableData.value = red.data.list
    total.value = red.data.counts  
    loading.value = false
  }
  
}
studentlists()
// 分页
const handleSizeChange = (val: number) => {
  loading.value = true
  ruform.psize = val
  studentlists()
}
const handleCurrentChange = (val: number) => {
  loading.value = true
  ruform.page = val
  studentlists()
}
// 阅卷
const drawer = ref(false)
const isShows = ref(false)
const open = (val: any)=>{
  isShows.value = true

  drawer.value = true
  marginState.name = val.name
  marginState.testid = route.query.id
  marginState.studentid = val.id

  paperlist()

}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认要退出吗？')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
// 取消
function cancelClick() {
  drawer.value = false
  // loading.value = true

}
// 阅卷完毕
const confirmClick = async ()=>{
  let PassworData = []
  // 接口需要传的参数名称吧值重新赋给这个参数
  PassworData = paperdata.value.map((item:any)=>({...item,scores:item.studentscores}))
  drawer.value = false
  let red = await studentanswer(PassworData).catch(()=>{})
  // loading.value = true

  if(red?.errCode==10000){
    succesMsg('您已经判完卷了')
      loading.value = true

  }
  studentlists()
}
// 阅卷传参
const marginState = reactive<any>({
  name:'',
  testid:0,
  studentid:0,
})
let paperdata:any = ref([])
// 试卷列表
const paperlist = async ()=>{
  let red = await queslist(marginState).catch(()=>{})
  if(red?.errCode==10000){
    paperdata.value = red.data.list
  }
  
  
}
// 动态表单验证
let Atomicsl = (rule: any, value: any, callback: any) => {
  let max = parseInt(rule.maxE)
  let val = parseInt(value)
  if (isNaN(val)) {
    callback(new Error('请打分'))
    return false
  } else if (val > max || val < 0) {
    return callback(new Error('分数不能小于0,大于' + max))
  }else {
    callback()
  }
}
let Rules = (e: any) => {
  return [{ validator:Atomicsl, maxE: e, trigger: 'blur' }]
}

</script>

<style scoped lang="less">
.top_dao{
  margin-bottom: 1%;
}
.text{
  width: 10%;
  margin-right: 1%;
}
.spa{
  margin-right: 1%;
  margin-left: 1%;
}
.but{
  margin-left: 1%;
}
::v-deep .drawers{
  width: 50% !important;
}
.ti_top{
  margin-bottom: 2%;
}
.tex_hui{
  margin-left: 2%;
  color: rgb(167, 160, 160);
}
.ti_mu{
  margin-bottom: 3%;
}
.ti_da{
  width: 100%;
  // height: 200px;
  background-color:  #f7f6f6;
}
.tiTop{
  margin-top: 2%;
  padding-top: 2%;
}
.pi{
  margin-right: 1%;
  margin-left: 1%;
  padding-top: 2%;
}
.wenben{
  margin-left: 1%;
  padding-top: 2%;
  // margin-bottom: 2%;
  padding-bottom: 2%;
  width: 50%;
}
.textsfne{
  width: 80px;
}
</style>