## 1.基础用法
<demo9788a39b52db />
```vue{4}
<template>
    <bar-chart ref="chartRef" v-bind="chartOption"></bar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [54, 89, 86, 65, 54],
    [95, 97, 75, 72, 90]
];
const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'];
const legendData = ['建筑业总产值', '前20名产值'];
const yAxisName = '亿元';
const chartOption = {
    seriesData,
    xAxisData,
    legendData,
    yAxisName
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: rgb(3, 43, 68);
}
</style>

```
## 2.指定区域高亮
<demo83870e7d7ff5 />
```vue{4}
<template>
    <bar-chart ref="chartRef" v-bind="chartOption"></bar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [54, 89, 86, 65, 54, 89, 86],
    [95, 97, 75, 72, 90, 97, 75]

];
const xAxisData = ['1-3月', '4-6月', '7-9月', '10-12月', '2023年1-3月', '4-6月', '7-9月'];
const legendData = ['建筑业总产值', '前20名产值'];
const yAxisName = '亿元';
const xAxisHighlightArea = [4, 5, 6];
const chartOption = {
    seriesData,
    xAxisData,
    legendData,
    yAxisName,
    xAxisHighlightArea
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 3.拖拽区域为滚动条
<demo1d8efc603072 />
```vue{4}
<template>
    <bar-chart ref="chartRef" v-bind="chartOption"></bar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [54, 89, 86, 65, 54, 53, 72],
    [95, 97, 75, 72, 90, 88, 54]
];
const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const legendData = ['统计金额', '开票金额'];
const showCount = 4;
const dataZoomType = 'slider';

const chartOption = {
    seriesData,
    xAxisData,
    legendData,
    showCount,
    dataZoomType
};

onMounted(() => chartRef.value.renderChart());

</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<demo464e572094eb />
## 支持方法
<demo5ff65bda64ab />
<script setup>
import demo9788a39b52db from '../../document/barChart/1.基础用法.vue'
import demo83870e7d7ff5 from '../../document/barChart/2.指定区域高亮.vue'
import demo1d8efc603072 from '../../document/barChart/3.拖拽区域为滚动条.vue'
import demo464e572094eb from '../../document/barChart/属性.vue'
import demo5ff65bda64ab from '../../document/barChart/支持方法.vue'
</script>