## 1.基础用法
<demoe58b16fa56d2 />
```vue{4}
<template>
    <bar-chart-2 ref="chartRef" v-bind="option"></bar-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['农', '工', '建', '批', '交', '住', '金', '房', '其']
];
const seriesData = [
    [54, -89, -86, 65, 54, 53, -72, 65, -60],
    [95, -97, 75, 72, 90, -88, 54, -77, -98]
];
const legendData = ['统计金额', '开票金额'];
// 组合配置项
const option = {
    yAxisData,
    seriesData,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.滑块间距设置
<demo632c2915e505 />
```vue{4}
<template>
    <bar-chart-2 ref="chartRef" v-bind="option"></bar-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['农', '工', '建', '批', '交', '住', '金', '房', '其']
];
const seriesData = [
    [54, -89, -86, 65, 54, 53, -72, 65, -60],
    [95, -97, 75, 72, 90, -88, 54, -77, -98],
];
const legendData = ['统计金额', '1开票金额'];
const grid = { right: 100 };
const dataZoomRight = 32;
// 组合配置项
const option = {
    yAxisData,
    seriesData,
    legendData,
    grid,
    dataZoomRight
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 3.修改 tooltip 标题
<demo68fabeda028d />
```vue{4}
<template>
    <bar-chart-2 ref="chartRef" v-bind="option"></bar-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['农', '工', '建', '批', '交', '住', '金', '房', '其']
];
const seriesData = [
    [54, -89, -86, 65, 54, 53, -72, 65, -60],
    [95, -97, 75, 72, 90, -88, 54, -77, -98]
];
const legendData = ['统计金额', '开票金额'];
const tooltipTitle = new Array(10).fill().map((n, i) => `第 ${ i + 1 } 个 tooltip 标题`);
// 组合配置项
const option = {
    yAxisData,
    seriesData,
    legendData,
    tooltipTitle
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 4.部分区域高亮
<demob8b6473e3c03 />
```vue{4}
<template>
    <bar-chart-2 ref="chartRef" v-bind="option"></bar-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['农', '工', '建', '批', '交', '住', '金', '房', '其']
];
const seriesData = [
    [54, -89, -86, 65, 54, 53, -72, 65, -60],
    [95, -97, 75, 72, 90, -88, 54, -77, -98]
];
const legendData = ['统计金额', '开票金额'];
const yAxisHighlightArea = [2, 4];
// 组合配置项
const option = {
    yAxisData,
    seriesData,
    legendData,
    yAxisHighlightArea,
    highlightAreaColor: 'rgba(255, 0, 0, 0.3)'
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 5.隐藏 y 轴每项背景
<demo90b382a7fb50 />
```vue{4}
<template>
    <bar-chart-2 ref="chartRef" v-bind="option"></bar-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['农', '工', '建', '批', '交', '住', '金', '房', '其']
];
const seriesData = [
    [54, -89, -86, 65, 54, 53, -72, 65, -60],
    [95, -97, 75, 72, 90, -88, 54, -77, -98]
];
const legendData = ['统计金额', '开票金额'];
const showItemBackground = false;
// 组合配置项
const option = {
    yAxisData,
    seriesData,
    legendData,
    showItemBackground
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 6.隐藏辅助刻度线
<demob16b31d9e15b />
```vue{4}
<template>
    <bar-chart-2 ref="chartRef" v-bind="option"></bar-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['农', '工', '建', '批', '交', '住', '金', '房', '其']
];
const seriesData = [
    [54, -89, -86, 65, 54, 53, -72, 65, -60],
    [95, -97, 75, 72, 90, -88, 54, -77, -98]
];
const legendData = ['统计金额', '开票金额'];
const showSplitLine = false;
// 组合配置项
const option = {
    yAxisData,
    seriesData,
    legendData,
    showSplitLine
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 7.柱宽与数值显示
<demo8dd7b4583a3b />
```vue{4}
<template>
    <bar-chart-2 ref="chartRef" v-bind="option"></bar-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const yAxisData = [
    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
    ['农', '工', '建', '批', '交', '住', '金', '房', '其']
];
const seriesData = [
    [54, -89, -86, 65, 54, 53, -72, 65, -60],
    [95, -97, 75, 72, 90, -88, 54, -77, -98]
];
const legendData = ['统计金额', '开票金额'];
const barWidth = 12;
const showSeriesLabel = false;
// 组合配置项
const option = {
    yAxisData,
    seriesData,
    legendData,
    barWidth,
    showSeriesLabel
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<demo97e67d98eda8 />
## 支持方法
<demo3921587ab46a />
<script setup>
import demoe58b16fa56d2 from '../../document/barChart2/1.基础用法.vue'
import demo632c2915e505 from '../../document/barChart2/2.滑块间距设置.vue'
import demo68fabeda028d from '../../document/barChart2/3.修改 tooltip 标题.vue'
import demob8b6473e3c03 from '../../document/barChart2/4.部分区域高亮.vue'
import demo90b382a7fb50 from '../../document/barChart2/5.隐藏 y 轴每项背景.vue'
import demob16b31d9e15b from '../../document/barChart2/6.隐藏辅助刻度线.vue'
import demo8dd7b4583a3b from '../../document/barChart2/7.柱宽与数值显示.vue'
import demo97e67d98eda8 from '../../document/barChart2/属性.vue'
import demo3921587ab46a from '../../document/barChart2/支持方法.vue'
</script>