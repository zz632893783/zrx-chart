## 1.基础用法
<demo64b50f6af730 />
```vue{4}
<template>
    <bar-chart-2 ref="chartRef" v-bind="option"></bar-chart-2>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seriesData = [
    [8, 30, 50, 82, 73, 84, 50],
    [32, 94, 61, 11, 52, 68, 58],
    [33, 13, 27, 92, 44, 82, 19]
];
const legendData = ['总能耗', '能耗照明', '节约能耗', '同环比'];
const yAxisName = '用量';
const unit = ['kw/h', '度', '千焦耳'];
// 组合配置项
const option = {
    xAxisData,
    seriesData,
    legendData,
    yAxisName,
    unit
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: white;
}
</style>

```
## 属性
<demo58ece86a5d0e />
## 支持方法
<democe5299612df7 />
<script setup>
import demo64b50f6af730 from '../../document/barChart2/1.基础用法.vue'
import demo58ece86a5d0e from '../../document/barChart2/属性.vue'
import democe5299612df7 from '../../document/barChart2/支持方法.vue'
</script>