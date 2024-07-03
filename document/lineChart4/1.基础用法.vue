<template>
    <line-chart-4 ref="chartRef" v-bind="chartOption"></line-chart-4>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月', '1-10月', '1-11月', '1-12月'];
const seriesData = [
    {
        yAxisIndex: 0,
        data: [18, 130, 150, 182, 173, 184, 150, 18, 130, 150, 182, 173]
    },
    {
        yAxisIndex: 1,
        data: [32, 94, 61, 11, 52, 68, 58, 94, 61, 11, 52, 68]
    }
];
const unit = ['万元', '%'];
const yAxisName = ['万元', '%'];
const legendData = ['实际毛利率', '目标毛利率'];
// 组合配置项
const chartOption = {
    unit,
    xAxisData,
    yAxisName,
    seriesData,
    legendData,
    showCount: 4
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 250px;
    width: 420px;
    background-color: rgb(11, 31, 49);
}
</style>
