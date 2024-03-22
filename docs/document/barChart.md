## 1.基础用法
<demo51fe3ef17bba />
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
<demoe99b6a03ff7a />
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
const xAxisHighlightArea = [2, 4, 5];
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
<demo2adda841ff93 />
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
<demob759135d779f />
## 支持方法
<demoaf47e49e23df />
<script setup>
import demo51fe3ef17bba from '../../document/barChart/1.基础用法.vue'
import demoe99b6a03ff7a from '../../document/barChart/2.指定区域高亮.vue'
import demo2adda841ff93 from '../../document/barChart/3.拖拽区域为滚动条.vue'
import demob759135d779f from '../../document/barChart/属性.vue'
import demoaf47e49e23df from '../../document/barChart/支持方法.vue'
</script>