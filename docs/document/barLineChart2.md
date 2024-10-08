## 1.基础用法
<demof139a3aa30d9 />
```vue{4}
<template>
    <bar-line-chart2 v-bind="chartOption" ref="chartRef"></bar-line-chart2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [81, 17, 30, 94, 45, 54, 60, 1, 69]
    }
];
const yAxisName = ['亿元', '%'];
const legendData = ['销售额', '贸易额'];
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 364px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.柱宽度调整
<demoa44a26e85d3c />
```vue{4}
<template>
    <bar-line-chart2 v-bind="chartOption" ref="chartRef"></bar-line-chart2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    }
];
const yAxisName = ['亿元'];
const legendData = ['销售额'];
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 364px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 3.折线辅助线
<demobf9214fa29f6 />
```vue{4}
<template>
    <bar-line-chart2 v-bind="chartOption" ref="chartRef"></bar-line-chart2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        type: 'line',
        yAxisIndex: 0,
        data: [81, 17, 30, 94, 45, 54, 60, 1, 69]
    }
];
const color = ['yellow'];
const yAxisName = ['%'];
const legendData = ['规上盈利性服务增速'];
const showLineArea = true;
const markLine = [
    {
        value: 44,
        yAxisIndex: 0,
        color: '#33FFBB'
    },
    {
        value: 77,
        yAxisIndex: 0,
        color: '#F74768'
    }
];
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    markLine,
    color,
    showLineArea
};

onMounted(() => chartRef.value.renderChart());

</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 364px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 4.多柱
<demo1e0be3b6043f />
```vue{4}
<template>
    <bar-line-chart2 v-bind="chartOption" ref="chartRef"></bar-line-chart2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [80, 78, 97, 86, 114, 97, 91, 109, 114]
    }
];
const yAxisName = ['亿元'];
const legendData = ['销售额', '贸易额'];
const color = ['blue', 'grey'];
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 364px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 5.自定义x轴label
<demoed1b901b32c3 />
```vue{4}
<template>
    <bar-line-chart2 v-bind="chartOption" ref="chartRef"></bar-line-chart2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

let xAxisLabelStart = 0;

const xAxisData = ['1-3月', '4-6月', '7-9月', '10-12月', '1-3月', '4-6月', '7-9月', '10-12月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'line',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [63, 129, 123, 198, 152, 152, 178, 133]
    }
];
const yAxisName = ['亿元'];
const legendData = ['销售额'];
const color = ['yellow'];
const showLineArea = true;
const beforeSetOption = option => {
    option.xAxis.forEach(item => {
        Object.assign(item.axisLabel, {
            margin: 0,
            interval: 0,
            formatter: (param) => {
                // console.log(param, a, b, c, d)
                return param.startsWith('1-') ? `{split|}{gap|}{label|${ param }}` : `{label|${ param }}`
            },
            rich: {
                split: { width: 1, height: 32, backgroundColor: 'red' },
                gap: { width: 12 },
                label: { fontSize: 16, lineHeight: 32, verticalAlign: 'bottom' }
            }
        });
    });
};
const afterSetOption = (option, chart) => {
    chart.on('dataZoom', function () {
        const count = xAxisData.length - 1;
        const start = arguments[0].batch[0].start;
        xAxisLabelStart = Math.round(start / 100 * count);
    });
};
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color,
    showLineArea,
    beforeSetOption,
    afterSetOption
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 364px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 6.指定区域高亮
<demo96fbfea2e3c9 />
```vue{4}
<template>
    <bar-line-chart2 v-bind="chartOption" ref="chartRef"></bar-line-chart2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [80, 78, 97, 86, 114, 97, 91, 109, 114]
    },
    {
        // 需要指定类型
        type: 'line',
        // 需要指定 y 轴索引
        yAxisIndex: 1,
        data: [80, 78, 97, 86, 114, 97, 91, 109, 114]
    }
];
const yAxisName = ['亿元', '%'];
const legendData = ['销售额', '贸易额', '增速'];
const color = ['blue', 'grey', 'yellow'];
const xAxisHighlightArea = [2, 3, 4];
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color,
    xAxisHighlightArea
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 364px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 7.拖拽区域为滚动条
<demo4019c22ca65c />
```vue{4}
<template>
    <bar-line-chart2 v-bind="chartOption" ref="chartRef"></bar-line-chart2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [80, 78, 97, 86, 114, 97, 91, 109, 114]
    },
    {
        // 需要指定类型
        type: 'line',
        lineType: 'dashed',
        // 需要指定 y 轴索引
        yAxisIndex: 1,
        data: [80, 78, 97, 86, 114, 97, 91, 109, 114]
    }
];
const yAxisName = ['亿元', '%'];
const legendData = ['销售额', '贸易额', '增速'];
const color = ['blue', 'grey', 'yellow'];
const xAxisHighlightArea = [2, 3, 4];
const showCount = 4;
const dataZoomType = 'slider';
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color,
    xAxisHighlightArea,
    showCount,
    dataZoomType
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 364px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<demo46206fcfbe9c />
## 支持方法
<demo2a2e6baf6919 />
<script setup>
import demof139a3aa30d9 from '../../document/barLineChart2/1.基础用法.vue'
import demoa44a26e85d3c from '../../document/barLineChart2/2.柱宽度调整.vue'
import demobf9214fa29f6 from '../../document/barLineChart2/3.折线辅助线.vue'
import demo1e0be3b6043f from '../../document/barLineChart2/4.多柱.vue'
import demoed1b901b32c3 from '../../document/barLineChart2/5.自定义x轴label.vue'
import demo96fbfea2e3c9 from '../../document/barLineChart2/6.指定区域高亮.vue'
import demo4019c22ca65c from '../../document/barLineChart2/7.拖拽区域为滚动条.vue'
import demo46206fcfbe9c from '../../document/barLineChart2/属性.vue'
import demo2a2e6baf6919 from '../../document/barLineChart2/支持方法.vue'
</script>