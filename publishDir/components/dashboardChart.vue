<template>
    <div class="zrx-chart">
        <!-- <div class="chart-container" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
        <div class="chart-container" :id="`zrx-chart-${ randomId }`"></div>
        <div class="center">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import * as echarts from 'echarts'
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表实例
let chart;
// 图表 dom 对象
// const chartRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 最大值
     * @example 200
     */
    max: {
        type: [Number],
        default: () => 100
    },
    /**
     * @description 底色
     * @example '#aabbcc'
     */
    layerColor: {
        type: [String],
        default: () => '#50697a'
    },
    /**
     * @description 颜色
     * @example 'red'
     */
    color: {
        type: [String],
        default: () => '#34d3ec'
    },
    /**
     * @description 起始角度
     * @example 180
     */
    startAngle: {
        type: [Number],
        default: () => 200
    },
    /**
     * @description 终止角度
     * @example -40
     */
    endAngle: {
        type: [Number],
        default: () => -20
    },
    /**
     * @description 数值
     * @example 60
     */
    value: {
        type: [Number],
        default: () => 0
    },
    /**
     * @description 环形条宽度
     * @example 20
     */
    barWidth: {
        type: [Number],
        default: () => 10
    },
    /**
     * @description 半径
     * @example 80
     */
    radius: {
        type: [Number],
        default: () => 95
    },
    /**
     * @description 图表缩放比例
     * @example 2
     */
    scale: {
        type: [Number],
        default: () => 1
    },
    /**
     * @description 万能方法，图表渲染之前执行
     * @example function (option, chart) {
     *     return '执行对 option 的修改，绑定自定义事件等'
     * }
     */
    beforeSetOption: {
        type: [Function],
        default: () => null
    },
    /**
     * @description 万能方法，图表渲染之后执行
     * @example function (option, chart) {
     *     return '执行对 option 的修改，绑定自定义事件等'
     * }
     */
    afterSetOption: {
        type: [Function],
        default: () => null
    }
});
// 渲染函数
const renderChart = () => {
    if (chart) {
        chart.dispose();
        chart = null;
    }
    // chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
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
    return chart;
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
.zrx-chart {
    position: relative;
    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>