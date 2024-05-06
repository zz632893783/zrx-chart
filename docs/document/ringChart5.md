## 1.基础用法
<demo52bc1484247f />
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
<democe34d5510354 />
## 支持方法
<demod08b6a98c553 />
<script setup>
import demo52bc1484247f from '../../document/ringChart5/1.基础用法.vue'
import democe34d5510354 from '../../document/ringChart5/属性.vue'
import demod08b6a98c553 from '../../document/ringChart5/支持方法.vue'
</script>