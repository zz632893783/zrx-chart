## 1.基础用法
<demoe5941279abe5 />
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
import demoe5941279abe5 from '../../document/lineChart/1.基础用法.vue'
</script>