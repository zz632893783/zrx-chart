## 1.特殊定制图表
<demo12d4541fb02a />
```vue{4}
<template>
    <ring-chart-6 v-bind="chartOption" ref="chartRef"></ring-chart-6>
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
.zrx-chart {
    height: 256px;
    width: 300px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.颜色修改
<demob6a610127654 />
```vue{4}
<template>
    <ring-chart-6 v-bind="chartOption" ref="chartRef"></ring-chart-6>
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
.zrx-chart {
    height: 256px;
    width: 300px;
    background-color: rgb(3, 43, 68);
}
</style>
```
<script setup>
import demo12d4541fb02a from '../../document/ringChart6/1.特殊定制图表.vue'
import demob6a610127654 from '../../document/ringChart6/2.颜色修改.vue'
</script>