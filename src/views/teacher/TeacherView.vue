<template>
<div class="box">
  <div class="top_ter">
    <div class="ter">师资管理</div>
    <div class="terbut">
      <el-button>批量添加</el-button>
      <el-button type="primary" @click="dialogadd = true">添加教资</el-button>
    </div>
  </div>
  <div class="watchInput">
    <span class="">关键字</span><el-input class="text" v-model="ruform.key" placeholder="请输入关键字" />
    <span class="">部门</span><el-cascader @change="add" v-model="ruform.depid" class="text" :options="options" :props="props" clearable />
    <span class="">角色</span>
    <el-select v-model="ruform.pwd" clearable placeholder="请选择">
    <el-option
      v-for="item in optionList"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
  <el-button class="but" type="primary" @click="sou(ruform)">搜索</el-button>
  </div>
  <TableangPage 
  :TableData="tableData" 
  :tableColums="tableColum"
  :total="total"
  @sonhandleCurrentChange="handleCurrentChange"
  @sonhandleSizeChange="handleSizeChange"
  >
    <template #actions="slotname: any">
        <el-button type="primary" size="small" link @click="ChongVisible(slotname.data)">重置密码</el-button>
        <el-button type="primary" size="small" link @click="teachedele(slotname.data)">修改</el-button>
        <!-- <el-button text @click="dele(slotname.data)" link>删除</el-button> -->
        <el-button type="primary" size="small" link @click="open(slotname.data)">删除</el-button>
      </template>
  </TableangPage>
  <!-- 重置密码弹出框 @click="Pass" -->
  <el-dialog
    v-model="dialogVisible"
    title="重置密码"
    width="30%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="姓名:">
       {{ form.name }}
        <!-- <el-input v-model="form.name" /> -->
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.pwd" />
      </el-form-item>
      <el-form-item label="确认密码:">
        <el-input v-model="form.pass" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="Pass">
          确认    
        </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加弹出框 -->
  <el-dialog
    v-model="dialogadd"
    :title="formAdd.id>1?'编辑老师':'添加老师'"
    width="30%">
    <el-form :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="formAdd.name" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formAdd.tel" />
      </el-form-item>
      <el-form-item label="部门">
        <el-cascader v-model="formAdd.depid" class="text" :options="options" :props="props" clearable />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formAdd.roleid" clearable placeholder="请选择">
          <el-option
            v-for="item in optionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="formAdd.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formAdd.pass" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="faAdd">取消</el-button>
        <el-button type="primary" @click="teacheAdd">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import {teacherlist , teacherdelete, teacherchangePass, roleList,DepartmentList,teacherchangeAdd} from '@/assets/api/teacher/teacher'
import TableangPage from '@/components/TableangPage.vue'
import { succesMsg } from '@/untils/msg'
// 密码重置弹出框
let dialogVisible = ref(false)
// 添加弹出框
const dialogadd = ref(false)
// 接连框
let optionList:any = ref([])
// 角色列表
const roleLists = async()=>{
  let red = await roleList(0)
  // console.log(777,red);
  optionList.value = red.data.list
  // console.log(789787,optionList);
}
roleLists()
// 部门
let options:any = ref([])
const props = {
  value:'id',
  label:'name',
  children:'children',
  checkStrictly: true, //点击单选框选中改点击整行选中
 emitPath: false //只获取级联选
}
let ids = ref([])
let lid = ''
//部门change事件
const add = async (val: any) => {
 ids.value = val
 console.log(ids);
 lid = [...ids.value].join(',').slice(0 - 4)
 ruform.depid = lid
 console.log(9696,ruform.depid)
}
// 部门列表
const DeparList = async ()=>{
  let red:any = await DepartmentList()
  options.value = red.data.list
  // console.log(852,red)
}
DeparList()
// 列表数据
const tableColum = reactive([
  {
    label: '姓名',
    prop: 'name',
    // width: '150'
  },
  {
    label: '部门',
    prop: 'depname',
    // width: '150'
  },
  {
    label: '电话',
    prop: 'tel',
    // width: '150'
  },
  {
    label: '角色',
    prop: 'rolename',
    // width: '120'
  },
  {
    label: '账号',
    prop: 'username',
    // width: '120'
  },
  {
    label: '操作',
    slotname: 'actions',
    isslot: true
  }
])
// 约束类型
interface T {
  page: number
  psize: number
  depid: number
  key: string
  pwd:string
}
// 所传的参数
let ruform = reactive<T>({
  page: 1,
  psize: 10,
  depid: 0,
  key: '',
  pwd:''
})
let total = ref(0)
// 搜索
const sou =async () => {
  tealist()
}
// 教资列表
let tableData: any = ref([])
const tealist = async()=>{
  let res:any = await teacherlist(ruform)
  // console.log(111,res);
  if(res.errCode===10000){
    tableData.value = res.data.list
    total.value = res.data.counts
  }
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
// 删除
const open =  (id:any) => {
  ElMessageBox.confirm(
    '是否删除',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      let ids = {
        id:0
      }
      // console.log(11,id);
      ids.id = id.id
      let res = await teacherdelete( ids )
      // console.log(222,res);
      // succesMsg('删除成功')
      tealist()   
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
// 重置密码
const ChongVisible = (val:any)=>{
  dialogVisible.value = true
  console.log(val);
  form.name = val.name
  console.log(form.name);
  form.oldpass = val.pass
  console.log(form.oldpass);
  
}
// 重置密码
const form = reactive({
  oldpass: '',
  pass: '',
  name:'',
  pwd:'',
})
// 密码重置
const Pass = async ()=>{  
  let red = await teacherchangePass(form)
  console.log(22,red);
  dialogVisible.value = false
  
}
// 取消按钮
const faAdd = ()=>{
  formAdd.id = 0
  formAdd.name = ''
  formAdd.username = ''
  formAdd.tel = ''
  formAdd.pass =''
  formAdd.depid = 0
  formAdd.roleid = 0
  dialogadd.value = false
}
// 添加
let formAdd = reactive({
  id:0,
  name:'',
  username:'',
  tel:'',
  pass:'',
  depid:0,
  roleid:0,
})
const teacheAdd = async ()=>{
  let red:any = await teacherchangeAdd(formAdd)
  console.log(red);
  // console.log(123);
  dialogadd.value = false
  succesMsg(formAdd.id>1?'修改成功':'添加成功')
  tealist()
}
// 修改
const teachedele = async (val:any)=>{
  dialogadd.value = true
  formAdd.id = val.id
  formAdd.name = val.name
  formAdd.username = val.username
  formAdd.tel = val.tel
  formAdd.pass = val.pass
  formAdd.depid = val.depid
  formAdd.roleid = val.roleid
  console.log(22,formAdd);
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
