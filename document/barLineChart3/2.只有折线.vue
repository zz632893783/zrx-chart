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
    }
];
const color = ['yellow', 'celeste'];
const yAxisName = ['亿元', '%'];
const legendData = ['销售额', '贸易额'];
const showLineArea = true;
const markLine = [
    {
        value: 77,
        yAxisIndex: 0,
        color: '#F74768'
    }
];
const beforeSetOption = option => {
    option.series.forEach(item => item.type === 'line' && (item.markLine.data[0].label.formatter = param => `目标增速：{value|${ param.value }}`));
};
const chartOption = {
    showCount: 3,
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color,
    showLineArea,
    markLine,
    beforeSetOption
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>