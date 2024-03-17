## 1.基础用法
<demof902855e91e3 />
```vue{4}
<template>
    <bar-chart-2 class="bar-chart" ref="chartRef"></bar-chart-2>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.bar-chart {
    height: 340px;
    background-color: white;
}
</style>

```
<script setup>
import demof902855e91e3 from '../../document/barChart2/1.基础用法.vue'
</script>