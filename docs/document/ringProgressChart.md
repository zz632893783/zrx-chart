## 1.基础用法
<demo6d5531ad3252 />
```vue{4}
<template>
    <ring-progress-chart class="ring-progress-chart" ref="chartRef" :value="20"></ring-progress-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.ring-progress-chart {
    height: 340px;
    background-color: white;
}
</style>

```
<script setup>
import demo6d5531ad3252 from '../../document/ringProgressChart/1.基础用法.vue'
</script>