## 1.基础用法
<demo8f6cd5ee4d82 />
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
<democ25a9df01423 />
## 支持方法
<demoeee4900b212c />
<script setup>
import demo8f6cd5ee4d82 from '../../document/ringChart5/1.基础用法.vue'
import democ25a9df01423 from '../../document/ringChart5/属性.vue'
import demoeee4900b212c from '../../document/ringChart5/支持方法.vue'
</script>