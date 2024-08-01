## 1.基础用法(画像app)
<demo43d1f59d4a2b />
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
<demoa3dfb72a5fa7 />
<script setup>
import demo43d1f59d4a2b from '../../document/barChart7/1.基础用法(画像app).vue'
import demoa3dfb72a5fa7 from '../../document/barChart7/属性.vue'
</script>