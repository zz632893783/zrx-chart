## 1.基础用法
<demoe7d82941d13f />
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
import demoe7d82941d13f from '../../document/elderlyRingBarChart/1.基础用法.vue'
</script>