## 1.基础用法
<demo138e96549269 />
```vue{4}
<template>
    <ring-chart-5 ref="chartRef"></ring-chart-5>
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
import demo138e96549269 from '../../document/ringChart5/1.基础用法.vue'
</script>