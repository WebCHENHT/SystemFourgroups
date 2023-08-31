<template>
  <div class="main" ref="dom"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  GridComponent,
  BarChart,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
let dom = ref<HTMLElement | null>(null);
let myChart: any;
onMounted(() => {
  myChart = echarts.init(dom.value as HTMLElement);
});
onBeforeUnmount(() => {
  myChart.dispose();
  myChart = null;
});
const resize = () => myChart.resize();
const getdom = (option: any) => myChart.setOption(option);
defineExpose({
  getdom,
  resize
});

</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
