<template>
    <ring-chart2 v-bind="chartOption" ref="chartRef"></ring-chart2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const radius = [45, 82];
const color = ['#d6f0fd', '#396c87', '#60d2ec', '#b8bee0', '#408df7'];
const seriesData = [
    { value: 2, name: '文化、体育和娱乐业' },
    { value: 3, name: '居民服务、修理和其他' },
    { value: 5, name: '科学研究和技术服务业' },
    { value: 4, name: '租赁和商务服务业' },
    { value: 3, name: '物联网、软件和信息服务' }
];
const title = '企业总数';
const unit = '家';
const chartOption = {
    radius,
    color,
    seriesData,
    title,
    unit
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.chart {
    width: 440px;
    height: 296px;
    background-color: rgb(3, 43, 68);
}
</style>