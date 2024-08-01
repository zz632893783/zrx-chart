## 1.基础用法
<demo8da0861ed458 />
```vue{4}
<template>
    <bar-chart ref="chartRef" v-bind="chartOption"></bar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [54, 89, 86, 65, 54],
    [95, 97, 75, 72, 90]
];
const xAxisData = ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'];
const legendData = ['建筑业总产值', '前20名产值'];
const yAxisName = '亿元';
const chartOption = {
    seriesData,
    xAxisData,
    legendData,
    yAxisName
};

onMounted(() => {
    console.log('onMounted');
    console.log(chartRef);
    chartRef.value.renderChart();
    console.log(27)
});
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: rgb(3, 43, 68);
}
</style>

```
## 2.指定区域高亮
<demo6179ec9aaee4 />
```vue{4}
<template>
    <bar-chart ref="chartRef" v-bind="chartOption"></bar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [54, 89, 86, 65, 54, 89, 86],
    [95, 97, 75, 72, 90, 97, 75]

];
const xAxisData = ['1-3月', '4-6月', '7-9月', '10-12月', '2023年1-3月', '4-6月', '7-9月'];
const legendData = ['建筑业总产值', '前20名产值'];
const yAxisName = '亿元';
const xAxisHighlightArea = [2, 4, 5];
const chartOption = {
    seriesData,
    xAxisData,
    legendData,
    yAxisName,
    xAxisHighlightArea
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 3.拖拽区域为滚动条
<demo891a9089ed0b />
```vue{4}
<template>
    <bar-chart ref="chartRef" v-bind="chartOption"></bar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    [54, 89, 86, 65, 54, 53, 72],
    [95, 97, 75, 72, 90, 88, 54]
];
const xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
const legendData = ['统计金额', '开票金额'];
const showCount = 4;
const dataZoomType = 'slider';

const chartOption = {
    seriesData,
    xAxisData,
    legendData,
    showCount,
    dataZoomType
};

onMounted(() => chartRef.value.renderChart());

</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 4.将dom元素作为tooltip
<demo15bdf7470bdf />
```vue{4}
<template>
    <div v-show="appendReady" class="custom-tooltip" ref="tooltipRef">
        <h4 class="tooltip-title">{{ tooltipTitle }}</h4>
        <div class="tooltip-content">{{ tooltipContent }}</div>
    </div>
    <bar-chart ref="chartRef" v-bind="chartOption"></bar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 自定义 tooltip 的 dom 对象
const tooltipRef = ref();
// 是否已经将 tooltip 加入
const appendReady = ref(false);
// 自定义 tooltip 标题
const tooltipTitle = ref('');
// 自定义 tooltip 内容
const tooltipContent = ref('');
// 配置项
const chartOption = {
    seriesData: [[54, 89, 86, 65, 54]],
    xAxisData: ['1-2月', '1-3月', '1-4月', '1-5月', '1-6月'],
    legendData: ['建筑业总产值'],
    yAxisName: '亿元',
    // 通过万能方法 beforeSetOption 修改
    beforeSetOption: option => {
        // tooltip.formatter 指定返回自定义 dom 元素
        option.tooltip.formatter = params => {
            // 显示预先隐藏隐藏的 tooltip
            !appendReady.value && (appendReady.value = true);
            // 通过 params 计算自定义 tooltip 的标题内容
            tooltipTitle.value = params[0].name;
            tooltipContent.value = params.slice(0, 1).map(n => `${ n.value }万元`).join(' ');
            return tooltipRef.value
        }
    }
};
onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: rgb(3, 43, 68);
}
.custom-tooltip {
    padding: 8px 12px;
    background-color: white;
    border-top-left-radius: 16px;
    border-bottom-right-radius: 16px;
    .tooltip-title {
        color: red;
    }
    .tooltip-content {
        color: orange;
    }
}
</style>

```
## 属性
<demo9e102adba2a3 />
## 支持方法
<demo63ebd6f8b612 />
<script setup>
import demo8da0861ed458 from '../../document/barChart/1.基础用法.vue'
import demo6179ec9aaee4 from '../../document/barChart/2.指定区域高亮.vue'
import demo891a9089ed0b from '../../document/barChart/3.拖拽区域为滚动条.vue'
import demo15bdf7470bdf from '../../document/barChart/4.将dom元素作为tooltip.vue'
import demo9e102adba2a3 from '../../document/barChart/属性.vue'
import demo63ebd6f8b612 from '../../document/barChart/支持方法.vue'
</script>