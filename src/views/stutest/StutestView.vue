<template>
  <div class="Stutestop">
    <div class="liebiaos">考试列表</div>
    <div class="Stutesfrom">
      <el-form-item label="关键字">
        <el-input v-model="StutestModel.key" placeholder="考试名称" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="StutestModel.status" class="m-2" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

let StutestModel = reactive({
  key: '',
  status: ''
})
const StutestDatas = () => {}
const options = [
  {
    value: '所有',
    label: '所有'
  },
  {
    value: 'Option2',
    label: 'Option2'
  },
  {
    value: 'Option3',
    label: 'Option3'
  },
  {
    value: 'Option4',
    label: 'Option4'
  },
  {
    value: 'Option5',
    label: 'Option5'
  }
]
</script>

<style lang="less" scoped>
.Stutestop {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  .liebiaos {
    font-size: 20px;
  }
}
</style>
