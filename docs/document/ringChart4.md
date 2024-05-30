## 1.基础用法
<democa14311f426c />
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
<demoa1f49fdb5bcb />
## 支持方法
<demo25dd9ae4af65 />
<script setup>
import democa14311f426c from '../../document/ringChart4/1.基础用法.vue'
import demoa1f49fdb5bcb from '../../document/ringChart4/属性.vue'
import demo25dd9ae4af65 from '../../document/ringChart4/支持方法.vue'
</script>