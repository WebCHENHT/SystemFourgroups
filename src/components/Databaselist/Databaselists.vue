<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-dialog
      :model-value="dialogFormVisible"
      v-if="ifShow"
      :title="props.addEditData.id === 0 ? '题库添加' : '题库编辑'"
      width="40%"
      :before-close="handleClose"
    >
      <div>
        <el-form :rules="rules" :model="formData" ref="ruleFormRef" label-width="120px">
          <el-form-item label="题库名称：" prop="title">
            <el-input v-model="title" />
          </el-form-item>
          <el-form-item label="被他人使用" prop="isshow">
            <el-radio-group v-model="isshow" @click="radioChange">
              <el-radio :label="1">允许所有老师使用</el-radio>
              <el-radio :label="2" style="margin-top: 10px">不允许任何老师使用</el-radio>
              <el-col>
                <el-radio :label="3" size="large" @click="portion"
                  >允许部分老师使用<el-badge
                    v-if="isshow == 3"
                    :value="limits.length"
                    class="item"
                    type="primary"
                  >
                  </el-badge
                ></el-radio>
              </el-col>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 穿梭框 -->
    <TransFer :fla="fla" v-if="isshowes" v-model="isshowes" @all="all" :lista="formData.limits"></TransFer>
  </div>
</template>
<script setup lang="ts">
import { RoleList } from '@/assets/api/DepartMent/department'
import { DatabaseAdd } from '@/assets/api/databaselist/DatabaseList'
import { teacherlist } from '@/assets/api/teacher/teacher'
import TransFer from '@/components/Databaselist/TransFer.vue'
import { errorMsg, succesMsg } from '@/untils/msg'
import type { FormInstance } from 'element-plus'
import { onMounted, reactive, ref, toRefs } from 'vue'
const ifShow = ref(true)
const isshowes = ref(false)  //穿梭框
const ruleFormRef = ref<FormInstance>()
const props = defineProps({
  addEditData: {
    type: Object,
    default: () => {}
  },
  getListDialog: {
    type: Function,
    required: true
  }
})
// 连接接口的数据
let formData: any = reactive({
  id: 0,
  title: '',
  isshow: 1,
  limits: []
})
const fla = () => {
  ifShow.value = true
  isshowes.value = false
}
const all = (val:any) => {
  console.log(val);
  formData.limits = val
}
const { title, isshow, limits } = toRefs(formData)
// 允许部分老师使用
const portion = () => {
  ifShow.value = true
  isshowes.value = true
}
// 级联框
let dialogFormVisible = ref(false)
// 数据暴露
defineExpose({
  dialogFormVisible,
  formData
})
interface IteacherArr {
  page: number
  psize: number
  depid: string
  key: string
}
interface Idata {
  list: Array<any>
  teacherArr: IteacherArr
  teacherData: Array<any>
}
const data: Idata = reactive({
  list: [],
  teacherArr: {
    page: 1,
    psize: 20,
    depid: '',
    key: ''
  },
  teacherData: []
})
onMounted(() => {
  getList()
})
// 部门列表 师资列表
const getList = async () => {
  let res: any = await RoleList({ page: 1, psize: 100 })
  console.log('部门列表', res)
  if (res.errCode !== 10000) {
    return false
  }
  data.list = res.data.list

  let result: any = await teacherlist(data.teacherArr)
  console.log('获取老师信息', result)
  if (result.errCode !== 10000) {
    return false
  }
  data.teacherData = result.data.list
}
const handleClose = () => {
  dialogFormVisible.value = false
  formData.title = ''
}
// 级联框弹窗
// 获取单选框的值
const radioChange = (val: any) => {
  console.log(val)
  formData.isshow = val
}
// 点部分老师里的确定
// 表单验证
const rules = reactive({
  title: [{ required: true, message: '请输入题库名称', trigger: 'blur' }]
})
// 取消
const cancel = () => {
  dialogFormVisible.value = false
  formData.title = ''
}
// 确定
const confirm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(formData)
      let res: any = await DatabaseAdd(formData)
      console.log('添加题库', res)
      if (res.errCode !== 10000) {
        errorMsg('操作失败！')
        return false;
      }
      if (formData.id == 0) {
        succesMsg('添加成功！')
      } else {
        succesMsg('修改成功！')
      }
      dialogFormVisible.value = false
    } else {
      console.log('error submit!', fields)
      errorMsg('请输入题库名称！')
    }
    props.getListDialog() //调用父级的列表  刷新
    formEl.resetFields() //重置表单
    formData.limits = []
  })
}
</script>
<style scoped lang="less">
.el-form-item {
  width: 70%;
}
::v-deep .el-transfer-panel__list {
  height: 386px !important;
}
/deep/.el-transfer__buttons {
  display: none;
}
/deep/.el-transfer {
  display: flex;
  justify-content: space-around;
}
/deep/.el-transfer-panel {
  width: 300px;
}
/deep/.el-transfer-panel__body {
  height: 38vh;
}
// /deep/.el-transfer-panel__list{
//   height:100%;
// }
</style>
