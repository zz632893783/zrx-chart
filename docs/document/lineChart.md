## 1.基础用法
<demo24bbf82f0fff />
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
<demo4b9986e780d0 />
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
<demobc663dc9b228 />
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
<demo394158606983 />
## 支持方法
<democb0f7b5627b2 />
<script setup>
import demo24bbf82f0fff from '../../document/lineChart/1.基础用法.vue'
import demo4b9986e780d0 from '../../document/lineChart/2.显示数值与圆点.vue'
import demobc663dc9b228 from '../../document/lineChart/3.颜色配置.vue'
import demo394158606983 from '../../document/lineChart/属性.vue'
import democb0f7b5627b2 from '../../document/lineChart/支持方法.vue'
</script>