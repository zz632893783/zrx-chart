## 1.基础用法
<demoa41b159f2bc2 />
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
    [32, 94, 61, 11, 52, 68, 58],
    [30, 44, 56, 24, 42, 58, 45]
];
const legendData = ['用水', '用电', '用工'];
const unit = ['吨', '千瓦时', '人'];
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
<demo155cde6ffeb7 />
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
<demo35e9a84abd7f />
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
<demo3a9a9e1ce6fa />
## 支持方法
<demof1a86898ff55 />
<script setup>
import demoa41b159f2bc2 from '../../document/lineChart/1.基础用法.vue'
import demo155cde6ffeb7 from '../../document/lineChart/2.显示数值与圆点.vue'
import demo35e9a84abd7f from '../../document/lineChart/3.颜色配置.vue'
import demo3a9a9e1ce6fa from '../../document/lineChart/属性.vue'
import demof1a86898ff55 from '../../document/lineChart/支持方法.vue'
</script>