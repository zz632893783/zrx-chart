<template>
    <radar-chart ref="radarChartRef" v-bind="option"></radar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const radarChartRef = ref();

const indicator = [
    { name: '经营情况', max: 10 },
    { name: '发展潜力', max: 10 },
    { name: '管理能力', max: 10 },
    { name: '贡献能力', max: 10 },
    { name: '能效水平', max: 10 },
    { name: '其他', max: 10 },
    { name: '额外项', max: 10 }
];
const seriesData = [
    [8, 8, 7, 5, 8, 8, 9],
    [5, 3, 6, 6, 7, 7, 2],
    [3, 6, 6, 7, 7, 2, 3]
];
const color = ['green', 'blue', 'orange'];
const option = {
    indicator,
    seriesData,
    color,
    indicatorColor: 'red'
};

onMounted(() => radarChartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    background-color: #042a44;
    padding: 32px;
    width: 450px;
    height: 450px;
}
</style>