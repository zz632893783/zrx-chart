## 1.基础用法
<demob88126c5ef49 />
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
<demo8d9c0b5379c8 />
## 支持方法
<demo478f34d7cdab />
<script setup>
import demob88126c5ef49 from '../../document/ringChart4/1.基础用法.vue'
import demo8d9c0b5379c8 from '../../document/ringChart4/属性.vue'
import demo478f34d7cdab from '../../document/ringChart4/支持方法.vue'
</script>