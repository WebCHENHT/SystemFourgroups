<template>
  <el-dialog
    v-model="dialogVisible"
    :title="res.names"
    width="50%"
    :close-on-click-modal="false"
    @close="DelSystemTransfer"
  >
    <el-row :gutter="22">
      <el-col :span="11"
        ><div class="grid-content ep-bg-purple" />
        <el-form-item label="部门">
          <el-select
            v-model="Departmentvalue"
            class="m-2"
            placeholder="请选择"
            @change="getDepartment"
          >
            <el-option
              v-for="item in res.datas"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="11"
        ><div class="grid-content ep-bg-purple" />
        <el-form-item label="班级" v-if="ishow">
          <el-select
            v-model="Classesvalue"
            class="m-2"
            placeholder="请选择"
            @change="getClasses"
            :disabled="Departmentvalue !== '' ? false : true"
          >
            <el-option
              v-for="item in ClassesDatas"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-transfer
      v-loading="loading"
      v-model="Classes"
      :data="TransferDatas"
      :props="{ label: 'name', key: 'id' }"
      :titles="['未选', '全选']"
      @left-check-change="getLeftTransfer"
      @right-check-change="getRightTransfer"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="SystemTransferAdd"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
let res = defineProps<{
  //控制班级显示隐藏
  ishow: boolean
  //弹框名称
  names: string
  //添加id
  TransferAddid?: any
  //部门数据
  datas: any[]
  //班级
  ClassesDatas?: any[]
  //穿梭框数据
  TransferDatas?: any[]
}>()

let emits = defineEmits<{
  (name: 'MyDepartment', value: number): any
  (name: 'MyClasses', value: {}): any
  (name: 'MySystemTransferAdd', value: any): any
  (name: 'DelSystemTransfer', value?: any): any
}>()
const dialogVisible = ref(false)
//获取穿梭框左侧id
const Classes: any = ref([])
//加载
let loading = ref(false)
//部门id
const Departmentvalue = ref('')
//班级id
let Classesvalue = ref('')
//穿梭框左侧选中
const getLeftTransfer = (data: any) => {
  Classes.value = [...Classes.value, ...data]
}
//关闭回调
const DelSystemTransfer = () => {
  emits('DelSystemTransfer')
  Classes.value = []
  Departmentvalue.value = ''
  Classesvalue.value = ''
}
//穿梭框右侧选中
const getRightTransfer = (data: any) => {
  let res = Classes.value.filter((item: string, index: number) => {
    return !data.includes(item)
  })
  Classes.value = res
}
//确定提交
const SystemTransferAdd = () => {
  emits('MySystemTransferAdd', Classes.value)
}
const getDepartment = (data: number) => {
  emits('MyDepartment', data)
}
const getClasses = (data: number) => {
  emits('MyClasses', { depid: Departmentvalue.value, classid: Classesvalue.value })
}

defineExpose({ dialogVisible, loading ,Classes})
</script>

<style lang="less" scoped>
.el-row {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
  justify-content: space-between;
  /deep/.el-col-11 {
    max-width: 45.8333333333%;
    flex: 0 0 45.8333333333%;
  }
}
/deep/.el-form-item__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
  line-height: 32px;
  position: relative;
  font-size: var(--font-size);
  min-width: 0;
}
.el-transfer {
  padding: 0 13px !important;
  display: flex !important;
  justify-content: space-between !important;
}
/deep/.el-transfer-panel {
  width: 292px;
}
/deep/.el-transfer__buttons {
  display: none;
}
/deep/.el-transfer-panel__body {
  height: 55vh;
}
</style>
