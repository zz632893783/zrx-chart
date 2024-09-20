## 1.特殊定制图表
<demo9d28d9b557e4 />
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
<demo2c84279100cf />
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
<demode15f1ccbbfd />
## 支持方法
<demo7dc2b30ad32e />
<script setup>
import demo9d28d9b557e4 from '../../document/ringChart6/1.特殊定制图表.vue'
import demo2c84279100cf from '../../document/ringChart6/2.颜色修改.vue'
import demode15f1ccbbfd from '../../document/ringChart6/属性.vue'
import demo7dc2b30ad32e from '../../document/ringChart6/支持方法.vue'
</script>