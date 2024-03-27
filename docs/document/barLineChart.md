## 1.柱-折线混合
<demo05b1c0d797ed />
```vue{4}
<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const color = ['blue', 'green', 'celeste', 'grey'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [101, 31, 66, 120, 123, 9, 22, 128, 62]
    },
    {
        type: 'bar',
        yAxisIndex: 0,
        data: [158, 171, 43, 143, 178, 96, 67, 18, 143]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [389, 283, 213, 315, 313, 256, 304, 233, 372]
    },
    {
        type: 'line',
        lineType: 'dashed',
        yAxisIndex: 1,
        data: [273, 245, 364, 252, 283, 368, 319, 389, 400]
    }
];
const yAxisName = ['亿元', '%'];
const legendData = ['住宅类均价', '办公类均价', '商业类均价', '住宅类增速', '办公类增速', '商业类增速'];
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
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.只有折线
<demo743314bfb1f4 />
```vue{4}
<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const color = ['yellow', 'celeste', 'green', 'grey', 'violet', 'pink'];
const seriesData = [
    {
        // 需要指定类型
        type: 'line',
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'line',
        data: [81, 37, 30, 94, 45, 54, 60, 1, 69]
    },
    {
        type: 'line',
        data: [36, 17, 43, 26, 23, 77, 66, 60, 18]
    },
    {
        type: 'line',
        data: [61, 76, 63, 53, 82, 82, 74, 57, 79]
    },
    {
        type: 'line',
        data: [85, 74, 112, 74, 83, 86, 111, 112, 80]
    },
    {
        type: 'line',
        data: [71, 77, 113, 120, 60, 65, 79, 61, 113]
    },
    {
        type: 'line',
        data: [111, 116, 89, 107, 67, 97, 86, 116, 98]
    },
    {
        type: 'line',
        data: [120, 65, 93, 82, 112, 63, 75, 100, 81]
    }
];
const yAxisName = ['亿元'];
const legendData = ['汽车', '家电', '成品油', '日用品', '化妆品', '粮油', '天然气', '煤炭'];
const tooltipTitle = xAxisData.map(n => `2023年${n}`);
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    tooltipTitle,
    color
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 3.只有柱
<democa23f9a5b1a8 />
```vue{4}
<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const yAxisName = ['家'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'bar',
        yAxisIndex: 0,
        data: [81, 37, 30, 94, 45, 54, 60, 1, 69]
    },
    {
        type: 'bar',
        yAxisIndex: 0,
        data: [36, 17, 43, 26, 23, 77, 66, 60, 18]
    }
];
const legendData = ['总数', '房建', '市政'];
const chartOption = {
    xAxisData,
    yAxisName,
    seriesData,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 4.与图表联动
<demoe7e50f785567 />
```vue{4}
<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
    <el-button style="margin: 20px 0;" type="primary" @click="changeLineState">显示/隐藏</el-button>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

let chart = null;
// 回调函数获取 chart 对象
const afterSetOption = (option, c) => (chart = c);
// 按钮触发图表事件
const changeLineState = v => chart.dispatchAction({
    type: 'legendToggleSelect',
    name: legendData[0]
});

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
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
const legendData = ['营业额'];
const showLegend = false;
const chartOption = {
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    showLegend,
    afterSetOption
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 5.指定区域高亮
<demoaf253add011e />
```vue{4}
<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const yAxisName = ['家', '%'];
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
        data: [81, 37, 30, 94, 45, 54, 60, 1, 69]
    },
    {
        type: 'bar',
        yAxisIndex: 0,
        data: [36, 17, 43, 26, 23, 77, 66, 60, 18]
    }
];
const legendData = ['总数', '房建', '市政'];
const xAxisHighlightArea = [3, 4];
const chartOption = {
    xAxisData,
    yAxisName,
    seriesData,
    legendData,
    xAxisHighlightArea
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 6.拖拽区域为滚动条
<demoa9616b53dcb6 />
```vue{4}
<template>
    <bar-line-chart v-bind="chartOption" ref="chartRef"></bar-line-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const yAxisName = ['家', '%'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133]
    },
    {
        type: 'line',
        lineType: 'dashed',
        yAxisIndex: 1,
        data: [81, 37, 30, 94, 45, 54, 60, 69]
    },
    {
        type: 'bar',
        yAxisIndex: 0,
        data: [36, 17, 43, 26, 23, 77, 66, 60]
    }
];
const legendData = ['总数', '房建', '市政'];
const xAxisHighlightArea = [3, 4];
const showCount = 4;
const dataZoomType = 'slider';
const chartOption = {
    xAxisData,
    yAxisName,
    seriesData,
    legendData,
    xAxisHighlightArea,
    showCount,
    dataZoomType
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 400px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<demo388e5d5212a4 />
## 支持方法
<demo5de5c1c2c363 />
<script setup>
import demo05b1c0d797ed from '../../document/barLineChart/1.柱-折线混合.vue'
import demo743314bfb1f4 from '../../document/barLineChart/2.只有折线.vue'
import democa23f9a5b1a8 from '../../document/barLineChart/3.只有柱.vue'
import demoe7e50f785567 from '../../document/barLineChart/4.与图表联动.vue'
import demoaf253add011e from '../../document/barLineChart/5.指定区域高亮.vue'
import demoa9616b53dcb6 from '../../document/barLineChart/6.拖拽区域为滚动条.vue'
import demo388e5d5212a4 from '../../document/barLineChart/属性.vue'
import demo5de5c1c2c363 from '../../document/barLineChart/支持方法.vue'
</script>