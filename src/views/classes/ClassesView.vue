<template>
  <div>
    <h3>班级管理</h3>
    <div style="display: flex; margin-top: 20px">
      <div>
        <el-form-item label="班级名称">
          <el-input v-model="form.name" placeholder="请输入关键字" />
        </el-form-item>
      </div>
      &nbsp;&nbsp;
      <el-form-item label="部门">
        <el-cascader :options="options" :props="props2" clearable />
      </el-form-item>
      &nbsp;&nbsp;&nbsp;
      <el-button type="primary">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
let form = reactive({
  name: '',
  region: ''
})
// 级联框
const props2 = {
  multiple: true,
  checkStrictly: true,
}
</script>

<style scoped lang="less">
.el-input {
  width: 200px;
}
</style>
