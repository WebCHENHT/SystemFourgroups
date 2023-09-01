<template>
<div class="box">
  <div class="top_ter">
    <div class="ter">师资管理</div>
    <div class="terbut">
      <el-button>批量添加</el-button>
      <el-button type="primary">添加教资</el-button>
    </div>
  </div>
  <div class="watchInput">
    <span class="">关键字</span><el-input class="text" v-model="input" placeholder="请输入关键字" />
    <span class="">关键字</span><el-cascader class="text" :options="options" clearable />
    <span class="">关键字</span>
    <el-select v-model="itemSelect" clearable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
  </div>
  <TableangPage :TableData="tableData" :tableColums="tableColum">
    <template #actions>
        <el-button type="primary" size="small" link>重置密码</el-button>
        <el-button type="primary" size="small" link>修改</el-button>
        <el-button type="primary" size="small" link>删除</el-button>
      </template>
  </TableangPage>
</div>
 
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import {teacherlist} from '@/assets/api/teacher/teacher'
import TableangPage from '@/components/TableangPage.vue'
// 搜索input框
const input = ref('')
// 下拉菜单
const itemSelect = ref('')
console.log(itemSelect);
// 下拉菜单
const option = [
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
// 接连框
const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]
// 列表数据
const tableColum = reactive([
  {
    label: '姓名',
    prop: 'name',
    // width: '150'
  },
  {
    label: '部门',
    prop: 'depname',
    // width: '150'
  },
  {
    label: '电话',
    prop: 'tel',
    // width: '150'
  },
  {
    label: '角色',
    prop: 'rolename',
    // width: '120'
  },
  {
    label: '账号',
    prop: 'username',
    // width: '120'
  },
  {
    label: '操作',
    slotname: 'actions',
    isslot: true
  }
])
// 教资列表
let tableData: any = ref([])
const tealist = async()=>{
  let res:any = await teacherlist()
  console.log(111,res);
  tableData.value = res.data.list
  console.log(22,tableData);
  
}
tealist()

</script>

<style scoped lang="less">
.box{
  width: 100%;
  height: 100%;
  .top_ter{
    display: flex;
    justify-content: space-between;
    .ter{
      font-size: 20px;
    }
  }
  .watchInput{
    span{
      font-size: 15px;
      margin-right: 1%;
    }
    .text{
      width: 10%;
      margin-right: 1%;
    }
  }
}
</style>
