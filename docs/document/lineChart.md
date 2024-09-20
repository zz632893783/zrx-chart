## 1.基础用法
<demob670f1a79964 />
```vue{4}
<template>
    <line-chart ref="chartRef" v-bind="chartOption"></line-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seriesData = [
    {
        yAxisIndex: 0,
        data: [8, 30, 50, 82, 73, 84, 50]
    },
    {
        yAxisIndex: 0,
        data: [32, 94, 61, 11, 52, 68, 58]
    },
    {
        yAxisIndex: 1,
        data: [30, 44, 56, 24, 42, 58, 45]
    }
];
const legendData = ['用水', '用电', '用工'];
const unit = ['吨', '千瓦时', '人'];
const yAxisName = ['左侧y轴', '右侧y轴'];
// 组合配置项
const chartOption = {
    xAxisData,
    seriesData,
    legendData,
    unit,
    yAxisName,
    showSplitLine: false
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
<demod4a3c98fba4d />
```vue{4}
<template>
    <line-chart ref="chartRef" v-bind="chartOption"></line-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seriesData = [
    {
        yAxisIndex: 0,
        data: [8, 30, 50, 82, 73, 84, 50]
    },
    {
        yAxisIndex: 0,
        data: [32, 94, 61, 11, 52, 68, 58]
    }
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
<demoea40c1dd1373 />
```vue{4}
<template>
    <line-chart ref="chartRef" v-bind="chartOption"></line-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const seriesData = [
    {
        yAxisIndex: 0,
        data: [8, 30, 50, 82, 73, 84, 50]
    },
    {
        yAxisIndex: 0,
        data: [32, 94, 61, 11, 52, 68, 58]
    }
];
const legendData = ['用水', '用电'];
const unit = ['吨', '千瓦时'];
const color = ['green', 'red'];
const smooth = false;
// 组合配置项
const chartOption = {
    xAxisData,
    seriesData,
    legendData,
    unit,
    color,
    smooth
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
<demobff35a2946df />
## 支持方法
<demo24f6e0688158 />
<script setup>
import demob670f1a79964 from '../../document/lineChart/1.基础用法.vue'
import demod4a3c98fba4d from '../../document/lineChart/2.显示数值与圆点.vue'
import demoea40c1dd1373 from '../../document/lineChart/3.颜色配置.vue'
import demobff35a2946df from '../../document/lineChart/属性.vue'
import demo24f6e0688158 from '../../document/lineChart/支持方法.vue'
</script>