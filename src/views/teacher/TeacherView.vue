<template>
  <div class="box">
    <div class="top_ter">
      <div class="ter">师资管理</div>
      <div class="terbut">
        <el-button>批量添加</el-button>
        <el-button type="primary" @click="dialogadd = true" v-authority="{ model: '师资', name: '添加' }">添加教资</el-button>
      </div>
    </div>
    <div class="watchInput">
      <span class="">关键字</span><el-input class="text" v-model="ruform.key" placeholder="请输入关键字" />
      <span class="">部门</span><el-cascader @change="add" v-model="ruform.depid" class="text" :options="options"
        :props="props" clearable />
      <span class="jiaos">角色</span>
      <el-select v-model="ruform.pwd" clearable placeholder="请选择">
        <el-option v-for="item in optionList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button class="but" type="primary" @click="sou" v-authority="{ model: '师资', name: '查看' }">搜索</el-button>
    </div>
    <TableangPage :loading="loading" :TableData="tableData" :tableColums="tableColum" :total="total"
      @sonhandleCurrentChange="handleCurrentChange" @sonhandleSizeChange="handleSizeChange">
      <template #actions="slotname: any">
        <el-button type="primary" size="small" link @click="ChongVisible(slotname.data)">重置密码</el-button>
        <el-button type="primary" size="small" link @click="teachedele(slotname.data)" v-authority="{ model: '师资', name: '编辑' }">修改</el-button>
        <!-- <el-button text @click="dele(slotname.data)" link>删除</el-button> -->
        <el-button type="primary" size="small" link @click="open(slotname.data)" v-authority="{ model: '师资', name: '删除' }">删除</el-button>
      </template>
    </TableangPage>
    <!-- 重置密码弹出框 @click="Pass" -->
    <el-dialog  :before-close="close" v-model=" dialogVisible " title="重置密码" width="30%">
      <el-form :model=" form " :rules="rules" label-width="120px">
        <el-form-item label="姓名:">
          {{ form.name }}
          <!-- <el-input v-model="form.name" /> -->
        </el-form-item>
        <el-form-item label="密码:" prop="confirmPass">
          <el-input v-model=" form.confirmPass " />
        </el-form-item>
        <el-form-item label="确认密码:" prop="pass">
          <el-input v-model=" form.pass " />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="pwead">取消</el-button>
          <el-button type="primary" @click=" Pass ">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 添加弹出框 -->
    <el-dialog :before-close="handleClose" v-model=" dialogadd " :title=" formAdd.id > 1 ? '编辑老师' : '添加老师' " width="30%">
      <el-form :model=" formAdd " :rules="rulesadd" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model=" formAdd.name "  />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model=" formAdd.tel " />
        </el-form-item>
        <el-form-item label="部门" prop="depid">
          <el-cascader v-model=" formAdd.depid " class="text" :options=" options " :props=" props " clearable />
        </el-form-item>
        <el-form-item label="角色" prop="roleid">
          <el-select v-model=" formAdd.roleid " clearable placeholder="请选择">
            <el-option v-for="  item   in   optionList  " :key=" item.id " :label=" item.name " :value=" item.id " />
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model=" formAdd.username " />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model=" formAdd.pass " />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click=" faAdd ">取消</el-button>
          <el-button type="primary" @click=" teacheAdd ">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { teacherlist, teacherdelete , roleList, DepartmentList, teacherchangeAdd } from '@/assets/api/teacher/teacher'
import TableangPage from '@/components/TableangPage.vue'
import { succesMsg,errorMsg } from '@/untils/msg'
import { ElMessageBox, ElMessage } from 'element-plus';
// 密码重置弹出框
let dialogVisible = ref(false)
// 添加弹出框
const dialogadd = ref(false)
// 接连框
let optionList: any = ref([])

let loading = ref<boolean>(true)
// 角色列表
const roleLists = async () => {
  let red = await roleList(0 as any)
  // console.log(777,red);
  optionList.value = red.data.list
  // console.log(789787,optionList);
}
roleLists()
// 部门
let options: any = ref([])
const props = {
  value: 'id',
  label: 'name',
  children: 'children',
  emitPath: false //只获取级联选
}
//部门change事件
const add = async (val: any) => {
  ruform.depid = val
  //  console.log( 9696,ruform.depid)
}
// 部门列表
const DeparList = async () => {
  let red: any = await DepartmentList( '' as any)
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
// 所传的参数
let ruform: any = reactive({
  page: 1,
  psize: 10,
  depid: 0,
  key: '',
  pwd: ''
})
let total = ref(0)
// 搜索
const sou = async () => {
  loading.value = true
  tealist()
}
// 教资列表
let tableData: any = ref([])
const tealist = async () => {
  let res: any = await teacherlist(ruform)
  // console.log(111,res);
  if (res.errCode === 10000) {
    tableData.value = res.data.list
    total.value = res.data.counts
    loading.value = false
  }
  // console.log(22,tableData);

}
tealist()
// 分页
const handleSizeChange = (val: number) => {
  ruform.psize = val
  loading.value = true
  tealist()
}
const handleCurrentChange = (val: number) => {
  ruform.page = val
  loading.value = true
  tealist()
}
// 删除
const open = (id: any) => {
  ElMessageBox.confirm(
    '是否删除',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let ids = {
        id: 0
      }
      // console.log(11,id);
      ids.id = id.id
      let res = await teacherdelete(ids)
      // console.log(222,res);
      // succesMsg('删除成功')
      tealist()
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      loading.value = false
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
      loading.value = false
    })
}
// 重置密码赋值
const ChongVisible = (val: any) => {
  dialogVisible.value = true
  console.log(66, val);
  form.name = val.name
  form.oldpass = val.pass
  form.qq = val.pass
  form.tel = val.tel
  form.roleid = val.roleid
  form.id = val.id
  form.depid = val.depid
  form.username = val.username
}
// 重置密码参数
let form = reactive({
  confirmPass:"",//新密码
  depid:0,//
  id:0,
  name:"",//名字
  oldpass:"",//原密码
  pass:"",//新密码
  qq:"",//原密码
  roleid:0,//角色
  searchDepa:[],
  tel:"",//手机号
  username:"",//账号
})

// 表单验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入6-12位新密码'))
  } else {
    if (form.pass !== '') {
      if (!form.value) return
      form.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入6-12位新密码'))
  } else if (value !== form.confirmPass) {
    callback(new Error("确认密码与确认新密码不同!"))
  } else {
    callback()
  }
}
const rules = reactive({
  confirmPass: [{ validator: validatePass, trigger: 'blur' },
  { required: true, message: '请输入新密码 ', trigger: 'blur' }],
  pass: [{ validator: validatePass2, trigger: 'blur' },
  { required: true, message: '请输入新密码 ', trigger: 'blur' }],
  
})
// 密码重置
const Pass = async () => {
  let red = await teacherchangeAdd(form)
  console.log(22, red);
  dialogVisible.value = false
  if(red.errCode==10000){
    succesMsg('密码重置成功')
    loading.value = true
  }
    form.confirmPass= '';
    form.depid= 0;
    form.id= 0;
    form.name='' ;
    form.oldpass='';
    form.pass='';
    form.qq='';
    form.roleid= 0;
    form.tel='';
    form.username='';
}
// 重置密码取消
const pwead = ()=>{
  form.confirmPass= '';
    form.depid= 0;
    form.id= 0;
    form.name='' ;
    form.oldpass='';
    form.pass='';
    form.qq='';
    form.roleid= 0;
    form.tel='';
    form.username='';
  dialogVisible.value = false
}
// 
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确认要退出吗？')
    .then(() => {
      done()
      faAdd()
    })
    .catch(() => {
      // catch error
    })
}
const close = (done: () => void) => {
  ElMessageBox.confirm('确认要退出吗？')
    .then(() => {
      done()
      pwead()
    })
    .catch(() => {
      // catch error
    })
}
// 取消按钮
const faAdd = () => {
  formAdd.id = 0
  formAdd.name = ''
  formAdd.username = ''
  formAdd.tel = ''
  formAdd.pass = ''
  formAdd.depid = 0
  formAdd.roleid = 0
  dialogadd.value = false
}
// 添加
let formAdd = reactive({
  id: 0,
  name: '',
  username: '',
  tel: '',
  pass: '',
  depid: 0,
  roleid: '',
  pwd: 0,
})
const teacheAdd = async () => {
  let red: any = await teacherchangeAdd(formAdd)
  console.log(red);
  // console.log(123);
  if(red.errCode==10000){
    dialogadd.value = false
    succesMsg(formAdd.id > 1 ? '修改成功' : '添加成功')
    tealist()
  }else if(red.errCode==10600){
    errorMsg(red.errMsg)
  }
  loading.value = true
  
}
// 添加表单验证
const rulesadd = reactive({
  name: [
    { required: true, message: '姓名不能为空', trigger: 'blur' },
  ],
  depid: [
    { required: true, message: '部门不能为空', trigger: 'blur' },
  ],
  roleid: [
    { required: true, message: '角色不能为空', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '部门不能为空', trigger: 'blur' },
  ],
  pass: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '密码又3-10个字符组成', trigger: 'blur' },
  ],
})
// 修改
const teachedele = async (val: any) => {
  dialogadd.value = true
  formAdd.id = val.id
  formAdd.name = val.name
  formAdd.username = val.username
  formAdd.tel = val.tel
  formAdd.pass = val.pass
  formAdd.depid = val.depid
  formAdd.roleid = val.roleid
  console.log(22, formAdd);
}
</script>
<style scoped lang="less">
.box {
  width: 100%;
  height: 100%;
  .top_ter {
    display: flex;
    justify-content: space-between;
    .ter {
      font-size: 20px;
      margin-bottom: 0.6%;
    }
  }
  .watchInput {
    margin-bottom: 1%;
    // margin-right: 1%;
    span {
      font-size: 15px;
      margin-right: 1%;
    }
    .text {
      width: 10%;
      margin-right: 1%;
    }
    .jiaos{
      margin-left: 1%;
    }
  }
  .but {
    margin-left: 1%;
  }
}
</style>
