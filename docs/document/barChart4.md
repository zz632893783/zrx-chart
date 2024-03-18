## 1.基础用法
<demod93df14b4542 />
```vue{4}
<template>
    <bar-chart-4 class="bar-chart" ref="chartRef" v-bind="chartOption"></bar-chart-4>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [-12, -64, -84, 11, 69, 51, 46, 76, -69],
    [87, 29, -80, -66, 21, -23, 88, 9, -9]
];
const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['33%', '29%', '38%', '21%', '11%', '19%', '33%', '29%', '14%']
];
const legendData = ['建筑业总产值', '前20名产值'];
const chartOption = {
    seriesData,
    yAxisData,
    legendData,
    showCount: 3
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.bar-chart {
    height: 640px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.基础用法
<demo67524eaa3e1a />
```vue{4}
<template>
    <bar-chart-4 class="bar-chart" ref="chartRef" v-bind="chartOption"></bar-chart-4>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [-12, -64, -84, 11, 69, 51, 46, 76, -69]
];
const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['33%', '29%', '38%', '21%', '11%', '19%', '33%', '29%', '14%']
];
const legendData = ['建筑业总产值', '前20名产值'];
const barWidth = 36;
const showCount = 3;
const showLegend = false;
const dataZoomType = 'slider';

const chartOption = {
    seriesData,
    yAxisData,
    legendData,
    barWidth,
    showCount,
    showLegend,
    dataZoomType
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.bar-chart {
    height: 640px;
    background-color: rgb(3, 43, 68);
}
</style>
```
<script setup>
import demod93df14b4542 from '../../document/barChart4/1.基础用法.vue'
import demo67524eaa3e1a from '../../document/barChart4/2.基础用法.vue'
</script>