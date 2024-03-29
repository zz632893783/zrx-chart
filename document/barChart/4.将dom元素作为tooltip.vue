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
