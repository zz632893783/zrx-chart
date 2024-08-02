## 1.基础用法
<demoaebb42a09b59 />
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
<democd292266a006 />
## 支持方法
<demoaacfe575ff66 />
<script setup>
import demoaebb42a09b59 from '../../document/ringChart4/1.基础用法.vue'
import democd292266a006 from '../../document/ringChart4/属性.vue'
import demoaacfe575ff66 from '../../document/ringChart4/支持方法.vue'
</script>