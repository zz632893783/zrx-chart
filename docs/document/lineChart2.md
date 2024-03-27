## 1.基础用法
<demofa3c0260231e />
```vue{4}
<template>
    <line-chart-2 v-bind="chartOption" ref="chartRef"></line-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = new Array(12).fill().map((n, i) => `${ i + 1 }月`);
const seriesData = [
    {
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [53, 82, 97, 99, 87, 98, 94, 74, 74, 52, 62, 63]
    },
    {
        yAxisIndex: 1,
        data: [112, 131, 144, 117, 107, 147, 146, 135, 108, 107, 134, 125]
    }
];
const yAxisName = ['亿元', '%'];
const legendData = ['销售额', '贸易额'];
const chartOption = {
    showCount: 9,
    xAxisData,
    seriesData,
    yAxisName,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: #144e8f;
}
</style>
```
## 属性
<demo1a22b6cda2b4 />
<script setup>
import demofa3c0260231e from '../../document/lineChart2/1.基础用法.vue'
import demo1a22b6cda2b4 from '../../document/lineChart2/属性.vue'
</script>