## 1.基础用法
<demo38e83ebf90bd />
```vue{4}
<template>
    <ring-chart-6 ref="chartRef"></ring-chart-6>
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
import demo38e83ebf90bd from '../../document/ringChart6/1.基础用法.vue'
</script>