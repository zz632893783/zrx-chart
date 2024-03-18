## 1.基础用法
<demob677a6fb647e />
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
import demob677a6fb647e from '../../document/ringChart3/1.基础用法.vue'
</script>