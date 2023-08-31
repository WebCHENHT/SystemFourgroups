<template>
  <div style="font-size: 20px">考试管理</div>
  <el-row :gutter="24">
    <el-col :span="3">
      <div class="grid-content ep-bg-purple" />
      <el-form-item label="关键字">
        <el-input v-model="TestData.key" placeholder="请输入关键字" />
      </el-form-item>
    </el-col>
    <el-col :span="3">
      <div class="grid-content ep-bg-purple" />

      <el-form-item label="创建人">
        <el-input v-model="TestData.admin" placeholder="请输入创建人" />
      </el-form-item>
    </el-col>
    <el-col :span="16" style="padding-right: 5px; padding-left: 5px">
      <div class="grid-content ep-bg-purple" />
      <el-checkbox v-model="TestData.ismy" label="我创建的" />
      <el-form-item label="开放时间" style="margin-left: 15px">
        <el-radio-group v-model="TestData.opentime">
          <el-radio label="永久开放" value="0" style="margin-right: 10px" />
          <el-radio label="部分时段" value="1" style="margin-right: 0px" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="部分时段" style="margin-left: 15px; width: 300px">
        <el-date-picker
          v-model="value2"
          @change="tiems"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :shortcuts="shortcuts"
          :size="size"
        />
      </el-form-item>
      <el-form-item label="状态" style="margin-left: 15px">
        <el-select v-model="TestData.state" placeholder="请选择">
          <el-option label="所有" value="0" />
          <el-option label="已发布" value="1" />
          <el-option label="未发布" value="2" />
        </el-select>
      </el-form-item>
      <el-button type="primary" style="margin-left: 20px">查询</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import dayjs from 'dayjs'

const size = ref<'default' | 'large' | 'small'>('default')
let TestData = reactive({
  page: 1,
  psize: 10,
  key: '',
  admin: '',
  ismy: '',
  opentime: '永久开放',
  begindate: '',
  enddate: '',
  state: ''
})
let value2 = ref('')
const tiems = (data: any) => {
  TestData.begindate = dayjs(data[0]).format('YYYY-MM-DD')
  TestData.enddate = dayjs(data[1]).format('YYYY-MM-DD')
}
const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  margin-top: 15px;
  border-radius: 4px;
  display: flex;
  .el-select {
    width: 100px;
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
