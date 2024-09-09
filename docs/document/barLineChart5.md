## 1.基础用法(画像app)
<demo9c5831209389 />
```vue{4}
<template>
    <bar-line-chart-5 ref="chartRef" v-bind="option"></bar-line-chart-5>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
    showLegend: true,
    grid: { right: 40 },
    unit: ['kw/h', '吨', '元'],
    yAxisName: ['左侧y轴', '右侧y轴'],
    legendData: ['总能耗', '总用水', '支出'],
    color: ['#0055FF', '#1FC49D', '#FF9700'],
    xAxisData: new Array(12).fill().map((n, i) => `${ (i + 1).toString().padStart(2, 0) }月`),
    seriesData: [
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [8, 30, 50, 82, 73, 84, 50, 8, 30, 50, 82, 73]
        },
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [32, 94, 61, 11, 52, 68, 58, 32, 94, 61, 11, 52]
        },
        {
            type: 'line',
            yAxisIndex: 1,
            data: [133, 13, 27, 92, 44, 82, 19, 133, 13, 27, 92, 44]
        }
    ]
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 350px;
    height: 272px;
    background-color: white;
}
</style>

```
## 2.只有柱(画像app)
<demo2d99eca25cea />
```vue{4}
<template>
    <bar-line-chart-5 ref="chartRef" v-bind="option"></bar-line-chart-5>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
    showLegend: true,
    unit: ['kw/h', '吨'],
    yAxisName: ['左侧y轴'],
    legendData: ['总能耗', '总用水'],
    color: ['#0055FF', '#1FC49D'],
    xAxisData: new Array(12).fill().map((n, i) => `${ (i + 1).toString().padStart(2, 0) }月`),
    seriesData: [
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [8, 30, 50, 82, 73, 84, 50, 8, 30, 50, 82, 73]
        },
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [32, 94, 61, 11, 52, 68, 58, 32, 94, 61, 11, 52]
        }
    ]
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 350px;
    height: 272px;
    background-color: white;
}
</style>

```
## 3.只有折线(画像app)
<demo081e0d92a8e4 />
```vue{4}
<template>
    <bar-line-chart-5 ref="chartRef" v-bind="option"></bar-line-chart-5>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
    showLegend: true,
    showLineArea: true,
    unit: ['kw/h'],
    yAxisName: ['左侧y轴'],
    legendData: ['总能耗'],
    color: ['#0055FF'],
    xAxisData: new Array(12).fill().map((n, i) => `${ (i + 1).toString().padStart(2, 0) }月`),
    seriesData: [
        {
            type: 'line',
            yAxisIndex: 0,
            data: [8, 30, 50, 82, 73, 84, 50, 38, 30, 50, 82, 73]
        }
    ]
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 350px;
    height: 272px;
    background-color: white;
}
</style>

```
## 4.tooltip 值处理（画像app）
<demo351257a4a193 />
```vue{4}
<template>
    <bar-line-chart-5 ref="chartRef" v-bind="option"></bar-line-chart-5>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
    showLegend: true,
    grid: { right: 40 },
    unit: ['kw/h', '吨', '元'],
    yAxisName: ['左侧y轴', '右侧y轴'],
    legendData: ['总能耗', '总用水', '支出'],
    color: ['#0055FF', '#1FC49D', '#FF9700'],
    xAxisData: new Array(12).fill().map((n, i) => `${ (i + 1).toString().padStart(2, 0) }月`),
    seriesData: [
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [8, 30, 50, 82, 73, 84, 50, 8, 30, 50, 82, 73]
        },
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [32, 94, 61, 11, 52, 68, 58, 32, 94, 61, 11, 52]
        },
        {
            type: 'line',
            yAxisIndex: 1,
            data: [133, 13, 27, 92, 44, 82, 19, 133, 13, 27, 92, 44]
        }
    ],
    tooltipValueFormatter: (value, seriesIndex, dataIndex) => {
    	console.log(value, seriesIndex, dataIndex);
    	return '*****';
    }
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 350px;
    height: 272px;
    background-color: white;
}
</style>

```
## 属性
<demo16c6d5e710b4 />
<script setup>
import demo9c5831209389 from '../../document/barLineChart5/1.基础用法(画像app).vue'
import demo2d99eca25cea from '../../document/barLineChart5/2.只有柱(画像app).vue'
import demo081e0d92a8e4 from '../../document/barLineChart5/3.只有折线(画像app).vue'
import demo351257a4a193 from '../../document/barLineChart5/4.tooltip 值处理（画像app）.vue'
import demo16c6d5e710b4 from '../../document/barLineChart5/属性.vue'
</script>