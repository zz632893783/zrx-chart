## 1.基础用法
<demo174b4e504d85 />
```vue{4}
<template>
    <line-chart ref="chartRef" v-bind="chartOption"></line-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seriesData = [
    [8, 30, 50, 82, 73, 84, 50],
    [32, 94, 61, 11, 52, 68, 58]
];
const legendData = ['用水', '用电'];
const unit = ['吨', '千瓦时'];
// 组合配置项
const chartOption = {
    xAxisData,
    seriesData,
    legendData,
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
## 2.显示数值与圆点
<demo8987ec03a4d1 />
```vue{4}
<template>
    <line-chart ref="chartRef" v-bind="chartOption"></line-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seriesData = [
    [8, 30, 50, 82, 73, 84, 50],
    [32, 94, 61, 11, 52, 68, 58]
];
const legendData = ['用水', '用电'];
const unit = ['吨', '千瓦时'];
const showLabel = true;
const showSymbol = true;
// 组合配置项
const chartOption = {
    xAxisData,
    seriesData,
    legendData,
    showLabel,
    showSymbol,
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
## 3.颜色配置
<demo1e6b451f49da />
```vue{4}
<template>
    <line-chart ref="chartRef" v-bind="chartOption"></line-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seriesData = [
    [8, 30, 50, 82, 73, 84, 50],
    [32, 94, 61, 11, 52, 68, 58]
];
const legendData = ['用水', '用电'];
const unit = ['吨', '千瓦时'];
const color = [
    {
        color: 'yellowgreen',
        lineColor: 'green',
        areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: 'rgb(0, 221, 255)' },
                { offset: 1, color: 'rgb(77, 119, 255)' }
            ]
        }
    },
    {
        color: 'blue',
        lineColor: 'red',
        areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: 'rgb(128, 255, 165)' },
                { offset: 1, color: 'rgb(1, 191, 236)' }
            ]
        }
    }
];
// 组合配置项
const chartOption = {
    xAxisData,
    seriesData,
    legendData,
    unit,
    color
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
<demof041d4d7d759 />
## 支持方法
<demob31425e3258a />
<script setup>
import demo174b4e504d85 from '../../document/lineChart/1.基础用法.vue'
import demo8987ec03a4d1 from '../../document/lineChart/2.显示数值与圆点.vue'
import demo1e6b451f49da from '../../document/lineChart/3.颜色配置.vue'
import demof041d4d7d759 from '../../document/lineChart/属性.vue'
import demob31425e3258a from '../../document/lineChart/支持方法.vue'
</script>