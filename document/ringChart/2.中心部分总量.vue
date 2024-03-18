<template>
    <ring-chart v-bind="chartOption" ref="chartRef"></ring-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const centerDisplay = 'sum';
const title = '企业总数';
const unit = '家';
const seriesData = [
    { value: 123, name: '住宿业营业额' },
    { value: 234, name: '餐饮业营业额' },
    { value: 456, name: '零售业营业额' },
    { value: 567, name: '批发业营业额' }
];
const chartOption = {
    title,
    unit,
    seriesData,
    centerDisplay
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 256px;
    height: 256px;
    background-color: rgb(3, 43, 68);
}
</style>