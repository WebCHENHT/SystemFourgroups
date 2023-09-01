<template>
  <div class="table-box">
    <el-table
      v-loading="loading"
      :data="props.TableData"
      show-overflow-tooltip="true"
      header-align="center"
      :border="false"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选 -->
      <el-table-column
        v-if="isselect"
        align="center"
        type="selection"
        width="55"
      />
      <template v-for="(item, index) in props.tableColums">
        <el-table-column
          v-if="!item.isslot"
          align="center"
          :show-overflow-tooltip="true"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
        </el-table-column>

        <el-table-column
          v-if="item.isslot"
          :key="index"
          :label="item.label"
          :width="item.width"
          align="center"
        >
          <!-- 作用域插槽 -->
          <template v-slot="scope: any">
            <!-- 插槽 -->
            <slot :name="item.slotname" :data="scope.row"> </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
  <div class="demo-pagination-block" v-if="props.showPage">
    <el-pagination
      align="center"
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 50, 100]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, defineProps, defineEmits } from 'vue';

let props: any = defineProps({
  //
  TableData: {
    type: Array,
    default: () => [],
  },
  //列表数据名称
  tableColums: {
    type: Array,
    default: () => [],
  },

  //
  isselect: {
    type: Boolean,
    default: false,
  },
  //
  loading: {
    type: Boolean,
    default: false,
  },
  //
  isexpand: {
    type: Boolean,
    default: false,
  },
  //总页数
  total: {
    type: Number,
    default: () => 0,
  },
  showPage: {
    type: Boolean,
    default: () => true,
  },
});

const emit = defineEmits([
  'allTableData',
  'sonhandleSizeChange',
  'sonhandleCurrentChange',
]);

// 表格全选
const handleSelectionChange = (val: object[]) => {
  emit('allTableData', val);
};

// 传递给父组件数据
const currentPage4 = ref(1);
const pageSize4 = ref(10);
// 一页多少条
const handleSizeChange = (val: number) => {
  emit('sonhandleSizeChange', val);
};
// 跳到多少页
const handleCurrentChange = (val: number) => {
  emit('sonhandleCurrentChange', val);
};
onMounted(() => {});
</script>

<style lang="less">
// @import url('@/assets/css/table.css');
</style>
<style>
.demo-pagination-block {
  margin: 15px auto 0px;
  display: flex;
  justify-content: center;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
