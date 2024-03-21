<template>
    <dashboard-chart ref="chartRef" :value="66" :max="100">
        <h4 style="font-size: 16px; color: red; font-weight: 600;">自定义中心</h4>
    </dashboard-chart>
    <dashboard-chart ref="chartRef2" :radius="48" :value="66" :startAngle="90" :endAngle="-270" color="#F0465A"></dashboard-chart>
    <dashboard-chart ref="chartRef3" :radius="48" :value="66" :startAngle="90" :endAngle="-270" color="#1BBE8C"></dashboard-chart>
    <dashboard-chart ref="chartRef4" :radius="48" :value="66" :startAngle="90" :endAngle="-270" color="#405FFE"></dashboard-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const chartRef2 = ref();
const chartRef3 = ref();
const chartRef4 = ref();

const value = 66;
const max = 100;
const chartOption = { value, max };

onMounted(() => {
    chartRef.value.renderChart();
    chartRef2.value.renderChart();
    chartRef3.value.renderChart();
    chartRef4.value.renderChart();
});
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 240px;
    width: 160px;
    display: inline-block;
    background-color: rgb(3, 43, 68);
    &:nth-child(2) {
        width: 240px;
    }
}
</style>
