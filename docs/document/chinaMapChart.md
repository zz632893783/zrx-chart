## 1.基础用法(画像app)
<demo398ba506cdb4 />
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
<demo81dedb63a504 />
<script setup>
import demo398ba506cdb4 from '../../document/chinaMapChart/1.基础用法(画像app).vue'
import demo81dedb63a504 from '../../document/chinaMapChart/属性.vue'
</script>