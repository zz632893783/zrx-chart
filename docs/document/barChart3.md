## 1.基础用法
<demo8ab55b2d7278 />
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
import demo8ab55b2d7278 from '../../document/barChart3/1.基础用法.vue'
</script>