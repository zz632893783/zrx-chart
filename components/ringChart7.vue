<template>
    <div class="zrx-chart">
        <div class="ring-label">
            <slot></slot>
        </div>
        <!-- <div class="chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
        <div class="chart" :id="`zrx-chart-${ randomId }`"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { setFixed } from '../utils/index.js';
import { defineProps, ref, onMounted } from 'vue';
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表实例
let chart;
// 图表 dom 对象
// const chartRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 标题
     * @example '标题'
     */
    title: {
        type: [String],
        default: () => ''
    },
    /**
     * @description 半径
     * @example [60, 70]
     */
    radius: {
        type: [Array],
        default: () => [68, 80]
    },
    /**
     * @description 间距
     * @example 8
     */
    itemGap: {
        type: [Number],
        default: () => 4
    },
    /**
     * @description 底色圆环半径
     * @example [50, 70]
     */
    backgroundRadius: {
        type: [Array],
        default: () => [61, 65]
    },
    /**
     * @description 底色
     * @example 'green'
     */
    backgroundColor: {
        type: [String, Object],
        default: () => ({
			type: 'linear',
			x: 1, y: 0, x2: 0, y2: 1,
			colorStops: [
		 		{ offset: 0, color: '#E9EEF4' },
		 		{ offset: 0.5, color: '#FFFFFF' },
		 		{ offset: 1, color: '#E9EEF4' }
		 	]
		})
    },
    /**
     * @description 预设颜色
     * @example ['#405FFE', '#1BBE8C', '#48CBA3', '#A4E5D1', '#ECEFFE']
     */
    color: {
        type: [Array],
        default: () => ['rgb(0, 85, 255)', 'rgb(181, 191, 226)', 'rgb(43, 195, 255)', 'rgb(31, 110, 138)', 'rgb(114, 221, 224)', 'rgb(184, 222, 255)']
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
     * @example true
     */
    clockwise: {
        type: [Boolean],
        default: () => false
    },
    /**
     * @description 中心部分的展示部分
     *  null，'' 或者不传，表示中心部分不显示
     *  'item' 表示中心部分展示单项
     *  'sum' 表示中心部分展示总量
     *  'itemValue' 表示中心部分展示值
     *  'itemPercentage' 表示中心部分展示单项占比
     * @example 'item'
     */
    centerDisplay: {
        type: [String],
        default: () => null
    },
    /**
     * @description 是否将 tooltip 框限制在图表的区域内
     * @example true
     */
    tooltipConfine: {
        type: [Boolean],
        default: () => false
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
})
// 渲染函数
const renderChart = () => {
    if (chart) {
        typeof chart.dispose === 'function' && chart.dispose()
        chart = null
    }
    // chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
    const rich = {
        a: {
            fontSize: props.centerValueFontSize,
            lineHeight: 24 * props.scale,
            fontWeight: 600,
            fontFamily: 'MicrosoftYaHei',
            color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.9)`
        },
        b: { height: 2 * props.scale },
        c: {
            fontSize: props.centerLabelFontSize * props.scale,
            lineHeight: 20 * props.scale,
            fontFamily: 'MicrosoftYaHei',
            color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`
        }
    }
    const option = {
        color: props.color,
        title: (() => {
            const sum = props.seriesData.reduce((x, y) => x + (Number(typeof y === 'object' ? y?.value : y) || 0), 0);
            const isInteger = parseInt(sum) === sum;
            const titleConfig = {
                show: props.centerDisplay === 'sum',
                text: `{a|${ props.title || '' }}\n{gap0|}\n{b|${ setFixed(sum || 0, isInteger ? 0 : 2) }}{c|${ props.unit }}`,
                left: 'center',
                top: 'center',
                textStyle: {
                    rich: {
                        a: {
                            color: '#969799',
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: 14 * props.scale,
                            lineHeight: 20 * props.scale,
                            padding: [10, 0, 0].map(n => n * props.scale),
                        },
                        gap0: { height: 0 * props.scale },
                        b: {
                            color: '#323233',
                            fontFamily: 'DINAlternate-Bold',
                            fontSize: 28 * props.scale,
                            lineHeight: 42 * props.scale,
							fontWeight: '800',
							// backgroundColor: 'red'
                        },
                        // gap1: { height: 0 },
                        c: {
                            color: '#969799',
                            fontFamily: 'PingFangSC-Regular',
                            fontSize: 14 * props.scale,
                            lineHeight: 30 * props.scale,
							// backgroundColor: 'green'
                        }
                    }
                }
            };
            return titleConfig;
        })(),
        tooltip: {
            trigger: 'item',
            padding: [6, 12].map(n => n * props.scale),
            borderWidth: 0,
            confine: props.tooltipConfine,
            formatter: params => {
                const color = props.color[params.dataIndex % props.color.length]
                return `
                    <div style="display: grid; grid-template-columns: ${ 8 * props.scale }px auto min-content; grid-template-rows: ${ 24 * props.scale }px ${ 24 * props.scale }px; grid-column-gap: ${ 8 * props.scale }px; align-items: center;">
                        <i style="background-color: ${color}; display: inline-block; height: ${ 8 * props.scale }px; border-radius: 50%;"></i>
                        <span style="opacity: 0.7; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #3B4155;">${params.name}</span>
                        <span style="font-family: MicrosoftYaHei; font-size: ${ 16 * props.scale }px; color: #3B4155; font-weight: 600; white-space: nowrap; grid-column-start: 2;">
                            ${((params.value || 0) / props.seriesData.reduce((x, y) => x + (Number(y.value) || 0), 0) * 100).toFixed(1)}
                            <i style="font-weight: 400; font-size: ${ 12 * props.scale }px;">%</i>
                        </span>
                        <span style="font-family: MicrosoftYaHei; font-size: ${ 16 * props.scale }px; color: #3B4155; font-weight: 600; white-space: nowrap;">
                            ${params.value}
                            <i style="font-weight: 400; font-size: ${ 12 * props.scale }px; font-style: normal;">${props.unit || ''}</i>
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
                radius: props.backgroundRadius.map(n => n * props.scale),
                data: [0],
                silent: true,
                label: { show: false },
                itemStyle: { color: props.backgroundColor },
                // center: ['50%', props.showLegend ? '62.88%' : '50%']
                center: ['50%', '50%']
            },
            {
                type: 'pie',
                padAngle: props.itemGap / (Math.max(...props.radius) * 2 * Math.PI) * 360,
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
                radius: props.radius.map(n => n * props.scale),
                data: props.seriesData.map((n, i) => {
                    const color = props.color[i % props.color.length]
                    return {
                        ...n,
                        emphasis: {
                            scale: true,
                            scaleSize: props.scaleSize,
                            itemStyle: { color }
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
    return chart;
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
