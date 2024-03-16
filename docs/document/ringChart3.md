## 1.基础用法
<demo6ef0db27d713 />
```vue{4}
<template>
    <ring-chart-3 class="ring-chart" ref="chartRef"></ring-chart-3>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.ring-chart {
    height: 340px;
    background-color: white;
}
</style>

```
<script setup>
import demo6ef0db27d713 from '../../document/ringChart3/1.基础用法.vue'
</script>