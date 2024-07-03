## 1.基础用法
<demo075ff9319563 />
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
<demod61e285982b7 />
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
<democ01b47473aec />
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
<demoed7d2240a5b3 />
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
<demod9218a7c31b4 />
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
<demo0adfcddfc8d6 />
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
<demobb0403f111d4 />
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
<demoab24bf6812e6 />
## 支持方法
<demoe6a0234bc7ad />
<script setup>
import demo075ff9319563 from '../../document/barChart2/1.基础用法.vue'
import demod61e285982b7 from '../../document/barChart2/2.滑块间距设置.vue'
import democ01b47473aec from '../../document/barChart2/3.修改 tooltip 标题.vue'
import demoed7d2240a5b3 from '../../document/barChart2/4.部分区域高亮.vue'
import demod9218a7c31b4 from '../../document/barChart2/5.隐藏 y 轴每项背景.vue'
import demo0adfcddfc8d6 from '../../document/barChart2/6.隐藏辅助刻度线.vue'
import demobb0403f111d4 from '../../document/barChart2/7.柱宽与数值显示.vue'
import demoab24bf6812e6 from '../../document/barChart2/属性.vue'
import demoe6a0234bc7ad from '../../document/barChart2/支持方法.vue'
</script>