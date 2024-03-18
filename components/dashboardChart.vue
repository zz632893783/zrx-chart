<template>
    <div class="chart">
        <div class="chart-container" ref="chartRef"></div>
        <div class="center">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import * as echarts from 'echarts'
// 图表实例
let chart;
// 图表 dom 对象
const chartRef = ref();
// 可配置属性
const props = defineProps({
    // 最大值
    max: {
        type: [Number],
        default: () => 100
    },
    // 底色
    layerColor: {
        type: [String],
        default: () => '#50697a'
    },
    // 颜色
    color: {
        type: [String],
        default: () => '#34d3ec'
    },
    // 起始角度
    startAngle: {
        type: [Number],
        default: () => 200
    },
    // 终止角度
    endAngle: {
        type: [Number],
        default: () => -20
    },
    // 数值
    value: {
        type: [Number],
        default: () => 0
    },
    // 环形条宽度
    barWidth: {
        type: [Number],
        default: () => 10
    },
    // 半径
    radius: {
        type: [Number],
        default: () => 95
    },
    // 万能方法，图表渲染之前执行
    beforeSetOption: {
        type: [Function],
        default: () => null
    },
    // 万能方法，图表渲染之后执行
    afterSetOption: {
        type: [Function],
        default: () => null
    },
    // 图表缩放比例
    scale: {
        type: [Number],
        // default: () => window.innerHeight / 1080;
        default: () => 1
    }
});
// 渲染函数
const renderChart = () => {
    if (chart) {
        chart.dispose();
        chart = null;
    }
    chart = echarts.init(chartRef.value);
    const option = {
        series: [
            {
                type: 'gauge',
                radius: props.radius * props.scale,
                max: props.max,
                startAngle: props.startAngle,
                endAngle: props.endAngle,
                progress: {
                    show: true,
                    width: props.barWidth * props.scale,
                    roundCap: true
                },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                axisLine: {
                    show: true,
                    roundCap: true,
                    lineStyle: {
                        color: [[1, props.layerColor]],
                        width: props.barWidth * props.scale
                    }
                },
                anchor: { show: false },
                pointer: { show: false },
                detail: { show: false },
                itemStyle: {
                    color: props.color
                },
                data: [
                    {
                        value: props.value
                    }
                ]
            }
        ]
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
.chart {
    position: relative;
    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>