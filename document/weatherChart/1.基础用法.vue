<template>
    <weather-chart ref="chartRef" v-bind="chartOption"></weather-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    icons: [
        'http://sponsors.vuejs.org/images/chrome_frameworks_fund.png',
        'http://cn.vitejs.dev/logo-with-shadow.png',
        'http://v2.cn.vuejs.org/images/logo.svg'
    ],
    dates: ['今天\n03/25', '明天\n03/26', '周三\n03/27', '周四\n03/28', '周五\n03/29', '周六\n03/30', '周日\n03/31', '周一\n04/01'],
    temperature: [[7, 18], [12, 24], [15, 26], [13, 22], [15, 24], [11, 27], [13, 25], [13, 25]]
};

onMounted(() => {
    chartRef?.value?.renderChart();
});
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 859px;
    height: 402px;
    background-color: black;
}
</style>
