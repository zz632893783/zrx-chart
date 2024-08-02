## 1.基础用法
<demo4865e6109e39 />
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
<demo09b7eae2e65d />
## 支持方法
<demo9e6784c9ce40 />
<script setup>
import demo4865e6109e39 from '../../document/ringChart4/1.基础用法.vue'
import demo09b7eae2e65d from '../../document/ringChart4/属性.vue'
import demo9e6784c9ce40 from '../../document/ringChart4/支持方法.vue'
</script>