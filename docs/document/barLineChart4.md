## 1.基础用法
<demo0199239fbe64 />
```vue{4}
<template>
    <bar-line-chart-4 ref="chartRef" v-bind="option"></bar-line-chart-4>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seriesData = [
    {
        type: 'bar',
        data: [8, 30, 50, 82, 73, 84, 50]
    }
];
const color = ['#405FFE'];
const legendData = ['总能耗', '能耗照明', '节约能耗', '同环比'];
const yAxisName = '用量';
const unit = ['kw/h', '度', '千焦耳'];
// 组合配置项
const option = {
    xAxisData,
    seriesData,
    legendData,
    yAxisName,
    unit
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: white;
}
</style>

```
## 2.宽度颜色调整
<demoa52c252cbadc />
```vue{4}
<template>
    <bar-line-chart-4 ref="chartRef" v-bind="option"></bar-line-chart-4>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seriesData = [
    {
        type: 'bar',
        yAxisIndex: 0,
        data: [8, 30, 50, 82, 73, 84, 50]
    },
    {
        type: 'bar',
        yAxisIndex: 0,
        data: [32, 94, 61, 11, 52, 68, 58]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [133, 13, 27, 92, 44, 82, 19]
    }
];
const legendData = ['总能耗', '总用水', '支出'];
const yAxisName = ['左侧y轴', '右侧y轴'];
const unit = ['kw/h'];
const barWidth = 8;
const color = ['#405FFE', '#B8BED5', '#FFA433'];
const showLegend = true;
const grid = { right: 60 };
// 组合配置项
const option = {
    xAxisData,
    seriesData,
    legendData,
    barWidth,
    unit,
    color,
    showLegend,
    yAxisName,
    grid
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: white;
}
</style>

```
## 属性
<demo82b55d3ad01a />
## 支持方法
<demof8904c8e73c5 />
<script setup>
import demo0199239fbe64 from '../../document/barLineChart4/1.基础用法.vue'
import demoa52c252cbadc from '../../document/barLineChart4/2.宽度颜色调整.vue'
import demo82b55d3ad01a from '../../document/barLineChart4/属性.vue'
import demof8904c8e73c5 from '../../document/barLineChart4/支持方法.vue'
</script>