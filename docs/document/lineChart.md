## 1.基础用法
<demo71c2bbc03523 />
```vue{4}
<template>
    <line-chart class="line-chart" ref="chartRef"></line-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.line-chart {
    height: 340px;
    background-color: white;
}
</style>

```
<script setup>
import demo71c2bbc03523 from '../../document/lineChart/1.基础用法.vue'
</script>