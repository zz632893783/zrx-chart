<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const yAxisName = ['家', '%'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [81, 37, 30, 94, 45, 54, 60, 1, 69]
    },
    {
        type: 'bar',
        yAxisIndex: 0,
        data: [36, 17, 43, 26, 23, 77, 66, 60, 18]
    }
];
const legendData = ['总数', '房建', '市政'];
const xAxisHighlightArea = [3, 4];
const chartOption = {
    xAxisData,
    yAxisName,
    seriesData,
    legendData,
    xAxisHighlightArea
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.chart {
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>