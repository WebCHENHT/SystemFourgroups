<template>
  <div>
    <h3>学员管理</h3>
    <div style="display: flex">
      <div>
        <el-form-item label="学员名称">
          <el-input v-model="params.key" placeholder="请输入关键字" />
        </el-form-item>
      </div>
      &nbsp;&nbsp;
      <el-form-item label="部门">
        <el-cascader :options="options" :props="props2" @change="handleChange" clearable />
      </el-form-item>
      &nbsp;&nbsp;
      <el-form-item label="班级">
        <el-select v-model="params.classid" placeholder="请选择">
          <el-option v-for="(item, index) in arr" :key="index" :label="item.name" :value="index" />
        </el-select>
      </el-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClList } from '@/assets/api/classes/classe'
import { RoleList } from '@/assets/api/department'
import { reactive, ref, toRefs } from 'vue'

let data = reactive({
  params: {
    page: 1,
    psize: 10,
    depid: 0,
    classid: 0,
    key: ''
  }
})
const { params } = toRefs(data)
// 级联框
const props2 = {
  value: 'id',
  label: 'name',
  children: 'children',
  checkStrictly: true, //点击单选框选中改点击整行选中
  emitPath: false //只获取级联选择器中最后一项
}
// 获取部门id
const handleChange = (data: any) => {
  params.value.depid = data
}
let options = ref([])
// 部门列表
const deplist = async () => {
  let res: any = await RoleList({ page: 1, psize: 12 })
  options.value = res.data.list
}
deplist()
let arr: any = ref([])
// 班级列表
let list = async () => {
  let res: any = await ClList({
    page: 1,
    psize: 0,
    depid: 0,
    key: ''
  })
  arr.value = res.data.list
  console.log(res)
}
list()
</script>

<style scoped>
.el-input {
  width: 200px;
}
</style>
