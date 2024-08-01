## 1.基础用法(画像app)
<demob471fff0c3d4 />
```vue{4}
<template>
    <bar-chart-7 ref="chartRef" v-bind="chartOption"></bar-chart-7>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

// const grid = { right: 60, left: 20 };
const yAxisData = ['<20岁', '20-35岁', '35-50岁', '50-65岁', '>65岁'];
const seriesData = [
    [12, 64, 84, 11, 39],
    [87, 29, 80, 66, 49]
];
const legendData = ['男性', '女性'];

const chartOption = {
    // grid,
	yAxisData,
    seriesData,
    legendData
};

onMounted(() => {
    chartRef.value.renderChart();
});
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 225px;
    width: 350px;
    background-color: white;
}
</style>
```
## 属性
<democ45ccaa25c58 />
<script setup>
import demob471fff0c3d4 from '../../document/barChart7/1.基础用法(画像app).vue'
import democ45ccaa25c58 from '../../document/barChart7/属性.vue'
</script>