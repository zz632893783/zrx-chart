## 1.基础用法
<democ59b8e99d624 />
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
import democ59b8e99d624 from '../../document/elderlyRingChart/1.基础用法.vue'
</script>