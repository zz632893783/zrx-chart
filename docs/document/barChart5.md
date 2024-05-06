## 1.基础用法
<demoa379b06c5906 />
```vue{4}
<template>
    <bar-chart-5 ref="chartRef" v-bind="chartOption"></bar-chart-5>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const seriesData = [
    {
        yAxisIndex: 0,
        data: [50, 130, 150, 182, 173, 184, 150, 18, 130, 150, 182, 173]
    },
    {
        yAxisIndex: 1,
        data: [52, 94, 61, 11, 52, 68, 58, 94, 61, 11, 52, 68]
    }
];
const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月', '1-10月', '1-11月', '1-12月'];
const unit = ['万元', '%'];
const yAxisName = ['万元', '%'];
const color = ['#3196FA', '#24AB86'];
const legendData = ['实际值', '当前目标'];

const chartOption = {
    unit,
    color,
    xAxisData,
    yAxisName,
    seriesData,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 310px;
    background-color: black;
}
</style>

```
## 2.辅助线
<demo6ed478e36042 />
```vue{4}
<template>
    <bar-chart-5 ref="chartRef" v-bind="chartOption"></bar-chart-5>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const seriesData = [
    {
        yAxisIndex: 0,
        data: [50, 130, 150, 182, 173, 184, 150, 18, 130, 150, 182, 173]
    },
    {
        yAxisIndex: 1,
        data: [52, 94, 61, 11, 52, 68, 58, 94, 61, 11, 52, 68]
    }
];
const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月', '1-10月', '1-11月', '1-12月'];
const unit = ['万元', '%'];
const yAxisName = ['万元', '%'];
const color = ['#3196FA', '#24AB86'];
const legendData = ['实际值', '当前目标'];
const markLine = [
    {
        value: 167,
        yAxisIndex: 0,
        color: '#FA4B31'
    }
];

const chartOption = {
    unit,
    color,
    markLine,
    xAxisData,
    yAxisName,
    seriesData,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 310px;
    background-color: black;
}
</style>

```
## 属性
<democb54f4f0daa6 />
<script setup>
import demoa379b06c5906 from '../../document/barChart5/1.基础用法.vue'
import demo6ed478e36042 from '../../document/barChart5/2.辅助线.vue'
import democb54f4f0daa6 from '../../document/barChart5/属性.vue'
</script>