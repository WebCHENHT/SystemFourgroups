<template>
  <el-dialog
    v-model="dialogVisible"
    :title="props.carr.id === undefined ? '添加' : '修改'"
    width="50%"
    :before-close="handleClose"
  >
    <el-form ref="ruleFormRef" label-width="120px" class="demo-ruleForm" status-icon>
      <el-form-item label="姓名" prop="name">
        <el-input />
      </el-form-item>
      <el-form-item label="电话">
        <el-input maxlength="11" />
      </el-form-item>

      <el-form-item label="部门">
        <el-cascader :options="options" :props="props2" @change="handleChange" clearable />
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="params.classid" placeholder="请选择">
          <el-option v-for="(item, index) in arr" :key="index" :label="item.name" :value="index" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="备注"
        prop="remarks"
        style="border-bottom: solid 1px #eee; padding: 10px 0px"
      >
        <el-input type="textarea" style="width: 300px" />
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancellation">取消</el-button>
        <el-button type="primary" @click="add"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { RoleList } from '@/assets/api/DepartMent/department'
import { ClList } from '@/assets/api/classes/classe'
import { ElMessageBox } from 'element-plus'
import { reactive, ref, toRefs } from 'vue'
const props = defineProps({
  carr: {
    type: Object,
    required: true
  },
  falv: {
    type: Function,
    required: true
  }
})
console.log(props.carr)

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定要退出吗? ')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
const add = () => {
  props.falv()
}
const cancellation = () => {
  props.falv()
}
//列表数据
interface Iparams {
  page: number //页码 默认是1
  psize: number //每页显示多少条 默认是2
  key: string //搜索关键字(名称)
  depid: number //部门id
  classid: string //班级id
}
// 约束类型
interface T {
  params: Iparams
}
let data = reactive<T>({
  params: {
    page: 1,
    psize: 10,
    depid: 0,
    classid: '',
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
let options = ref([])
// 部门列表
const deplist = async () => {
  let res: any = await RoleList({ page: 1, psize: 12 })
  options.value = res.data.list
}
deplist()
// 获取部门id
const handleChange = async (data: any) => {
  params.value.depid = data
}
let arr: any = ref([])
// 班级列表
const list = async () => {
  let res: any = await ClList({
    page: 1,
    psize: 0,
    depid: 0,
    key: ''
  })
  arr.value = res.data.list
}
list()
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-input {
  width: 300px;
}
</style>
