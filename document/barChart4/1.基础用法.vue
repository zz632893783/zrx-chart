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