<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const color = ['yellow', 'celeste', 'green', 'grey', 'violet', 'pink'];
const seriesData = [
    {
        // 需要指定类型
        type: 'line',
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'line',
        data: [81, 37, 30, 94, 45, 54, 60, 1, 69]
    },
    {
        type: 'line',
        data: [36, 17, 43, 26, 23, 77, 66, 60, 18]
    },
    {
        type: 'line',
        data: [61, 76, 63, 53, 82, 82, 74, 57, 79]
    },
    {
        type: 'line',
        data: [85, 74, 112, 74, 83, 86, 111, 112, 80]
    },
    {
        type: 'line',
        data: [71, 77, 113, 120, 60, 65, 79, 61, 113]
    },
    {
        type: 'line',
        data: [111, 116, 89, 107, 67, 97, 86, 116, 98]
    },
    {
        type: 'line',
        data: [120, 65, 93, 82, 112, 63, 75, 100, 81]
    }
];
const yAxisName = ['亿元'];
const legendData = ['汽车', '家电', '成品油', '日用品', '化妆品', '粮油', '天然气', '煤炭'];
const tooltipTitle = xAxisData.map(n => `2023年${n}`);
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    tooltipTitle,
    color
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>