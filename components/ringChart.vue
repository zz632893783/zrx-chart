<template>
    <div class="chart" ref="chartRef"></div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
import { setFixed } from '../utils/index.js';
// 图表实例
let chart;
// 图表 dom 对象
const chartRef = ref();
// 可配置属性
const props = defineProps({
    // 标题
    title: {
        type: [String],
        default: () => ''
    },
    // 半径
    radius: {
        type: [Array],
        // default: () => [60, 70]
        default: () => [68, 80]
    },
    // 间距
    itemGap: {
        type: [Number],
        default: () => 2
    },
    // 数据项
    seriesData: {
        type: [Array],
        default: () => [61, 52, 97, 99, 80, 77, 80, 67, 83].map((value, index) => ({ value, name: `第${ index + 1 }项` }))
    },
    // 颜色
    color: {
        type: [Array],
        default: () => ['#ae7efd', '#7670d7', '#709ad7', '#72dde0', '#d0f1ff', '#b5bfe2', '#206e8a', '#1dd1ff', '#d2abea', '#0e8fff']
    },
    // tooltipTitle: {
    //     type: [String],
    //     default: () => 'tooltip标题'
    // },
    // 单位
    unit: {
        type: [String],
        default: () => ''
    },
    // showLabel: {
    //     type: [Boolean],
    //     default: () => false
    // },
    // 中心部分的展示部分
    // null，'' 或者不传，表示中心部分不显示
    // item 表示中心部分展示单项
    // sum 表示中心部分展示总量
    centerDisplay: {
        type: [String],
        default: () => null
        // default: () => 'item'
        // default: () => 'sum'
        // default: () => 'itemValue'
        // default: () => 'itemPercentage'
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
    // 单项的最小角度
    minAngle: {
        type: [Number],
        default: () => 0
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
        legend: {
            show: true,
            top: -1e6
        },
        title: (() => {
            const sum = props.seriesData.reduce((x, y) => x + (Number(typeof y === 'object' ? y?.value : y) || 0), 0);
            const isInteger = parseInt(sum) === sum;
            const titleConfig = {
                show: props.centerDisplay === 'sum',
                text: `{a|${ props.title }}\n{gap0|}\n{b|${ setFixed(sum || 0, isInteger ? 0 : 2) }}\n{gap1|}\n{c|${ props.unit }}`,
                left: 'center',
                top: 'center',
                textStyle: {
                    rich: {
                        a: {
                            color: 'white',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 14 * props.scale,
                            lineHeight: 19 * props.scale
                        },
                        gap0: { height: 4 * props.scale },
                        b: {
                            color: '#F4DC3C',
                            fontFamily: 'DINAlternate-Bold',
                            fontSize: 28 * props.scale,
                            lineHeight: 32 * props.scale
                        },
                        gap1: { height: 0 },
                        c: {
                            color: 'white',
                            fontFamily: 'MicrosoftYaHei',
                            fontSize: 12 * props.scale,
                            lineHeight: 16 * props.scale
                        }
                    }
                }
            };
            return titleConfig;
        })(),
        tooltip: {
            // show: true,
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
                                const colors = props.color;
                                const color = colors[param.dataIndex % colors.length];
                                let background;
                                if (typeof color === 'object' && color.type === 'linear') {
                                    const angle = Math.atan((color.y2 - color.y) / (color.x2 - color.x)) / Math.PI * 180 + 90;
                                    const colorStops = [...color.colorStops].sort((x, y) => x.offset - y.offset);
                                    background = `background-image: linear-gradient(${angle}deg, ${ colorStops.map(n => `${ param.color } ${ `${param.offset * 100}%` } `).join(',') })`;
                                } else {
                                    background = `background-color: ${ color }`;
                                }
                                const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName
                                const yAxisIndex = props.seriesData[param.seriesIndex]?.yAxisIndex || 0;
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
        },
        series: [
            {
                type: 'pie',
                name: 'pie',
                radius: [
                    props.radius[0] - props.itemGap,
                    props.radius[1] + props.itemGap
                ].map(n => n * props.scale),
                minAngle: props.minAngle,
                data: props.seriesData.map((value, index) => {
                    typeof value !== 'object' && (value = { value });
                    const color = props.color[index % props.color.length];
                    const labelConfig = { position: 'center' };
                    switch (props.centerDisplay) {
                        case null:
                        case undefined:
                        case '':
                        case 'sum':
                            labelConfig.show = false;
                            break;
                        case 'item':
                            labelConfig.show = false;
                            labelConfig.formatter = param => {
                                let value;
                                if ([null, undefined, '', NaN].includes(param.value)) {
                                    value = '- -'
                                } else {
                                    value = parseInt(param.value) === Number(param.value) ? param.value : setFixed(Number(param.value) || 0, 2);
                                }
                                return `{dot|}{colGap0|}{itemTitle|${ param.name }}\n{rowGap0|}\n{value|${ value }}{unit|${ props.unit }}\n{rowGap1|}\n{label|占比}{percent|${ param.percent }}{label|%}`
                            };
                            labelConfig.rich = {
                                dot: {
                                    backgroundColor: color,
                                    width: 8 * props.scale,
                                    height: 8 * props.scale,
                                    verticalAlign: 'center'
                                },
                                colGap0: { width: 8 * props.scale },
                                itemTitle: {
                                    color: 'white',
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 14 * props.scale,
                                    lineHeight: 19 * props.scale,
                                    verticalAlign: 'center'
                                },
                                rowGap0: { height: 4 * props.scale },
                                value: {
                                    color: '#F4DC3C',
                                    fontFamily: 'DINAlternate-Bold',
                                    fontSize: 32 * props.scale,
                                    lineHeight: 37 * props.scale,
                                    verticalAlign: 'bottom'
                                },
                                unit: {
                                    color: 'white',
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 14 * props.scale,
                                    lineHeight: 37 * props.scale,
                                    verticalAlign: 'bottom'
                                },
                                rowGap1: { height: 0 },
                                label: {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 12 * props.scale,
                                    lineHeight: 24 * props.scale,
                                    verticalAlign: 'bottom'
                                },
                                percent: {
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontFamily: ' DINAlternate-Bold',
                                    fontSize: 20 * props.scale,
                                    lineHeight: 24 * props.scale,
                                    verticalAlign: 'bottom'
                                }
                            };
                            break;
                        case 'itemValue':
                        case 'itemPercentage':
                            labelConfig.show = false;
                            labelConfig.formatter = param => {
                                const unit = props.centerDisplay === 'itemValue' ? props.unit : '%';
                                const value = [null, undefined, '', NaN].includes(param.value) ? '- -' : (props.centerDisplay === 'itemValue' ? param.value : param.percent);
                                return `{dot|}\n{title|${ param.name }}\n{value|${ value }}{unit|${ unit }}`;
                            };
                            labelConfig.rich = {
                                dot: {
                                    backgroundColor: color,
                                    width: 8 * props.scale,
                                    height: 8 * props.scale
                                },
                                title: {
                                    color: 'white',
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 14 * props.scale,
                                    lineHeight: 19 * props.scale,
                                    padding: [10, 0, 2, 0].map(n => n * props.scale)
                                },
                                value: {
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontFamily: ' DINAlternate-Bold',
                                    fontSize: 20 * props.scale,
                                    lineHeight: 24 * props.scale,
                                    verticalAlign: 'bottom'
                                },
                                unit: {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 12 * props.scale,
                                    lineHeight: 24 * props.scale,
                                    verticalAlign: 'bottom'
                                }
                            };
                            break;
                    }
                    return {
                        ...value,
                        itemStyle: { color },
                        label: labelConfig,
                        emphasis: {
                            label: { show: ['item', 'itemValue', 'itemPercentage'].includes(props.centerDisplay) }
                        }
                    }
                }),
                labelLine: { show: false },
                // silent: props.centerDisplay === 'sum',
                itemStyle: {
                    borderWidth: props.itemGap,
                    borderColor: 'rgb(3, 43, 68)'
                },
                emphasis: { scaleSize: 5 * props.scale }
            }
        ]
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
    // chart.on('mouseover', param => {
    //     console.log(param.dataIndex)
    // })
    // chart.on('mouseout', param => {
    //     console.log(param.dataIndex)
    // })
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped>
.chart {}
</style>