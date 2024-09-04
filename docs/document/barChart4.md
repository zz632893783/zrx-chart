## 1.基础用法
<demo87e29922459d />
```vue{4}
<template>
    <bar-chart-4 ref="chartRef" v-bind="chartOption"></bar-chart-4>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const yAxisData = ['0-6岁', '7-17岁', '18-35岁', '36-50岁', '51-65岁', '65-89岁', '>80岁'];
const seriesData = [
    [12, 64, 84, 11, 39, 69, 51],
    [87, 29, 80, 66, 49, 21, 23]
];
const legendData = ['男性', '女性'];

const chartOption = {
    yAxisData,
    seriesData,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 440px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.拖动
<demobfe154da5c4c />
```vue{4}
<template>
    <bar-chart-4 ref="chartRef" v-bind="{ ...chartOption }"></bar-chart-4>
    <bar-chart-4 ref="chartRef2" v-bind="{ ...chartOption, dataZoomType: 'slider' }"></bar-chart-4>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const chartRef2 = ref();

const grid = { right: 60, left: 20 };
const yAxisData = ['0-6岁', '7-17岁', '18-35岁', '36-50岁', '51-65岁', '65-89岁', '>80岁'];
const seriesData = [
    [12, 64, 84, 11, 39, 69, 51],
    [87, 29, 80, 66, 49, 21, 23]
];
const legendData = ['男性', '女性'];

const chartOption = {
    grid,
	yAxisData,
    seriesData,
    legendData,
    showCount: 3
};

onMounted(() => {
    chartRef.value.renderChart();
    chartRef2.value.renderChart();
});
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 440px;
    display: inline-block;
    width: 500px;
    background-color: rgb(3, 43, 68);
    margin: 0 32px 0 0;
}
</style>
```
## 属性
<demoefc82b4cf094 />
<script setup>
import demo87e29922459d from '../../document/barChart4/1.基础用法.vue'
import demobfe154da5c4c from '../../document/barChart4/2.拖动.vue'
import demoefc82b4cf094 from '../../document/barChart4/属性.vue'
</script>