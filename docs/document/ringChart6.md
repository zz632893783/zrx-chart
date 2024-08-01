## 1.特殊定制图表
<demo90fa916eeb50 />
```vue{4}
<template>
    <ring-chart-6 v-bind="chartOption" ref="chartRef"></ring-chart-6>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const ringSeriesData = [
    { name: '在建', value: 73 },
    { name: '拟建', value: 54 },
    { name: '已建', value: 98 }
];
const barSeriesData = [73, 54];

const chartOption = {
    icons: [
        `https://www.baidu.com/img/flexible/logo/pc/result.png`
    ],
    ringSeriesData,
    barSeriesData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 256px;
    width: 300px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.颜色修改
<demo1e362a199030 />
```vue{4}
<template>
    <ring-chart-6 v-bind="chartOption" ref="chartRef"></ring-chart-6>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const ringColor = ['red', 'green', 'blue'];
const barColor = ['orange', 'pink', 'purple', 'yellowgreen'];
const ringSeriesData = [
    { name: '在建', value: 73 },
    { name: '拟建', value: 54 },
    { name: '已建', value: 98 }
];
const barSeriesData = [73, 54, 23, 66];
const barHeight = 60;
const lineLength = 50;

const chartOption = {
    ringColor,
    barColor,
    ringSeriesData,
    barSeriesData,
    barHeight,
    lineLength
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 256px;
    width: 300px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<demo5f2efef03277 />
## 支持方法
<demod84b1793aa9f />
<script setup>
import demo90fa916eeb50 from '../../document/ringChart6/1.特殊定制图表.vue'
import demo1e362a199030 from '../../document/ringChart6/2.颜色修改.vue'
import demo5f2efef03277 from '../../document/ringChart6/属性.vue'
import demod84b1793aa9f from '../../document/ringChart6/支持方法.vue'
</script>