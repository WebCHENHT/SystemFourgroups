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
            <el-radio-group v-model="isshow" @change="radioChange">
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
    <el-dialog
      v-else
      :model-value="dialogFormVisible"
      title="可见老师"
      width="50%"
      :before-close="handleCloseFn"
    >
      <el-form
        ref="ruleFormRef"
        :model="data"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="部门">
          <el-select
            v-model="teacherArr.depid"
            @change="buMenchange"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in list"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 穿梭框 -->
        <el-transfer
          :titles="['未选', '已选']"
          v-model="formData.limits"
          :props="{
            key: 'id',
            label: 'name'
          }"
          :data="teacherData"
          @left-check-change="getLeftTransfer"
          @right-check-change="getRightTransfer"
        />
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="ifShow = true">取消</el-button>
          <el-button type="primary" @click="ok"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { RoleList } from '@/assets/api/DepartMent/department'
import { DatabaseAdd } from '@/assets/api/databaselist/DatabaseList'
import { teacherlist } from '@/assets/api/teacher/teacher'
import { errorMsg, succesMsg } from '@/untils/msg'
import type { FormInstance } from 'element-plus'
import { onMounted, reactive, ref, toRefs } from 'vue'
const ifShow = ref(true)
const ruleFormRef = ref<FormInstance>()
const formSize = ref('default')
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

const { title, isshow, limits } = toRefs(formData)
console.log(2424, limits)

// 允许部分老师使用
const portion = () => {
  ifShow.value = false

  if (formData.limits.length) {
    let ids = formData.limits.map((item: any) => {
      return item.id
    })
    formData.limits = [...ids]
  }
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

const { list, teacherArr, teacherData } = toRefs(data)

// 部门发生变化时
const buMenchange = (val: any) => {
  console.log('部门发生变化', val)
  data.teacherArr.depid = val
  getList()
}
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleClose = (done: () => void) => {
  dialogFormVisible.value = false
  formData.title = ''
}
// 级联框弹窗
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleCloseFn = (done: () => void) => {
  ifShow.value = true
}
// 获取单选框的值
const radioChange = (val: any) => {
  console.log(val)
  formData.isshow = val
}
// 点部分老师里的确定
const ok = () => {
  console.log(324235, formData.limits)
  formData.limits = formData.limits.map((item: any) => {
    return { id: item }
  })

  formData.isshow = 3
  console.log(1111, formData.limits)

  ifShow.value = true
}
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
        return false
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
    // formData.limits = []
  })
}
//获取穿梭框左侧id
// const Classes: any = ref([])

//穿梭框左侧选中
const getLeftTransfer = (data: any) => {
  formData.limits = [...formData.limits, ...data]
}

//穿梭框右侧选中
const getRightTransfer = (data: any) => {
  let res = formData.limits.filter((item: string) => {
    return !data.includes(item)
  })
  formData.limits = res
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
  height: 50vh;
}
// /deep/.el-transfer-panel__list{
//   height:100%;
// }
</style>
