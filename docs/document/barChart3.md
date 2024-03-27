## 1.基础用法
<demo89450594de33 />
```vue{4}
<template>
    <bar-chart-3 ref="chartRef" v-bind="chartOption"></bar-chart-3>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [-12, -64, -84, 11, 69, 51, 46, 76, -69],
    [87, 29, -80, -66, 21, -23, 88, 9, -9]
];
const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['33%', '29%', '38%', '21%', '11%', '19%', '33%', '29%', '14%']
];
const legendData = ['建筑业总产值', '前20名产值'];
const chartOption = {
    seriesData,
    yAxisData,
    legendData,
    showCount: 3
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 640px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.调整宽度与显示行数
<demod12204737c37 />
```vue{4}
<template>
    <bar-chart-3 ref="chartRef" v-bind="chartOption"></bar-chart-3>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [-12, -64, -84, 11, 69, 51, 46, 76, -69]
];
const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['33%', '29%', '38%', '21%', '11%', '19%', '33%', '29%', '14%']
];
const legendData = ['建筑业总产值'];
const barWidth = 36;
const showCount = 3;
const showLegend = false;
const dataZoomType = 'slider';

const chartOption = {
    seriesData,
    yAxisData,
    legendData,
    barWidth,
    showCount,
    showLegend,
    dataZoomType
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 640px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 3.设置高亮区域与颜色
<demo4b69df7af6ae />
```vue{4}
<template>
    <bar-chart-3 ref="chartRef" v-bind="chartOption"></bar-chart-3>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [-12, -64, -84, 11, 69, 51, 46, 76, -69],
    [87, 29, -80, -66, 21, -23, 88, 9, -9]
];
const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['33%', '29%', '38%', '21%', '11%', '19%', '33%', '29%', '14%']
];
const legendData = ['建筑业总产值', '前20名产值'];
const barWidth = 18;
const yAxisHighlightArea = [2, 4];
const highlightAreaColor = 'rgba(255, 0, 0, 0.2)';

const chartOption = {
    seriesData,
    yAxisData,
    legendData,
    barWidth,
    yAxisHighlightArea,
    highlightAreaColor
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 640px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<demo3f5fdcc08342 />
## 支持方法
<demodab69002b931 />
<script setup>
import demo89450594de33 from '../../document/barChart3/1.基础用法.vue'
import demod12204737c37 from '../../document/barChart3/2.调整宽度与显示行数.vue'
import demo4b69df7af6ae from '../../document/barChart3/3.设置高亮区域与颜色.vue'
import demo3f5fdcc08342 from '../../document/barChart3/属性.vue'
import demodab69002b931 from '../../document/barChart3/支持方法.vue'
</script>