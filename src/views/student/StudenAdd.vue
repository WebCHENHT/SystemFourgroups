<template>
  <el-dialog
    v-model="dialogVisible"
    :title="props.carr.id === undefined ? '添加' : '修改'"
    width="50%"
    :before-close="handleClose"
  >
    <el-form
      ref="ruleFormRef"
      :model="AddForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="AddForm.name" />
      </el-form-item>
      <el-form-item label="电话" prop="photo">
        <el-input v-model="AddForm.photo" maxlength="11" />
      </el-form-item>

      <el-form-item label="部门">
        <el-select v-model="AddForm.depname" placeholder="请选择" @change="selectChange">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="AddForm.classid" placeholder="请选择" @change="selectChanges" clearable>
          <el-option
            v-for="item in arr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            id="option"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remarks"
        style="border-bottom: solid 1px #eee; padding: 10px 0px"
      >
        <el-input type="textarea" v-model="AddForm.remarks" style="width: 300px" />
      </el-form-item>
      <el-form-item label="账号" prop="username" v-if="AddForm.id === 0">
        <el-input v-model="AddForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="pass" v-if="AddForm.id === 0">
        <el-input type="password" v-model="AddForm.pass" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancellation">取消</el-button>
        <el-button type="primary" @click="add(ruleFormRef)"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { RoleList } from '@/assets/api/DepartMent/department'
import { ClList } from '@/assets/api/classes/classe'
import { classesadd } from '@/assets/api/studen/studen'
import { succesMsg } from '@/untils/msg'
import { ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref, toRefs } from 'vue'
const dialogVisible = ref(false)
const props = defineProps({
  carr: {
    type: Object,
    required: true
  },
  falv: {
    type: Function,
    required: true
  },
  getListDialog: {
    type: Function,
    required: true
  }
})
interface Iadd {
  //添加数据接口
  id: number
  name: string
  classid: string
  remarks: string
  username: string
  photo: string
  pass: string
  depname: string
}
interface Idatss {
  AddForm: Iadd
}
const datss: Idatss = reactive({
  //添加数据
  AddForm: {
    id: props.carr.id || 0,
    name: props.carr.name,
    remarks: props.carr.remarks,
    classid: props.carr.classname,
    photo: props.carr.mobile,
    username: props.carr.username,
    pass: props.carr.pass,
    depname: props.carr.depname
  }
})
const { AddForm } = toRefs(datss)
//校验
const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入名字', trigger: 'blur' },
    { min: 2, max: 8, message: '长度在2-8个字符之间', trigger: 'blur' }
  ],
  photo: [
    { required: true, message: '请填写正确的手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: '手机号必须是11位', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '长度应在3到10位', trigger: 'blur' }
  ],
  pass: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 5, message: '长度最少5位数', trigger: 'blur' }
  ]
})
const ruleFormRef = ref<FormInstance>()
// 添加或修改
const add = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let res = await classesadd(AddForm.value)
      if (AddForm.value.id === 0) {
        if (res.errCode === 10000) {
          succesMsg('添加成功！')
          props.getListDialog()
          props.falv()
        }
      } else {
        if (res.errCode === 10000) {
          succesMsg('修改成功！')
          props.getListDialog()
          props.falv()
        }
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const cancellation = () => {
  props.falv()
}
//列表数据
interface Iparams {
  page: number //页码 默认是1
  psize: number //每页显示多少条 默认是2
  key: string //搜索关键字(名称)
  depid: number //部门id
  classid: string //班级id
}
// 约束类型
interface T {
  params: Iparams
}
let data = reactive<T>({
  params: {
    page: 1,
    psize: 10,
    depid: 0,
    classid: '',
    key: ''
  }
})
const { params } = toRefs(data)

let options: any = ref([])
// 部门列表
const deplist = async () => {
  let res: any = await RoleList({ page: 1, psize: 12 })
  options.value = res.data.list
}
deplist()
let arr: any = ref([])
let showt = ref('')
const selectChange = async (val: any) => {
  params.value.depid = val
  // 班级列表
  let res: any = await ClList(params.value)
  arr.value = res.data.list
}
// 班级
const selectChanges = () => {
  showt.value = '1'
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
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-input {
  width: 300px;
}
</style>
