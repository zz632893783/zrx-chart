## 1.基础用法
<demo9b6e3154ea51 />
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
<demoa43d7323bd41 />
## 支持方法
<demo544525926f6a />
<script setup>
import demo9b6e3154ea51 from '../../document/ringChart4/1.基础用法.vue'
import demoa43d7323bd41 from '../../document/ringChart4/属性.vue'
import demo544525926f6a from '../../document/ringChart4/支持方法.vue'
</script>