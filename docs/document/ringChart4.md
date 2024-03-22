## 1.基础用法
<demo5b37e2155e70 />
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
<demod5fc29862cb4 />
## 支持方法
<demo13054dafc712 />
<script setup>
import demo5b37e2155e70 from '../../document/ringChart4/1.基础用法.vue'
import demod5fc29862cb4 from '../../document/ringChart4/属性.vue'
import demo13054dafc712 from '../../document/ringChart4/支持方法.vue'
</script>