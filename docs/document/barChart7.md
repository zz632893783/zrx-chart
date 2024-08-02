## 1.基础用法(画像app)
<demo7186755e6d26 />
```vue{4}
<template>
    <bar-chart-7 ref="chartRef" v-bind="chartOption"></bar-chart-7>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    legendData: ['男性', '女性'],
	yAxisData: ['<20岁', '20-35岁', '35-50岁', '50-65岁', '>65岁'],
    seriesData: [
        [12, 64, 84, 11, 39],
        [87, 29, 80, 66, 49]
    ]
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
<demod847f9b361b0 />
<script setup>
import demo7186755e6d26 from '../../document/barChart7/1.基础用法(画像app).vue'
import demod847f9b361b0 from '../../document/barChart7/属性.vue'
</script>