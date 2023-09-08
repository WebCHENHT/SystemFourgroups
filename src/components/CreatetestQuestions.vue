<template>
  <el-dialog v-model="dialogVisible" title="题库添加" width="45%" @close="gubisd">
    <div class="addBase">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="题库名称" prop="title">
          <el-input
            v-model="ruleForm.title"
            style="
              display: flex;
              -webkit-user-drag: none;
              user-select: none;
              width: 200px;
              height: 32px;
            "
          />
        </el-form-item>
        <el-form-item label="被他人使用">
          <el-radio-group v-model="ruleForm.isshow">
            <el-radio :label="1">允许所有老师使用</el-radio>
            <el-radio :label="2">不允许任何老师使用</el-radio>
            <el-radio :label="3" @click="bufenxs">
              <div style="display: flex">
                <div>允许部分老师使用</div>
                <div
                  v-if="ruleForm.limits.length >= 1"
                  style="
                    width: 20px;
                    height: 20px;
                    background-color: #409eff;
                    border-radius: 50%;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  {{ ruleForm.limits.length }}
                </div>
              </div>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="DatabaseAdds"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
  <SystemTransfer
    ref="Transfer"
    :ishow="false"
    :names="'可见老师'"
    :datas="datas"
    :TransferDatas="TransferDatas"
    @MyDepartment="MyDepartment"
    @MySystemTransferAdd="MySystemTransferAdd"
    @DelSystemTransfer="DelSystemTransfer"
  ></SystemTransfer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reactive } from 'vue'
import SystemTransfer from '@/components/SystemTransfer.vue'
import { DepartmentList, TeacherList } from '@/assets/api/TestList'
let emits = defineEmits<{
  (
    name: 'MybaseAdd',
    value: {
      id: number
      title: string
      isshow: number
      limits: never[]
    }
  ): any
}>()
const formSize = ref('default')
const Transfer = ref()
const datas: any = ref([])
const TransferDatas = ref()

const ruleForm = reactive({
  id: 0,
  title: '',
  isshow: 1,
  limits: []
})
const DelSystemTransfer = () => {
  datas.value = []
  TransferDatas.value = []
}
//关闭回调
const gubisd = () => {
  ruleForm.id = 0
  ruleForm.title = ''
  ruleForm.isshow = 1
  ruleForm.limits = []
}
const rules = reactive({
  title: [{ required: true, message: '请输入题库名称', trigger: 'blur' }]
})
const MySystemTransferAdd = (data: any) => {
  let res = data.map((item: any) => {
    return item === item
      ? {
          id: item
        }
      : ''
  })
  ruleForm.limits = res
  Transfer.value.dialogVisible = false
}
const DatabaseAdds = () => {
  emits('MybaseAdd', ruleForm)
  // let add = await DatabaseAdd(ruleForm)
  // if (add.errCode === 10000) {
  //   dialogVisible.value = false
  // }
}

const MyDepartment = async (data: any) => {
  Transfer.value.loading = true
  let res = await TeacherList({
    depid: data
  })
  if (res.errCode === 10000) {
    Transfer.value.loading = false
    TransferDatas.value = res.data.list
  }
}
const dialogVisible = ref(false)
const bufenxs = async () => {
  let res = await DepartmentList()
  if (res.errCode === 10000) {
    datas.value = res.data.list
  }
  Transfer.value.dialogVisible = true
}
defineExpose({ dialogVisible })
</script>

<style lang="less" scoped>
.addBase {
  padding: 15px 80px;
}
</style>
