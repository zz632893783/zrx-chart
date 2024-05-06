## 1.基础用法
<demof6cbfc57389b />
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
<demo9df4f1dabd57 />
## 支持方法
<demod96c38855a2b />
<script setup>
import demof6cbfc57389b from '../../document/ringChart4/1.基础用法.vue'
import demo9df4f1dabd57 from '../../document/ringChart4/属性.vue'
import demod96c38855a2b from '../../document/ringChart4/支持方法.vue'
</script>