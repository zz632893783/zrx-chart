## 1.基础用法
<demo2f43106e6a04 />
```vue{4}
<template>
    <elderly-ring-chart ref="chartRef"></elderly-ring-chart>
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
import demo2f43106e6a04 from '../../document/elderlyRingChart/1.基础用法.vue'
</script>