## 1.基础用法
<demo5e13bb353d29 />
```vue{4}
<template>
    <elderly-ring-chart-2 ref="chartRef"></elderly-ring-chart-2>
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
import demo5e13bb353d29 from '../../document/elderlyRingChart2/1.基础用法.vue'
</script>