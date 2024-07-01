## 1.基础用法
<demo8e0b9244c03a />
```vue{4}
<template>
    <ring-chart-5 ref="chartRef" v-bind="chartOption"></ring-chart-5>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    { value: 1048, name: '正常' },
    { value: 735, name: '故障' },
    { value: 580, name: '告警' },
    { value: 484, name: '离线' },
    { value: 123, name: '危险' }
];
// 组合配置项
const chartOption = {
    seriesData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<demod0ca54385461 />
## 支持方法
<demobaf73c812cfc />
<script setup>
import demo8e0b9244c03a from '../../document/ringChart5/1.基础用法.vue'
import demod0ca54385461 from '../../document/ringChart5/属性.vue'
import demobaf73c812cfc from '../../document/ringChart5/支持方法.vue'
</script>