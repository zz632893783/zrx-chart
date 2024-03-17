## 1.基础用法
<demoe12a55c314b0 />
```vue{4}
<template>
    <elderly-horizontal-bar-chart ref="chartRef"></elderly-horizontal-bar-chart>
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
import demoe12a55c314b0 from '../../document/elderlyHorizontalBarChart/1.基础用法.vue'
</script>