## 1.基础用法
<demo4e84354914d9 />
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
<demo275bc943c961 />
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
<demo21a56e92f4da />
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
<demo2ada63f65bbf />
## 支持方法
<demo550488803268 />
<script setup>
import demo4e84354914d9 from '../../document/lineChart/1.基础用法.vue'
import demo275bc943c961 from '../../document/lineChart/2.显示数值与圆点.vue'
import demo21a56e92f4da from '../../document/lineChart/3.颜色配置.vue'
import demo2ada63f65bbf from '../../document/lineChart/属性.vue'
import demo550488803268 from '../../document/lineChart/支持方法.vue'
</script>