## 1.基础用法
<demo260aed74ff57 />
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
<demo91b86022bcc0 />
## 支持方法
<demoed9ea25f1206 />
<script setup>
import demo260aed74ff57 from '../../document/ringChart5/1.基础用法.vue'
import demo91b86022bcc0 from '../../document/ringChart5/属性.vue'
import demoed9ea25f1206 from '../../document/ringChart5/支持方法.vue'
</script>