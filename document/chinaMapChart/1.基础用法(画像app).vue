<template>
    <china-map-chart ref="chartRef" v-bind="chartOption"></china-map-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

// const seriesData = [];
const chartOption = {
    // seriesData,
    // xAxisData,
    // legendData,
    // yAxisName
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    // width: 375px;
    // height: 300px;
    width: 750px;
    height: 600px;
    background-color: white;
}
</style>
