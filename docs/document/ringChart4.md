## 1.基础用法
<demofb867d6816de />
```vue{4}
<template>
    <ring-chart-4 ref="chartRef"></ring-chart-4>
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
import demofb867d6816de from '../../document/ringChart4/1.基础用法.vue'
</script>