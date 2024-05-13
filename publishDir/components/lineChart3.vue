<template>
    <!-- <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { defineProps, ref, onMounted, defineExpose } from 'vue';
import { computeColorRGBA } from '../utils/index.js';
// 以下这串字符串为特殊字符串，用于指定组件自动生成的 “属性.vue” 说明文件中，每列列宽
/* @attribute-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 3fr) minmax(0, 3fr); */
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表实例
let chart;
// 图表 dom 对象
// const chartRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 图表缩放比例
     * @example 1
     */
    scale: {
        type: [Number],
        default: () => 1
    },
    /**
     * @description x 轴坐标
     * @example ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业']
     */
    xAxisData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description y轴单位
     * @example ['亿元', '%']
     */
    yAxisName: {
        type: [String, Array],
        default: () => ['']
    },
    /**
     * @description 数据数组
     * @example [
     *     {
     *         // 需要指定 y 轴索引
     *         yAxisIndex: 0,
     *         data: [163, 129, 123, 198, 152, 152, 178]
     *     },
     *     {
     *         yAxisIndex: 1,
     *         data: [81, 17, 30, 94, 45, 54, 60]
     *     }
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 图表项颜色
     * @example ['red', 'green']
     */
    color: {
        type: [Array],
        default: () => ['#66FFFF', '#F4DC3C']
    },
    /**
     * @description legend 数据
     * @example ['统计金额', '开票金额']
     */
    legendData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 是否平滑
     * @example true
     */
    smooth: {
        type: [Boolean, Number],
        default: () => false
    },
    /**
     * @description 线条是否显示区域颜色
     * @example false
     */
    showLineArea: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 是否显示辅助刻度线
     * @example false
     */
    showSplitLine: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 上下左右边距
     * @example { top: 84, right: 18, bottom: 56, left: 56 }
     */
    grid: {
        type: [Object],
        default: () => ({
            top: 56,
            right: 60,
            bottom: 40,
            left: 60
        })
    },
    /**
     * @description 是否显示 legend
     * @example false
     */
    showLegend: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 最多显示的数量（实际显示数量会根据输入值调整）
     * @example 4
     */
    showCount: {
        type: [Number],
        default: () => 12
    },
    /**
     * @description 何种方式拖动 inside 内容区域拖动，slider 滑块拖动
     * @example 'slider'
     */
    dataZoomType: {
        type: [String],
        default: () => 'inside'
    },
    /**
     * @description 当 dataZoomType 为 slider 时，拖动区域距离底部的距离
     * @example 12
     */
    dataZoomBottom: {
        type: [Number],
        default: () => 0
    },
    /**
     * @description 从末尾开始显示图表
     * @example false
     */
    dataZoomStartAtEnd: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 是否显示 label
     * @example true
     */
    showLabel: {
        type: [Boolean],
        default: () => false
    },
    /**
     * @description tooltip 标题
     * @example ['标题A']
     */
    tooltipTitle: {
        type: [Array],
        default: () => null
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
        typeof chart.dispose === 'function' && chart.dispose()
        chart = null
    }
    // chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
    const option = {
        grid: (() => {
            const grid = { top: 56, right: 60, bottom: 40, left: 60 };
            for (const k in grid) {
                props.grid[k] !== undefined && (grid[k] = props.grid[k]);
                grid[k] = grid[k] * props.scale;
            }
            return grid;
        })(),
        yAxis: [
            ...(typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName).map((name, index) => {
                return {
                    name,
                    type: 'value',
                    splitNumber: 4,
                    alignTicks: true,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        color: `#B0D0EE`,
                        margin: 14 * props.scale,
                        fontSize: 16 * props.scale,
                        fontFamily: 'MicrosoftYaHei'
                    },
                    nameTextStyle: {
                        color: `#B0D0EE`,
                        fontSize: 16 * props.scale,
                        fontFamily: 'MicrosoftYaHei',
                        align: ['right', 'left'][index],
                        padding: [[0, 14, 14, 0], [0, 0, 14, 14]][index].map(n => n * props.scale)
                    },
                    splitLine: {
                        show: props.showSplitLine,
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(255, 255, 255, 0.15)'
                        }
                    }
                }
            })
        ],
        xAxis: {
            type: 'category',
            data: props.xAxisData,
            axisTick: { show: false },
            axisLine: {
                lineStyle: { color: 'rgb(128, 128, 128)' }
            },
            axisLabel: {
                color: `#B0D0EE`,
                margin: 8 * props.scale,
                fontSize: 16 * props.scale,
                fontFamily: 'MicrosoftYaHei',
                lineHeight: 21 * props.scale
            }
        },
        series: (() => {
            const series = props.seriesData.map((seriesItem, seriesIndex) => {
                const { r, g, b, a } = computeColorRGBA(props.color[seriesIndex % props.color.length]);
                const seriesOption = {
                    type: 'line',
                    data: seriesItem.data || [],
                    yAxisIndex: seriesItem.yAxisIndex || 0,
                    name: props.legendData[seriesIndex % props.legendData.length] || ''
                };
                seriesOption.symbol = 'circle';
                seriesOption.smooth = props.smooth;
                seriesOption.symbolSize = 8 * props.scale;
                seriesOption.itemStyle = {
                    color: 'rgb(13, 58, 107)',
                    borderWidth: 2 * props.scale,
                    borderColor: props.color[seriesIndex % props.color.length]
                };
                seriesOption.lineStyle = {
                    width: 2 * props.scale,
                    type: seriesItem.lineType || 'solid',
                    color: props.color[seriesIndex % props.color.length]
                };
                seriesOption.areaStyle = {
                    color: props.showLineArea ?
                        {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: `rgba(${ r }, ${ g }, ${ b }, ${ a * 0.35 })` },
                                { offset: 1, color: `rgba(${ r }, ${ g }, ${ b }, ${ a * 0 })` },
                            ]
                        } :
                        'transparent'
                };
                seriesOption.label = {
                    textShadowOffsetX: 0,
                    show: props.showLabel,
                    fontSize: 14 * props.scale,
                    fontFamily: 'DINAlternate-Bold',
                    textShadowBlur: 4 * props.scale,
                    textShadowOffsetY: 2 * props.scale,
                    textShadowColor: 'rgba(0, 0, 0, 0.50)',
                    color: props.color[seriesIndex % props.color.length],
                    formatter: v => v.value
                };
                // const markLines = props.markLine.filter(n => (n.yAxisIndex || 0) === seriesOption.yAxisIndex);
                // markLines.length &&
                //     (seriesOption.markLine = {
                //         symbol: 'none',
                //         silent: true,
                //         data: markLines.map(n => ({
                //             yAxis: n.value,
                //             lineStyle: {
                //                 width: 2 * props.scale,
                //                 color: n.color,
                //                 type: n.type
                //             },
                //             label: {
                //                 show: true,
                //                 align: 'right',
                //                 distance: 0,
                //                 color: '#FFFFFF',
                //                 fontSize: 28 * props.scale,
                //                 borderWidth: 2 * props.scale,
                //                 borderColor: n.color,
                //                 backgroundColor: '#0F325C',
                //                 padding: [6 + 6, 20, 0 + 6].map(n => n * props.scale),
                //                 offset: [-38, 0].map(n => n * props.scale),
                //                 formatter: param => `{value|${param.value}}`,
                //                 rich: {
                //                     value: {
                //                         fontSize: 28 * props.scale
                //                     }
                //                 }
                //             }
                //         }))
                //     });
                return seriesOption;
            });
            return series;
        })(),
        tooltip: {
            padding: 0,
            confine: true,
            borderWidth: 0,
            borderRadius: 0,
            trigger: 'axis',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0)',
                    type: 'solid'
                }
            },
            formatter: params => {
                const tooltipTitle = props.tooltipTitle instanceof Array ? props.tooltipTitle[params[0]?.dataIndex] : params[0]?.axisValue;
                return `
                    <div style="background-color: rgba(0, 35, 68, 0.8); padding: ${ 8 * props.scale }px ${ 21 * props.scale }px ${ 13 * props.scale }px; border-radius: 0; border-radius: ${ 5 * props.scale }px;">
                        <h4 style="line-height: ${ 19 * props.scale }px; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #B0D0EE; font-weight: 400; margin-bottom: ${ 9 * props.scale }px;">
                            ${ tooltipTitle }
                        </h4>
                        <div style="display: grid; grid-template-columns: ${ 6 * props.scale }px min-content min-content; grid-column-gap: ${ 10 * props.scale }px; grid-auto-rows: ${ 19 * props.scale }px; grid-row-gap: ${ 7 * props.scale }px; align-items: center;">
                            ${ params
                                .map(n => {
                                    const color = props.color[n.seriesIndex % props.color.length];
                                    const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName;
                                    const yAxisIndex = props.seriesData[n.seriesIndex]?.yAxisIndex || 0;
                                    const unit = yAxisName[yAxisIndex % yAxisName.length] || '';
                                    return `
                                        <i style="background-color: ${ color }; height: 6px; border-radius: 50%;"></i>
                                        <span style="font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #B0D0EE; font-weight: 400;">${ n.seriesName }</span>
                                        <div style="font-family: DINAlternate-Bold; font-size: ${ 18 * props.scale }px; color: #FF9811; font-weight: 700;">
                                            ${ n.data }
                                            <span style="font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #B0D0EE; font-weight: 400;">${ unit }</span>
                                        </div>
                                    `
                                })
                                .join('')}
                        </div>
                    </div>
                `
            }
        },
        legend: (() => {
            const legendConfig = {
                show: props.showLegend,
                data: props.legendData.map((name, index) => {
                    return {
                        name,
                        itemStyle: { color: props.color[index % props.color.length] }
                    };
                }),
                icon: 'circle',
                top: 0 * props.scale,
                align: 'left',
                textStyle: {
                    color: '#B0D0EE',
                    fontSize: 14 * props.scale,
                    lineHeight: 24 * props.scale,
                    fontFamily: 'MicrosoftYaHei',
                    padding: [0, 0, 0, 6].map(n => n * props.scale)
                },
                itemGap: 16 * props.scale,
                itemWidth: 4 * props.scale,
                itemHeight: 4 * props.scale
            }
            return legendConfig;
        })()
    };
    let start = 0;
    let end = props.showCount / props.xAxisData.length * 100;
    if (props.showCount) {
        if (props.dataZoomStartAtEnd) {
            start = 100 - end;
            end = 100;
        }
        if (props.dataZoomType === 'slider') {
            option.dataZoom = [
                {
                    type: 'slider',
                    brushSelect : false,
                    handleIcon: 'none',
                    borderColor: 'transparent',
                    dataBackground: {
                        lineStyle: { color: 'transparent' },
                        areaStyle: { color: 'transparent' }
                    },
                    selectedDataBackground: {
                        lineStyle: { color: 'transparent' },
                        areaStyle: { color: 'transparent' }
                    },
                    height: 8 * props.scale,
                    fillerColor: '#467C9F',
                    labelFormatter: '',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 0,
                    start,
                    end,
                    handleStyle: { color: 'red' },
                    bottom: props.dataZoomBottom
                }
            ];
        } else {
            option.dataZoom = [
                { type: 'inside', start, end }
            ];
        }
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};
defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>