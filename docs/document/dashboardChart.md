## 1.基础用法
<demo97f7f469ce7f />
```vue{4}
<template>
    <dashboard-chart class="dashboard-chart" ref="chartRef" v-bind="chartOption">
        <h4 style="font-size: 16px; color: red; font-weight: 600;">自定义中心</h4>
    </dashboard-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const value = 66;
const max = 100;
const chartOption = { value, max };

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.dashboard-chart {
    width: 440px;
    height: 240px;
    background-color: rgb(3, 43, 68);
}
</style>

```
<script setup>
import demo97f7f469ce7f from '../../document/dashboardChart/1.基础用法.vue'
</script>