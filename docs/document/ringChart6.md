## 1.特殊定制图表
<demod0ab7fd09d25 />
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
<demo4ba9146f4ed3 />
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
<demob585c3872258 />
## 支持方法
<demo40be09a4b125 />
<script setup>
import demod0ab7fd09d25 from '../../document/ringChart6/1.特殊定制图表.vue'
import demo4ba9146f4ed3 from '../../document/ringChart6/2.颜色修改.vue'
import demob585c3872258 from '../../document/ringChart6/属性.vue'
import demo40be09a4b125 from '../../document/ringChart6/支持方法.vue'
</script>