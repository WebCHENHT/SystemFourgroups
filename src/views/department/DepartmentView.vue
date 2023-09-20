<template>
  <div class="department">
    <div class="header">部门管理</div>
    <el-button type="primary" @click="add" v-authority="{ model: '部门', name: '添加' }">添加一级节点</el-button>
    <div class="content">
      <!-- 部门列表 -->
      <div class="content-left">
        <el-scrollbar>
          <el-tree
            :data="datalist"
            node-key="id"
            :props="defaultProps"
            :defaultExpandAll="true"
            @node-click="handleNodeClick"
          />
        </el-scrollbar>
      </div>
      <!-- 添加一级节点 -->
      <div class="content-right" v-show="show">
        <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="80px">
          <el-form-item label="节点名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="adds(ruleFormRef)">添加一级节点</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="content-right" v-show="shows">
        <span>当前节点：&nbsp;&nbsp;{{ names }}</span>
        <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="80px">
          <el-form-item label="节点名称" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="del" v-authority="{ model: '部门', name: '删除' }">删除当前节点</el-button>
            <el-button type="success" @click="modify(ruleFormRef)" v-authority="{ model: '部门', name: '修改' }">修改当前节点</el-button>
            <el-button type="primary" @click="AddChild(ruleFormRef)" v-authority="{ model: '部门', name: '添加' }">添加子节点</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DepartAdd, DepartmentDelete, RoleList } from '@/assets/api/DepartMent/department';
import { confirmBox, errorMsg, succesMsg } from '@/untils/msg';
import type { FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
let datalist = ref([])
let dele = ref()
let names = ref('')
let pids = ref()
let show = ref(false)
let shows = ref(false)
const form: any = reactive({
  name: '',
  id: 0
})
const defaultProps = {
  children: 'children',
  label: 'name'
}
const data = reactive({
  page: 1,
  psize: 10
})
//添加验证
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }]
})
// 添加
let add = () => {
  show.value = !show.value
  shows.value = false
}
//添加子节点
const AddChild = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let lists: any = {
        id: 0,
        name: form.name,
        pid:dele.value
      }
      let res = await DepartAdd(lists)
      if (res.errCode === 10000) {
        succesMsg('添加成功')
        form.name = ''
        list()
      }
    } else {
      //console.log('error submit!', fields)
    }
  })
}
//修改子节点
const modify = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let modifys = {
        id: dele.value,
        name: form.name,
        pid:pids.value
      }
      let res = await DepartAdd(modifys)
      if (res.errCode === 10000) {
        succesMsg('添加成功')
        form.name = ''
        list()
      }
    } else {
      //console.log('error submit!', fields)
    }
  })
}
// 部门列表
const list = async () => {
  let res: any = await RoleList(data)
  console.log(res)
  if (res.errCode === 10000) {
    datalist.value = res.data.list
  }
}
list()
// 删除
const del = () => {
  confirmBox('你真的确定吗？???', '你确定吗？', null)
    .then(async () => {
      let res = await DepartmentDelete({ id: dele.value })
      console.log(res)
      shows.value = false
      list()
      succesMsg('删除成功')
    })
    .catch(() => {
      errorMsg('不了不了OvO')
    })
}
// 确定添加
const adds = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let res = await DepartAdd(form)
      if (res.errCode === 10000) {
        succesMsg('添加成功')
        form.name = ''
        list()
      }
    } else {
      //console.log('error submit!', fields)
    }
  })
}
const handleNodeClick = (data: any) => {
  dele.value = data.id
  names.value = data.name
  pids.value = data.pid
  show.value = false
  shows.value = true
}
</script>

<style scoped lang="less">
.department {
  .header {
    font-size: 20px;
  }
  .el-button {
    margin-left: 20px;
    margin-top: 20px;
    font-size: 12px;
  }
  .el-tree {
    margin-top: 20px;
    margin-left: 15px;
  }
  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
  .content {
    display: flex;
    height: 87vh;
    .content-left {
      width: 500px;
      max-height: 87vh;
      overflow-y: scroll;
    }
    .content-right {
      width: 40%;
      margin-left: 20px;
      .el-form-item {
        margin-top: 10px;
        .el-button {
          margin-left:10px;
        }
      }
      .el-form-item:first-child {
        width: 55%;
        margin-bottom: -5px;
        .el-button {
          margin-left: 65px;
        }
      }
    }
  }
}
</style>
