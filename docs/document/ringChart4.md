## 1.基础用法
<demodfc411d21357 />
```vue{4}
<template>
    <ring-chart-4 ref="chartRef" v-bind="chartOption"></ring-chart-4>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    { value: 1048, name: '正常' },
    { value: 735, name: '故障' },
    { value: 580, name: '告警' },
    { value: 484, name: '离线' }
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
<demo9da463ba111b />
## 支持方法
<demo5dba8ceb13cd />
<script setup>
import demodfc411d21357 from '../../document/ringChart4/1.基础用法.vue'
import demo9da463ba111b from '../../document/ringChart4/属性.vue'
import demo5dba8ceb13cd from '../../document/ringChart4/支持方法.vue'
</script>