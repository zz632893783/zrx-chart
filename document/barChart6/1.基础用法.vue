<template>
    <bar-chart-6 ref="chartRef" v-bind="chartOption"></bar-chart-6>
    <div class="line"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const seriesData = [
    {
        yAxisIndex: 0,
        // data: [50, 130, 150, 182, 173, 184, 150, 18, 130, 150, 182, 173]
        data: [20, 130]
    },
    {
        yAxisIndex: 1,
        // data: [52, 94, 61, 11, 52, 68, 58, 94, 61, 11, 52, 68]
        data: [152, 94]
    },
    {
        yAxisIndex: 0,
        // data: [52, 94, 61, 11, 52, 68, 58, 94, 61, 11, 52, 68]
        data: [52, 94]
    }
];
const xAxisData = ['1月', '1-2月'];
const unit = ['万元', '%'];
const yAxisName = ['万元', '%'];
const legendData = ['申请', '审批', '完成'];

const chartOption = {
    unit,
    xAxisData,
    yAxisName,
    seriesData,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 180px;
    width: 420px;
    // background-image: url('./bg.png');
    background-color: black;
}
</style>
