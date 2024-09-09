<template>
    <ring-chart-3 ref="chartRef" v-bind="chartOption"></ring-chart-3>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

// 组合配置项
const chartOption = {
    unit: '亿元',
    seriesData: [
	    { value: 1048, name: '正常' },
	    { value: 735, name: '故障' },
	    { value: 580, name: '告警' },
	    { value: 484, name: '离线' }
	],
    similarBackgroundColor: true
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: white;
}
</style>
