## 1.基础用法
<demoebf7313da46e />
```vue{4}
<template>
    <bar-chart-3 ref="chartRef"></bar-chart-3>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
<script setup>
import demoebf7313da46e from '../../document/barChart3/1.基础用法.vue'
</script>