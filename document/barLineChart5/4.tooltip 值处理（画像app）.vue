<template>
    <bar-line-chart-5 ref="chartRef" v-bind="option"></bar-line-chart-5>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
    showLegend: true,
    grid: { right: 40 },
    unit: ['kw/h', '吨', '元'],
    yAxisName: ['左侧y轴', '右侧y轴'],
    legendData: ['总能耗', '总用水', '支出'],
    color: ['#0055FF', '#1FC49D', '#FF9700'],
    xAxisData: new Array(12).fill().map((n, i) => `${ (i + 1).toString().padStart(2, 0) }月`),
    seriesData: [
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [8, 30, 50, 82, 73, 84, 50, 8, 30, 50, 82, 73]
        },
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [32, 94, 61, 11, 52, 68, 58, 32, 94, 61, 11, 52]
        },
        {
            type: 'line',
            yAxisIndex: 1,
            data: [133, 13, 27, 92, 44, 82, 19, 133, 13, 27, 92, 44]
        }
    ],
    tooltipValueFormatter: (value, seriesIndex, dataIndex) => {
    	console.log(value, seriesIndex, dataIndex);
    	return '*****';
    }
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
