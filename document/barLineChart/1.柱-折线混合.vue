<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const color = ['blue', 'green', 'celeste', 'grey'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [101, 31, 66, 120, 123, 9, 22, 128, 62]
    },
    {
        type: 'bar',
        yAxisIndex: 0,
        data: [158, 171, 43, 143, 178, 96, 67, 18, 143]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [389, 283, 213, 315, 313, 256, 304, 233, 372]
    },
    {
        type: 'line',
        lineType: 'dashed',
        yAxisIndex: 1,
        data: [273, 245, 364, 252, 283, 368, 319, 389, 400]
    }
];
const yAxisName = ['亿元', '%'];
const legendData = ['住宅类均价', '办公类均价', '商业类均价', '住宅类增速', '办公类增速', '商业类增速'];
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.chart {
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>