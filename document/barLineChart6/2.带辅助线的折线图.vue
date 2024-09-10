<template>
    <bar-line-chart-6 ref="chartRef" v-bind="option"></bar-line-chart-6>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
	smooth: true,
	showLineArea: true,
    showLegend: true,
    color: ['#0055FF', '#1FC49D'],
    grid: { right: 40 },
    unit: ['kw/h'],
    yAxisName: ['%'],
    legendData: ['总能耗', '总用水'],
    xAxisData: new Array(12).fill().map((n, i) => `${ (i + 1).toString().padStart(2, 0) }月`),
    markLine: [
	    {
	        value: 77,
	        yAxisIndex: 0,
	        color: '#FF9700'
	    }
	],
    seriesData: [
        {
            type: 'line',
            yAxisIndex: 0,
            data: [8, 30, 50, 82, 73, 84, 50, 8, 30, 50, 82, 73]
        },
        {
            type: 'line',
            yAxisIndex: 0,
            data: [133, 13, 27, 92, 44, 82, 19, 133, 13, 27, 92, 44]
        }
    ],
    beforeSetOption: option =>
    	option.series.forEach(item => item.type === 'line' && (item.markLine.data[0].label.formatter = param => `目标增速：{value|${ param.value }}`))
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
