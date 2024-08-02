## 1.基础用法
<demo8696b9c926b6 />
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
<demo41a598e9f7bd />
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
<demo10b5ac28720d />
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
<demodfc31ca43a5b />
## 支持方法
<demod0811d4f31ab />
<script setup>
import demo8696b9c926b6 from '../../document/ringChart3/1.基础用法.vue'
import demo41a598e9f7bd from '../../document/ringChart3/2.颜色设置.vue'
import demo10b5ac28720d from '../../document/ringChart3/3.尺寸设置.vue'
import demodfc31ca43a5b from '../../document/ringChart3/属性.vue'
import demod0811d4f31ab from '../../document/ringChart3/支持方法.vue'
</script>