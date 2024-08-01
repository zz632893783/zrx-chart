## 1.基础用法
<demoa97dcac8c460 />
```vue{4}
<template>
    <weather-chart ref="chartRef" v-bind="chartOption"></weather-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    icons: [
        'http://cn.vitejs.dev/logo-with-shadow.png',
        'http://v2.cn.vuejs.org/images/logo.svg',
        'http://sponsors.vuejs.org/images/chrome_frameworks_fund.png'
    ],
    dates: ['今天\n03/25', '明天\n03/26', '周三\n03/27', '周四\n03/28', '周五\n03/29', '周六\n03/30', '周日\n03/31', '周一\n04/01', '周二\n04/02'],
    temperature: [[7, 18], [12, 24], [15, 26], [13, 22], [15, 24], [11, 27], [13, 25], [11, 27], [13, 25]]
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

```
## 属性
<demo99bdf47bbde0 />
<script setup>
import demoa97dcac8c460 from '../../document/weatherChart/1.基础用法.vue'
import demo99bdf47bbde0 from '../../document/weatherChart/属性.vue'
</script>