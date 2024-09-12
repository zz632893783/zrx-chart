## 1.基础用法(画像app)
<demo8b5a2216bd0c />
```vue{4}
<template>
    <bar-line-chart-6 ref="chartRef" v-bind="option"></bar-line-chart-6>
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
## 2.带辅助线的折线图
<demo01f72ba9dced />
```vue{4}
<template>
    <bar-line-chart-6 ref="chartRef" v-bind="option"></bar-line-chart-6>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
	smooth: true,
	showLineArea: true,
    showLegend: true,
    color: ['#0055FF', '#1FC49D'],
    grid: { right: 40 },
    unit: ['kw/h'],
    yAxisName: ['%'],
    legendData: ['总能耗', '总用水'],
    xAxisData: new Array(12).fill().map((n, i) => `${ (i + 1).toString().padStart(2, 0) }月`),
    markLine: [
	    {
	        value: 77,
	        yAxisIndex: 0,
	        color: '#FF9700'
	    }
	],
    seriesData: [
        {
            type: 'line',
            yAxisIndex: 0,
            data: [8, 30, 50, 82, 73, 84, 50, 8, 30, 50, 82, 73]
        },
        {
            type: 'line',
            yAxisIndex: 0,
            data: [133, 13, 27, 92, 44, 82, 19, 133, 13, 27, 92, 44]
        }
    ],
    beforeSetOption: option =>
    	option.series.forEach(item => item.type === 'line' && (item.markLine.data[0].label.formatter = param => `目标增速：{value|${ param.value }}`))
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
## 3.显示label隐藏线条
<demoeb90fb2f8ac2 />
```vue{4}
<template>
    <bar-line-chart-6 ref="chartRef" v-bind="option"></bar-line-chart-6>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
    showLegend: true,
    color: ['#0055FF', '#FF9700'],
    grid: { right: 40 },
    unit: ['亿元', '%'],
    yAxisName: ['亿元', '%'],
    legendData: ['地区生产总值', '同比增速'],
    xAxisData: new Array(12).fill().map((n, i) => `${ (i + 1).toString().padStart(2, 0) }月`),
    seriesData: [
        {
            type: 'bar',
            yAxisIndex: 0,
            data: [8, 30, 50, 82, 73, 84, 50, 8, 30, 50, 82, 73]
        },
        {
            type: 'line',
            yAxisIndex: 1,
            showLabel: true,
            data: [133, 13, 27, 92, 44, 82, 19, 133, 13, 27, 92, 44]
        }
    ],
    beforeSetOption: option => option.series.forEach(n => n.type === 'line' && (n.lineStyle.color = 'transparent'))
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
<demoe1e90bf97bfd />
<script setup>
import demo8b5a2216bd0c from '../../document/barLineChart6/1.基础用法(画像app).vue'
import demo01f72ba9dced from '../../document/barLineChart6/2.带辅助线的折线图.vue'
import demoeb90fb2f8ac2 from '../../document/barLineChart6/3.显示label隐藏线条.vue'
import demoe1e90bf97bfd from '../../document/barLineChart6/属性.vue'
</script>