## 1.基础用法
<demo0a2fef99fa0e />
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
<demo906b8b13464c />
## 支持方法
<demo4f12c3fe9bd2 />
<script setup>
import demo0a2fef99fa0e from '../../document/ringChart5/1.基础用法.vue'
import demo906b8b13464c from '../../document/ringChart5/属性.vue'
import demo4f12c3fe9bd2 from '../../document/ringChart5/支持方法.vue'
</script>