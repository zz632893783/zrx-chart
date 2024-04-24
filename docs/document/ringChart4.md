## 1.基础用法
<democ82324bccf7d />
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
<demo8eecdc2c9d00 />
## 支持方法
<demo87958cf8637d />
<script setup>
import democ82324bccf7d from '../../document/ringChart4/1.基础用法.vue'
import demo8eecdc2c9d00 from '../../document/ringChart4/属性.vue'
import demo87958cf8637d from '../../document/ringChart4/支持方法.vue'
</script>