<template>
  <el-dialog v-model="dialogVisible" title="可见老师" width="40%">
    <el-form :model="form" label-width="50px">
      <el-form-item label="部门">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option
            v-for="item in datast"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click="change(item.id)"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-transfer
      :titles="['未选', '已选']"
      @left-check-change="getLeftTransfer"
      @right-check-change="getRightTransfer"
      :props="{ label: 'name', key: 'id' }"
      v-model="Classes"
      :data="TransferDatas"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="add"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { DepartmentList, TestGetlimit } from '@/assets/api/TestList'
import { teacherlist } from '@/assets/api/teacher/teacher'
import { reactive, ref } from 'vue'
let props = defineProps({
  fla: {
    type: Function,
    required: true
  }
})
const form = reactive({
  region: ''
})
const dialogVisible = ref(false)
let TransferDatas = ref([])
let datast: any = ref([])
// 部门
let list = async () => {
  let res = await DepartmentList()
  datast.value = res.data.list
}
list()
// 师资
const change = async (row: any) => {
  let res: any = await teacherlist({
    depid: row,
    page: 1,
    psize: 10,
    key: ''
  })
  TransferDatas.value = res.data.list
}
const emit = defineEmits(['all'])
//获取穿梭框左侧id
const Classes: any = ref([])
//穿梭框左侧选中
const getLeftTransfer = (data: any) => {
  console.log(data)

  Classes.value = [...Classes.value, ...data]
}
//穿梭框右侧选中
const getRightTransfer = (data: any) => {
  let res = Classes.value.filter((item: string, index: number) => {
    return !data.includes(item)
  })
  Classes.value = res
}
let add = async () => {
  let res = await TestGetlimit(Classes.value)
  if (res.errCode === 10000) {
    props.fla()
    emit(
      'all',
      Classes.value.map((item: any) => ({ ...item, id: item }))
    )
  }
}
</script>

<style scoped lang="less">
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
