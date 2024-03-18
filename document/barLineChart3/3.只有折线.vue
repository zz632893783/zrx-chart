<template>
    <bar-line-chart-3 v-bind="chartOption" ref="chartRef"></bar-line-chart-3>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'line',
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'line',
        data: [81, 17, 30, 94, 45, 54, 60, 1, 69]
    },
    {
        type: 'line',
        data: [82, 85, 74, 70, 63, 85, 62, 50, 69, 65]
    },
    {
        type: 'line',
        data: [88, 53, 96, 80, 100, 93, 77, 84, 71, 80]
    },
    {
        type: 'line',
        data: [59, 94, 86, 70, 93, 80, 74, 93, 85, 90]
    }
];
const color = ['yellow', 'celeste', 'green', 'grey', 'pink'];
const yAxisName = ['亿元'];
const legendData = ['香洲区', '金湾区', '斗门区', '高新区', '鹤洲新区'];
const chartOption = {
    showCount: 3,
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>