<template>
  <div class="box">
    <el-page-header @back="goBack">
      <!-- <template #content>
        <span class="text-large font-600 mr-3">数据分析：{{ systemAnalyObj.title }} </span>
      </template> -->
    </el-page-header>
    <div class="watchInput">
      <span class="spa">考生姓名</span><el-input class="text" v-model="ruform.key" placeholder="请输入考生姓名" />
      <span class="">状态</span>
      <el-select v-model="ruform.pwd" clearable placeholder="请选择">
      <el-option
        v-for="item in optionList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
      </el-select>
      <span class="spa">部门</span><el-cascader @change="add" v-model="ruform.depid" class="text" :options="options" :props="props" clearable />
      <el-button class="but" type="primary">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {DepartmentList} from '@/assets/api/teacher/teacher'
import { ref , reactive} from 'vue'
import { useRouter } from 'vue-router'
let router = useRouter()
const goBack = () => {
  router.push('/SystemMenu/exam')
}
// 状态
const optionList = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
// 部门
let options:any = ref([])
const props = {
  value:'id',
  label:'name',
  children:'children',
  checkStrictly: true, //点击单选框选中改点击整行选中
 emitPath: false //只获取级联选
}
// 部门列表
const DeparList = async ()=>{
  let red:any = await DepartmentList()
  options.value = red.data.list
  // console.log(852,red)
}
DeparList()
// 约束类型
interface T {
  page: number
  psize: number
  depid: number
  key: string
  pwd:string
}
// 所传的参数
let ruform = reactive<T>({
  page: 1,
  psize: 10,
  depid: 0,
  key: '',
  pwd:''
})
</script>

<style scoped>
.text{
  width: 10%;
  margin-right: 1%;
}
.spa{
  margin-right: 1%;
}
.but{
  margin-left: 1%;
}
</style>