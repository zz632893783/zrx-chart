<template>
    <ring-chart-2 v-bind="chartOption" ref="chartRef"></ring-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    { value: 2, name: '文化、体育和娱乐业' },
    { value: 3, name: '居民服务、修理和其他' },
    { value: 5, name: '科学研究和技术服务业' }
];

const chartOption = {
    seriesData,
    afterSetOption: (option, chart) => {
        chart.on('mouseover', param => chartRef.value.$refs.chartRef.title = param.name);
        chart.on('mouseout', param => chartRef.value.$refs.chartRef.title = '');
    }
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 440px;
    height: 256px;
    background-color: rgb(3, 43, 68);
}
</style>