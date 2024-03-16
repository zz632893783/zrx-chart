<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
    <el-button style="margin: 20px 0;" type="primary" @click="changeLineState">显示/隐藏</el-button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

let chart = null;
// 回调函数获取 chart 对象
const afterSetOption = (option, c) => (chart = c);
// 按钮触发图表事件
const changeLineState = v => chart.dispatchAction({
    type: 'legendToggleSelect',
    name: legendData[0]
});

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    }
];
const yAxisName = ['亿元'];
const legendData = ['营业额'];
const showLegend = false;
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    showLegend,
    afterSetOption
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.chart {
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>