## 1.基础用法
<demod49416eddefc />
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
<demo5e0b450dff93 />
## 支持方法
<demo31524bb268d6 />
<script setup>
import demod49416eddefc from '../../document/ringChart4/1.基础用法.vue'
import demo5e0b450dff93 from '../../document/ringChart4/属性.vue'
import demo31524bb268d6 from '../../document/ringChart4/支持方法.vue'
</script>