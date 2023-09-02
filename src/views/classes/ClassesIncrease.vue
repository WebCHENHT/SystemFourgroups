<!-- 班级管理添加和修改 -->
<template>
  <el-dialog
    width="40%"
    v-model="dialogTableVisible"
    :title="a.carr.ids === undefined ? '添加' : '修改'"
  >
    <el-form
      ref="ruleFormRef"
      :model="Idataa"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item label="班级名称" prop="name">
        <el-input v-model="Idataa.name" />
      </el-form-item>
      <el-form-item label="部门" prop="name">
        <el-cascader
          v-model="Idataa.depid"
          :options="dataa.arr"
          :props="props"
          clearable
          @change="handleChange"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="fal">取消</el-button>
        <el-button type="primary" @click="add(ruleFormRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { RoleList } from '@/assets/api/DepartMent/department';
import { classesadd } from '@/assets/api/classes/classe'
import { succesMsg } from '@/untils/msg' //成功按钮
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
const dialogTableVisible = ref(false)
const a = defineProps({
  carr: {
    type: Object,
    required: true
  },
  fal: {
    type: Function,
    required: true
  }
})
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
// 表单验证
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入班级名称', trigger: 'blur' }]
})

// 确定按钮
interface Idata {
  name: string
  depid: number
  id: number
}
const Idataa: Idata = reactive({
  name: a.carr.name,
  depid: a.carr.ids,
  id: a.carr.id
})
// 级联选择器change事件
const handleChange = (value: any) => {
  Idataa.depid = value
}
// 部门
const props = {
  value: 'id',
  label: 'name',
  children: 'children',
  checkStrictly: true, //点击单选框选中改点击整行选中
  emitPath: false //只获取级联选择器中最后一项
}
const dataa = reactive({
  arr: [],
  information: [] as any
})
// 部门列表
const lists = async () => {
  const res: any = await RoleList({ page: 1, psize: 10 })
  dataa.arr = res.data.list
}
lists()
// 确定按钮 添加和修改
const add = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 请求添加班级接口
      let res: any = await classesadd(Idataa)
      if (res.errCode === 10000) {
        if (res.data.id === 0) {
          succesMsg('添加成功')
          a.fal()
        } else {
          succesMsg('修改成功')
          a.fal()
        }
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const fal = () => {
  a.fal()
}
</script>

<style scoped lang="less">
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
