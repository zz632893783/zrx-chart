## 1.基础用法
<demo1e79d44d4430 />
```vue{4}
<template>
    <elderly-ring-bar-chart ref="chartRef"></elderly-ring-bar-chart>
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
import demo1e79d44d4430 from '../../document/elderlyRingBarChart/1.基础用法.vue'
</script>