## 1.基础用法
<demo699de53b7696 />
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
<demo6464a5c7e917 />
## 支持方法
<demo21af302f5ae9 />
<script setup>
import demo699de53b7696 from '../../document/ringChart4/1.基础用法.vue'
import demo6464a5c7e917 from '../../document/ringChart4/属性.vue'
import demo21af302f5ae9 from '../../document/ringChart4/支持方法.vue'
</script>