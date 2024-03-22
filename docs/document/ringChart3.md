## 1.基础用法
<demofaff38a899bf />
```vue{4}
<template>
    <ring-chart-3 ref="chartRef" v-bind="chartOption"></ring-chart-3>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const unit = '单位';

const seriesData = [
    { value: 1048, name: '正常' },
    { value: 735, name: '故障' },
    { value: 580, name: '告警' },
    { value: 484, name: '离线' }
];
// 组合配置项
const chartOption = {
    unit,
    seriesData
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
## 2.颜色设置
<demobb73e1764c43 />
```vue{4}
<template>
    <ring-chart-3 ref="chartRef" v-bind="chartOption"></ring-chart-3>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    { value: 1048, name: '正常' },
    { value: 735, name: '故障' },
    { value: 580, name: '告警' },
    { value: 484, name: '离线' }
];
const color = ['rgb(0, 221, 255)', 'rgb(55, 162, 255)', 'rgb(255, 0, 135)', 'rgb(255, 191, 0)'];
// 组合配置项
const chartOption = {
    seriesData,
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
## 3.尺寸设置
<demo2061cd58cb40 />
```vue{4}
<template>
    <ring-chart-3 ref="chartRef" v-bind="chartOption"></ring-chart-3>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    { value: 1048, name: '正常' },
    { value: 735, name: '故障' },
    { value: 580, name: '告警' },
    { value: 484, name: '离线' }
];
const radius = [78, 106];
const backgroundRadius = [70, 106];
const scaleSize = 20;
// 组合配置项
const chartOption = {
    seriesData,
    radius,
    backgroundRadius,
    scaleSize
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
<demo4e88a7a093e9 />
## 支持方法
<demof6de3539ec29 />
<script setup>
import demofaff38a899bf from '../../document/ringChart3/1.基础用法.vue'
import demobb73e1764c43 from '../../document/ringChart3/2.颜色设置.vue'
import demo2061cd58cb40 from '../../document/ringChart3/3.尺寸设置.vue'
import demo4e88a7a093e9 from '../../document/ringChart3/属性.vue'
import demof6de3539ec29 from '../../document/ringChart3/支持方法.vue'
</script>