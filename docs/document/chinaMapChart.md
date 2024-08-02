## 1.基础用法(画像app)
<democ2839721dae5 />
```vue{4}
<template>
    <china-map-chart ref="chartRef" v-bind="chartOption"></china-map-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

// const seriesData = [];
const chartOption = {
    // seriesData,
    // xAxisData,
    // legendData,
    // yAxisName
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    // width: 375px;
    // height: 300px;
    width: 750px;
    height: 600px;
    background-color: white;
}
</style>

```
## 属性
<demo907a5b736e91 />
<script setup>
import democ2839721dae5 from '../../document/chinaMapChart/1.基础用法(画像app).vue'
import demo907a5b736e91 from '../../document/chinaMapChart/属性.vue'
</script>