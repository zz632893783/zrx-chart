<template>
    <div class="zrx-chart">
        <div class="ring-label">
            <slot></slot>
        </div>
        <!-- <div class="chart" ref="chartDom"></div> -->
        <div class="chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { defineProps, ref, onMounted } from 'vue';
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表实例
let chart;
// 图表 dom 对象
const chartRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 半径
     * @example [60, 70]
     */
    radius: {
        type: [Array],
        default: () => [58, 76]
    },
    /**
     * @description 底色圆环半径
     * @example [50, 70]
     */
    backgroundRadius: {
        type: [Array],
        default: () => [53, 76]
    },
    /**
     * @description 底色
     * @example 'green'
     */
    backgroundColor: {
        type: [String],
        default: () => 'rgb(232, 234, 240)'
    },
    /**
     * @description 预设颜色
     * @example ['#405FFE', '#1BBE8C', '#48CBA3', '#A4E5D1', '#ECEFFE']
     */
    color: {
        type: [Array],
        default: () => ['#1BBE8C', '#F0465A', '#FFA433', '#B8BED5']
    },
    /**
     * @description 数据项
     * @example [
     *     { value: 1048, name: '正常' },
     *     { value: 735, name: '故障' },
     *     { value: 580, name: '告警' },
     *     { value: 484, name: '离线' }
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => []
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
     * @description 悬浮选中单项时，增加的半径
     * @example 20
     */
    scaleSize: {
        type: [Number],
        default: () => 5
    },
    /**
     * @description 饼图的扇区是否是顺时针排布
     * @example false
     */
    clockwise: {
        type: [Boolean],
        default: () => true
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
})
// 渲染函数
const renderChart = () => {
    if (chart) {
        typeof chart.dispose === 'function' && chart.dispose()
        chart = null
    }
    // chart = echarts.init(chartDom.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    const rich = {
        a: {
            fontSize: props.centerValueFontSize,
            lineHeight: 24,
            fontWeight: 600,
            fontFamily: 'MicrosoftYaHei',
            color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.9)`
        },
        b: {
            height: 2
        },
        c: {
            fontSize: props.centerLabelFontSize,
            lineHeight: 20,
            fontFamily: 'MicrosoftYaHei',
            color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`
        }
    }
    const option = {
        color: props.color,
        tooltip: {
            trigger: 'item',
            padding: [6, 12],
            borderWidth: 0,
            formatter: params => {
                const color = props.color[params.dataIndex % props.color.length]
                return `
                    <div style="display: grid; grid-template-columns: 8px auto min-content; grid-template-rows: 24px 24px; grid-column-gap: 8px; align-items: center;">
                        <i style="background-color: ${color}; display: inline-block; height: 8px; border-radius: 50%;"></i>
                        <span style="opacity: 0.7; font-family: MicrosoftYaHei; font-size: 14px; color: #3B4155;">${params.name}</span>
                        <span style="font-family: MicrosoftYaHei; font-size: 16px; color: #3B4155; font-weight: 600; white-space: nowrap; grid-column-start: 2;">
                            ${((params.value || 0) / props.seriesData.reduce((x, y) => x + (y.value || 0), 0) * 100).toFixed(1)}
                            <i style="font-weight: 400; font-size: 12px;">%</i>
                        </span>
                        <span style="font-family: MicrosoftYaHei; font-size: 16px; color: #3B4155; font-weight: 600; white-space: nowrap;">
                            ${params.value}
                            <i style="font-weight: 400; font-size: 12px; font-style: normal;">${props.unit || ''}</i>
                        </span>
                    </div>
                `
            }
        },
        // legend: {
        //     show: props.showLegend,
        //     icon: 'circle',
        //     orient: 'vertical',
        //     top: props.legendPosition.top !== undefined ? props.legendPosition.top : 'auto',
        //     right: props.legendPosition.right !== undefined ? props.legendPosition.right : 'auto',
        //     bottom: props.legendPosition.bottom !== undefined ? props.legendPosition.bottom : 'auto',
        //     left: props.legendPosition.left !== undefined ? props.legendPosition.left : 'auto',
        //     height: 10,
        //     itemHeight: 8,
        //     itemWidth: 8,
        //     padding: [0, 0, 0, -32],
        //     itemGap: 16,
        //     align: 'left',
        //     textStyle: {
        //         color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`,
        //         fontSize: 14,
        //         fontFamily: 'MicrosoftYaHei'
        //     }
        // },
        series: [
            {
                type: 'pie',
                clockwise: props.clockwise,
                radius: props.backgroundRadius,
                data: [0],
                silent: true,
                label: { show: false },
                itemStyle: { color: props.backgroundColor },
                // center: ['50%', props.showLegend ? '62.88%' : '50%']
                center: ['50%', '50%']
            },
            {
                type: 'pie',
                clockwise: props.clockwise,
                label: {
                    // show: props.showLabel,
                    show: false
                    // position: 'center',
                    // rich,
                    // formatter: `{a|${
                    //     props.seriesData
                    //         .reduce((x, y) => x + (y.value || 0), 0)
                    //         .toString()
                    //         .replace(/(?!^)(?=(\d{3})+$)/, ',')
                    //     }}\n{b|}\n{c|${props.name}}`
                },
                radius: props.radius,
                data: props.seriesData.map((n, i) => {
                    const color = props.color[i % props.color.length]
                    return {
                        ...n,
                        emphasis: {
                            scale: true,
                            scaleSize: props.scaleSize,
                            itemStyle: {
                                color
                            }
                        }
                    }
                }),
                // center: ['50%', props.showLegend ? '62.88%' : '50%']
                center: ['50%', '50%']
            }
        ]
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
}
defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped>
.zrx-chart {
    position: relative;
    .ring-label {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: grid;
        align-items: center;
        justify-items: center;
    }
    .center {
        position: absolute;
        top: 62.88%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-template-rows: 24px;
        grid-auto-rows: 20px;
        grid-row-gap: 2px;
        align-items: center;
        justify-items: center;
        .value {
            opacity: 0.9;
            font-family: MicrosoftYaHei;
            font-size: 18px;
            color: #3B4155;
            font-weight: 600;
        }
        .title {
            opacity: 0.7;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #3B4155;
        }
    }
    .chart {
        width: 100%;
        height: 100%;
    }
}
</style>
