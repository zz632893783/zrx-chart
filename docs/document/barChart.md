## 1.基础用法
<demoa83d8b0ee23b />
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

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: rgb(3, 43, 68);
}
</style>

```
## 2.指定区域高亮
<demo708f10fa1430 />
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
<demodb7f6373abaa />
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
<demob2deb9821eb3 />
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
<demof3648583d9d7 />
## 支持方法
<demod11c71e07148 />
<script setup>
import demoa83d8b0ee23b from '../../document/barChart/1.基础用法.vue'
import demo708f10fa1430 from '../../document/barChart/2.指定区域高亮.vue'
import demodb7f6373abaa from '../../document/barChart/3.拖拽区域为滚动条.vue'
import demob2deb9821eb3 from '../../document/barChart/4.将dom元素作为tooltip.vue'
import demof3648583d9d7 from '../../document/barChart/属性.vue'
import demod11c71e07148 from '../../document/barChart/支持方法.vue'
</script>