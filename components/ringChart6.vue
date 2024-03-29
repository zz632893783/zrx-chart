<template>
    <!-- <div class="zrx-chart" ref="containerRef">
        <div class="chart-container" ref="chartRef"></div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`">
        <div class="chart-container"></div>
        <div class="bar" :style="barStyle">
            <div class="bar-item" v-for="(n, i) in barSeriesData" :style="`background-color: ${ barColor[i % barColor.length] };`"></div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';
import { setFixed } from '../utils/index.js';
// 以下这串字符串为特殊字符串，用于指定组件自动生成的 “属性.vue” 说明文件中，每列列宽
/* @attribute-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1.8fr) minmax(0, 2.6fr); */
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表实例
let chart;
// 图表 dom 对象
// const chartRef = ref();
// 图表外侧容器 dom 对象
// const containerRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 半径
     * @example [60, 70]
     */
    radius: {
        type: [Array],
        default: () => [60, 68]
    },
    /**
     * @description 圆环颜色
     * @example ['#0e8fff', '#00d5ef', '#b5bfe2']
     */
    ringColor: {
        type: [Array],
        default: () => ['#0e8fff', '#00d5ef', '#b5bfe2']
    },
    /**
     * @description 柱子颜色
     * @example ['#206e8a', '#72dde0']
     */
    barColor: {
        type: [Array],
        default: () => ['#206e8a', '#72dde0']
    },
    /**
     * @description 间距
     * @example 4
     */
    itemGap: {
        type: [Number],
        default: () => 2
    },
    /**
     * @description 圆环数据
     * @example [73, 54, 98]
     */
    ringSeriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 柱子数据
     * @example [73, 54, 23, 66]
     */
    barSeriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 柱子的高度
     * @example 160
     */
    barHeight: {
        type: [Number],
        default: () => 120
    },
    /**
     * @description 连接线长度
     * @example 20
     */
    lineLength: {
        type: [Number],
        default: () => 34
    },
    /**
     * @description 单位
     * @example '个'
     */
    unit: {
        type: [String],
        default: () => ''
    },
    /**
     * @description 起始角度
     * @example 40
     */
    startAngle: {
        type: [Number],
        default: () => 52
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
    // chart = echarts.init(chartRef.value);
    chart = echarts.init(document.querySelector(`#zrx-chart-${ randomId } .chart-container`));
    const option = {
        legend: {
            show: true,
            top: -1e6
        },
        color: props.ringColor,
        series: [
            {
                type: 'pie',
                startAngle: props.startAngle,
                radius: [
                    props.radius[0] - props.itemGap,
                    props.radius[1] + props.itemGap
                ].map(n => n * props.scale),
                data: [
                    {
                        value: 0
                    },
                    ...props.ringSeriesData].map((value, index) => {
                    value = typeof value === 'object' ? value : { value };
                    return {
                        ...value,
                        // name: `${index}`,
                        itemStyle: {
                            color: props.ringColor[(index - 1) % props.ringColor.length]
                        },
                        emphasis: { disabled: index === 0 },
                        label: { show: index === 0, formatter: '' },
                        labelLine: {
                            show: index === 0,
                            length: 0,
                            length2: props.lineLength * props.scale,
                            lineStyle: { color: '#687e8c' }
                        }
                    }
                }),
                labelLine: { show: false },
                itemStyle: {
                    borderWidth: props.itemGap * props.scale,
                    borderColor: 'rgb(3, 43, 68)'
                }
                // emphasis: { scaleSize: 5 },
            }
        ],
        tooltip: {
            trigger: 'item',
            confine: true,
            backgroundColor: 'transparent',
            padding: 0,
            borderRadius: 0,
            borderWidth: 0,
            borderColor: 'transparent',
            axisPointer: {
                type: 'line',
                lineStyle: { color: '#677b87' }
            },
            formatter: param => `
                <div style="background-color: #125176; padding: ${ 8 * props.scale }px; border-radius: 0; border: ${ 1 * props.scale }px solid rgba(102, 255, 255, 0.2);">
                    ${ props.title ? `<h4 style="font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400; margin-bottom: ${ 8 * props.scale }px;">${ props.title }</h4>` : '' }
                    <div style="display: grid; grid-auto-rows: ${ 19 * props.scale }px; grid-row-gap: ${ 4 * props.scale }px; grid-template-columns: ${ 8 * props.scale }px ${ 8 * props.scale }px min-content ${ 12 * props.scale }px min-content; grid-column-gap: ${ 2 * props.scale }px ${ 12 * props.scale }px; align-items: center;">
                        ${
                            (() => {
                                const colors = props.ringColor;
                                const color = colors[(param.dataIndex + colors.length - 1) % colors.length];
                                let background;
                                if (typeof color === 'object' && color.type === 'linear') {
                                    const angle = Math.atan((color.y2 - color.y) / (color.x2 - color.x)) / Math.PI * 180 + 90;
                                    const colorStops = [...color.colorStops].sort((x, y) => x.offset - y.offset);
                                    background = `background-image: linear-gradient(${angle}deg, ${ colorStops.map(n => `${ param.color } ${ `${param.offset * 100}%` } `).join(',') })`;
                                } else {
                                    background = `background-color: ${ color }`;
                                }
                                const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName
                                const yAxisIndex = props.ringSeriesData[param.seriesIndex]?.yAxisIndex || 0;
                                let value;
                                if ([null, undefined, '', NaN].includes(param.value)) {
                                    value = '- -'
                                } else {
                                    value = parseInt(param.value) === Number(param.value) ? param.value : setFixed(Number(param.value) || 0, 2);
                                }
                                return `
                                    <i style="${ background }; height: ${ 8 * props.scale }px;"></i>
                                    <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3;">${ param.name }</label>
                                    <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5;">${ value }${ props.unit }</label>
                                `
                            })()
                        }
                    </div>
                </div>
            `
        }
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};

const barStyle = ref({});

const computeBarStyle = () => {
    if (!document.getElementById(`zrx-chart-${ randomId }`)) {
        return false;
    }
    const style = {
        width: `${ 12 * props.scale }px`,
        height: `${ 200 * props.scale }px`,
        height: `${ props.barHeight * props.scale }px`
    };
    const sum = props.barSeriesData.reduce((x, y) => x + y, 0);
    // style['grid-template-rows'] = sum ? props.barSeriesData.map(n => `minmax(0, ${n || 0}fr)`).join(' ') : `repeat(${ props.barSeriesData.length }, minmax(0, 1fr))`;
    style['grid-template-rows'] = sum ? props.barSeriesData.map(n => `minmax(0, ${n || 0}fr)`).join(' ') : `repeat(${ props.barSeriesData.length }, 0)`;
    const { offsetWidth, offsetHeight } = document.getElementById(`zrx-chart-${ randomId }`);
    const left = offsetWidth / 2 + Math.cos(props.startAngle / 180 * Math.PI) * props.radius[1] * props.scale + props.lineLength * props.scale + 9 * props.scale;
    const top = offsetHeight / 2 - Math.sin(props.startAngle / 180 * Math.PI) * props.radius[1] * props.scale - 6 * props.scale;
    style.top = `${ top }px`;
    style.left = `${ left }px`;
    barStyle.value = style;
};

watch(() => props, computeBarStyle);

onMounted(() => {
    computeBarStyle();
});

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped>
$remh: 1px;
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.zrx-chart {
    position: relative;
    .chart-container {
        width: 100%;
        height: 100%;
    }
    .bar {
        display: grid;
        grid-row-gap: 3 * $remh;
        padding: 3 * $remh;
        position: absolute;
        background-color: #0a3a5f;
        &:before, &:after {
            content: '';
            position: absolute;
            right: -3 * $remh;
            left: -3 * $remh;
            height: 8 * $remh;
            border: 1 * $remh solid #30d5eb;
        }
        &:before {
            top: -3 * $remh;
            border-bottom: none;
        }
        &:after {
            bottom: -3 * $remh;
            border-top: none;
        }
        .bar-item {
        }
    }
}
</style>
