## 1.基础用法
<democe80e8926c38 />
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
<demo5c21a094d8f8 />
## 支持方法
<democde62a541c0f />
<script setup>
import democe80e8926c38 from '../../document/ringChart5/1.基础用法.vue'
import demo5c21a094d8f8 from '../../document/ringChart5/属性.vue'
import democde62a541c0f from '../../document/ringChart5/支持方法.vue'
</script>