## 1.特殊定制图表
<demof43ac5a46664 />
```vue{4}
<template>
    <ring-chart-7 v-bind="chartOption" ref="chartRef"></ring-chart-7>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const ringSeriesData = [
    { name: '在建', value: 73 },
    { name: '拟建', value: 54 },
    { name: '已建', value: 98 }
];
const barSeriesData = [73, 54];

const chartOption = {
    ringSeriesData,
    barSeriesData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.chart {
    height: 256px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.颜色修改
<demo6f68a8adad40 />
```vue{4}
<template>
    <ring-chart-7 v-bind="chartOption" ref="chartRef"></ring-chart-7>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const ringColor = ['red', 'green', 'blue'];
const barColor = ['orange', 'pink', 'purple', 'yellowgreen'];
const ringSeriesData = [
    { name: '在建', value: 73 },
    { name: '拟建', value: 54 },
    { name: '已建', value: 98 }
];
const barSeriesData = [73, 54, 23, 66];
const barHeight = 60;
const lineLength = 50;

const chartOption = {
    ringColor,
    barColor,
    ringSeriesData,
    barSeriesData,
    barHeight,
    lineLength
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.chart {
    height: 256px;
    background-color: rgb(3, 43, 68);
}
</style>
```
<script setup>
import demof43ac5a46664 from '../../document/ringChart7/1.特殊定制图表.vue'
import demo6f68a8adad40 from '../../document/ringChart7/2.颜色修改.vue'
</script>