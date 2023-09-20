<template>
  <div>
    <el-dialog
      :modelValue="modelValue"
      :title="addEditData.id ? '编辑角色' : '添加角色'"
      width="60%"
      :before-close="close"
    >
      <div>
        <el-form :model="formData" label-width="120px">
          <el-form-item label="角色名称：">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限：">
            <el-tree
              :data="menuList"
              show-checkbox
              node-key="id"
              :default-expand-all="true"
              :props="propsTrue"
              @check="handleCheck"
              :default-checked-keys="checkedKeys"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { MenuList, RoleAdd } from '@/assets/api/Role/rols'
import { succesMsg } from '@/untils/msg'
import { reactive, ref, watch } from 'vue'
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  addEditData: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['update:modelValue','fatherDate'])
const propsTrue = {
  label: 'name',
  children: 'children'
}
const formData = reactive({
  id: 0,
  name: ''
})
const checkedKeys: any = ref([]) // 选择后的id
const menuList: any = ref([])

// 弹框打开如果有不是修改将值付给formData
watch(() => props.modelValue, () => {
  if (props.modelValue === true) {
    if (props.addEditData.id) {
      formData.id = props.addEditData.id;
      formData.name = props.addEditData.name;
    } else {
      formData.id = props.addEditData.id;
      formData.name = '';
    }
    getMenus();
  }
}, { immediate: true });

// 获取权限列表
const getMenus = async () => {
  checkedKeys.value = []
  let data = {
    roleid: props.addEditData.id
  }
  const res: any = await MenuList(data)
  console.log(res);
  if (res.errCode !== 10000) return
  menuList.value = res.data.list
  menuList.value.forEach((t: any) => {
    // 循环子项如果勾选则push到默认勾选的节点的 key 的数组
    t.children.forEach((h: any) => {
      if (h.checked === 1) {
        checkedKeys.value.push(h.id)
          console.log(checkedKeys);
          
      }
    })
  })
}
// 选择的全部key值
const handleCheck = (data: any, checkedNodes: any) => checkedKeys.value = checkedNodes.checkedKeys
// 提交
const submit = async () => {
  let checkedId = checkedKeys.value.map((t: number, i: number) => {
    // 如果包含父项id则将id删除
    if (menuList.value.some((h: any) => h.id === t)) {
      delete checkedKeys.value[i]
    } else {
      return { id: t }
    }
  })
  // 将undefined过滤出去
  checkedId = checkedId.filter((t: any) => t !== undefined)
  const res: any = await RoleAdd({ ...formData, menus: checkedId })
  if (res.errCode !== 10000) return
  succesMsg(props.addEditData.id ? '编辑成功！！！' : '添加成功！！！')
  close()
  emit('fatherDate')
}
// 取消
const close = () => {
  emit('update:modelValue', false)
  menuList.value = []
  checkedKeys.value = []
}
</script>
<style scoped lang="less">
.el-form-item {
  width: 50%;
}
::v-deep.el-tree {
  margin-top: 30px;
  margin-left: -50px;
  .el-tree-node {
    margin-bottom: 10px;
    // margin-left: -20px;
    .el-tree-node__children {
      display: flex !important;
    }
  }
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
</style>
