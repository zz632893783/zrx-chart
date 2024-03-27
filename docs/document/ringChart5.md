## 1.基础用法
<demo3263d1a175dc />
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
<demoa736f4f3382f />
## 支持方法
<demo4d4504ff6945 />
<script setup>
import demo3263d1a175dc from '../../document/ringChart5/1.基础用法.vue'
import demoa736f4f3382f from '../../document/ringChart5/属性.vue'
import demo4d4504ff6945 from '../../document/ringChart5/支持方法.vue'
</script>