<template>
    辅助线可能位于 y 轴自动计算的最小-最大值区间之外，可通过 beforeSetOption 指定 y 轴最大/最小值控制
    <bar-chart-5 ref="chartRef" v-bind="chartOption"></bar-chart-5>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const markLine = [
    {
        name: '全年目标',
        unit: '万元',
        value: 220,
        yAxisIndex: 0,
        color: '#FA4B31'
    }
];
const chartOption = {
    markLine,
    yAxisName: ['万元', '%'],
    legendData: ['实际值', '当前目标'],
    seriesData: [
        {
            yAxisIndex: 0,
            data: [52, 94, 61, 11, 52, 68, 58, 94, 61, 11, 52, 68]
        },
        {
            yAxisIndex: 1,
            data: [50, 130, 150, 182, 173, 184, 150, 18, 130, 150, 182, 173]
        }
    ],
    xAxisData: ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月', '1-10月', '1-11月', '1-12月'],
    beforeSetOption: option => (option.yAxis[0].max = Math.max(...option.series[0].data, markLine[0].value))
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 310px;
    background-color: black;
}
</style>
