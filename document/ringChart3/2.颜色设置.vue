<template>
    <ring-chart-3 ref="chartRef" v-bind="chartOption"></ring-chart-3>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    { value: 1048, name: '正常' },
    { value: 735, name: '故障' },
    { value: 580, name: '告警' },
    { value: 484, name: '离线' }
];
const color = ['rgb(0, 221, 255)', 'rgb(55, 162, 255)', 'rgb(255, 0, 135)', 'rgb(255, 191, 0)'];
// 组合配置项
const chartOption = {
    seriesData,
    color
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: white;
}
</style>
