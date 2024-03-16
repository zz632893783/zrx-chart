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

let chart;
const chartRef = ref();

const props = defineProps({
    max: {
        type: [Number],
        default: () => 100
    },
    layerColor: {
        type: [String],
        default: () => '#50697a'
    },
    color: {
        type: [String],
        default: () => '#34d3ec'
    },
    startAngle: {
        type: [Number],
        default: () => 200
    },
    endAngle: {
        type: [Number],
        default: () => -20
    },
    value: {
        type: [Number],
        default: () => 0
    },
    barWidth: {
        type: [Number],
        default: () => 10
    },
    radius: {
        type: [Number],
        default: () => 95
    }
});

const scale = window.innerHeight / 1080;

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
                radius: props.radius * scale,
                max: props.max,
                startAngle: props.startAngle,
                endAngle: props.endAngle,
                progress: {
                    show: true,
                    width: props.barWidth * scale,
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
                        width: props.barWidth * scale
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

defineExpose({
    renderChart,
    clearChart: () => chart?.clear()
});
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