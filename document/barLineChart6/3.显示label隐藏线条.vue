<template>
    <bar-line-chart-6 ref="chartRef" v-bind="option"></bar-line-chart-6>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
    showLegend: true,
    color: ['#0055FF', '#FF9700'],
    grid: { right: 40 },
    unit: ['亿元', '%'],
    yAxisName: ['亿元', '%'],
    legendData: ['地区生产总值', '同比增速'],
    xAxisData: new Array(12).fill().map((n, i) => `${ (i + 1).toString().padStart(2, 0) }月`),
    seriesData: [
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [8, 30, 50, 82, 73, 84, 50, 8, 30, 50, 82, 73]
        },
        {
            type: 'line',
            yAxisIndex: 1,
            showLabel: true,
            data: [133, 13, 27, 92, 44, 82, 19, 133, 13, 27, 92, 44]
        }
    ],
    beforeSetOption: option => option.series.forEach(n => n.type === 'line' && (n.lineStyle.color = 'transparent'))
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 350px;
    height: 272px;
    background-color: white;
}
</style>
