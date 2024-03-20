<template>
    <div class="zrx-chart" ref="chartDom"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { defineProps, ref, onMounted, defineExpose } from 'vue';
// 图表实例
let chart;
// 图表 dom 对象
const chartDom = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description x 轴坐标
     * @example ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
     */
    xAxisData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 图表数据
     * @example [
     *     [8, 30, 50, 82, 73, 84, 50],
     *     [32, 94, 61, 11, 52, 68, 58]
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description legend 数据
     * @example ['总能耗', '能耗照明']
     */
    legendData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 是否平滑
     * @example false
     */
    smooth: {
        type: [Boolean, Number],
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
     * @description 是否显示 symbol
     * @example true
     */
    showSymbol: {
        type: [Boolean],
        default: () => false
    },
    /**
     * @description 单位
     * @example ['kw/h', 'kg']
     */
    unit: {
        type: [String, Array],
        default: () => []
    },
    /**
     * @description 上下左右边距
     * @example { top: 84, right: 18, bottom: 56, left: 56 }
     */
    grid: {
        type: [Object],
        default: () => ({
            top: 60,
            right: 29,
            bottom: 36,
            left: 48
        })
    },
    /**
     * @description y 轴名称
     * @example '亿元'
     */
    yAxisName: {
        type: [String],
        default: () => ''
    },
    /**
     * @description legend 定位
     * @example { top: 120, left: 316 }
     */
    legendPosition: {
        type: [Object],
        default: () => ({ top: 20, left: 16 })
    },
    /**
     * @description tooltip 名称数组
     * @example ['名称A', '名称B']
     */
    tooltipNames: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 预设颜色
     * @example [
     *     {
     *         color: '#405FFE',
     *         lineColor: '#405FFE',
     *         areaColor: {
     *             type: 'linear',
     *             x: 0, y: 0, x2: 0, y2: 1,
     *             colorStops: [
     *                 {
     *                     offset: 0,
     *                     color: 'rgba(64, 95, 254, 0.4)'
     *                 },
     *                 {
     *                     offset: 1,
     *                     color: 'rgba(64, 95, 254, 0)'
     *                 }
     *             ]
     *         }
     *     },
     *     {
     *         color: '#1BBE8C',
     *         lineColor: '#1BBE8C',
     *         areaColor: {
     *             type: 'linear',
     *             x: 0, y: 0, x2: 0, y2: 1,
     *             colorStops: [
     *                 {
     *                     offset: 0,
     *                     color: 'rgba(27, 190, 140, 0.4)'
     *                 },
     *                 {
     *                     offset: 1,
     *                     color: 'rgba(27, 190, 140, 0)'
     *                 }
     *             ]
     *         }
     *     }
     * ]
     */
    color: {
        type: [Array],
        default: () => [
            {
                color: '#405FFE',
                lineColor: '#405FFE',
                areaColor: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(64, 95, 254, 0.4)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(64, 95, 254, 0)'
                        }
                    ]
                }
            },
            {
                color: '#1BBE8C',
                lineColor: '#1BBE8C',
                areaColor: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(27, 190, 140, 0.4)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(27, 190, 140, 0)'
                        }
                    ]
                }
            }
        ]
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
    chart = echarts.init(chartDom.value)
    const option = {
        legend: {
            show: true,
            top: props.legendPosition.top !== undefined ? props.legendPosition.top : 'auto',
            right: props.legendPosition.right !== undefined ? props.legendPosition.right : 'auto',
            bottom: props.legendPosition.bottom !== undefined ? props.legendPosition.bottom : 'auto',
            left: props.legendPosition.left !== undefined ? props.legendPosition.left : 'auto',
            itemHeight: 8,
            itemWidth: 8,
            itemGap: 16,
            padding: 0,
            selectedMode: props.seriesData.length >= 2,
            data: props.legendData.map((name, index) => {
                const color = props.color[index % props.color.length]
                return {
                    icon: 'path://M 10, 10 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 Z',
                    name,
                    itemStyle: {
                        color: color.color,
                        borderWidth: 0
                    }
                }
            }),
            textStyle: {
                color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`,
                fontSize: 14,
                fontFamily: 'MicrosoftYaHei'
            }
        },
        grid: {
            top: props.grid.top || 60,
            right: props.grid.right || 29,
            bottom: props.grid.bottom || 36,
            left: props.grid.left || 48
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                z: 1,
                lineStyle: {
                    type: 'solid',
                    color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.3)`
                }
            },
            formatter: (params) => {
                const templateStr = params.map(item => {
                    const seriesIndex = item.seriesIndex
                    const color = props.color[seriesIndex % props.color.length]
                    const unit = props.unit instanceof Array ? props.unit[seriesIndex % props.unit.length] : props.unit
                    return `
                        <div style="display: grid; grid-template-columns: 8px auto min-content; grid-template-rows: 24px auto min-content; grid-column-gap: 8px; align-items: center;">
                            <i style="background-color: ${color.color}; display: inline-block; height: 8px; border-radius: 50%;"></i>
                            <span style="opacity: 0.7; font-family: MicrosoftYaHei; font-size: 14px; color: #3B4155;">${props.legendData[seriesIndex % props.legendData.length]}</span>
                            <span style="font-family: MicrosoftYaHei; font-size: 16px; color: #3B4155; font-weight: 600; white-space: nowrap;">
                                ${item.value}
                                <i style="font-weight: 400; font-size: 12px; font-style: normal;">${unit || ''}</i>
                            </span>
                        </div>
                    `
                }).join('')
                const tooltipName = props.tooltipNames[params[0].dataIndex % props.tooltipNames.length] || params[0].axisValue || ''
                return `
                    <h4 style="opacity: 0.7; font-family: MicrosoftYaHei; font-size: 14px; color: #3B4155; line-height: 24px;">${tooltipName}</h4>
                    ${templateStr}
                `
            }
        },
        xAxis: {
            type: 'category',
            data: props.xAxisData,
            axisTick: {
                inside: true,
                length: 3,
                alignWithLabel: true,
                lineStyle: {
                    color: '#DCDFE8'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#DCDFE8'
                }
            },
            axisLabel: {
                fontFamily: 'MicrosoftYaHei',
                fontSize: 12,
                color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`,
                lineHeight: 20,
                margin: 4
            }
        },
        yAxis: {
            type: 'value',
            name: props.yAxisName || '',
            splitNumber: 4,
            axisTick: {
                show: false
            },
            axisLabel: {
                fontFamily: 'MicrosoftYaHei',
                fontSize: 12,
                color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`,
                margin: 8
            },
            splitLine: {
                lineStyle: {
                    color: '#DCDFE8',
                    type: 'dashed'
                }
            }
        },
        series: props.seriesData.map((seriesItem, seriesIndex) => {
            const color = props.color[seriesIndex % props.color.length]
            return {
                name: props.legendData[seriesIndex % props.legendData.length],
                type: 'line',
                legendHoverLink: false,
                data: seriesItem.map(value => {
                    return {
                        value,
                        itemStyle: {
                            color: props.showSymbol ? 'white' : 'rgba(255, 255, 255, 0)',
                            borderColor: props.showSymbol ? color.color : 'transparent'
                        },
                        label: {
                            show: props.showLabel,
                            formatter: `{a|${value}}\n{b|}`,
                            distance: 4,
                            rich: {
                                a: {
                                    backgroundColor: 'white',
                                    padding: [1, 9],
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 12,
                                    color: '#3B4155',
                                    lineHeight: 20,
                                    height: 20,
                                    borderRadius: 4,
                                    shadowColor: 'rgba(0, 0, 0, 0.12)',
                                    shadowBlur: 6,
                                    shadowOffsetY: 2
                                },
                                b: {
                                    width: 8,
                                    height: 4,
                                    align: 'center',
                                    backgroundColor: {
                                        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAYAAACXU8ZrAAAAAXNSR0IArs4c6QAAACxJREFUGFdj/P///38GAoARJI9PISMIwAzBphAmD1eEbiKyASiKYAqRFYDEANlzFAIJfsytAAAAAElFTkSuQmCC'
                                    }
                                }
                            }
                        }
                    }
                }),
                symbol: 'circle',
                symbolSize: 6,
                smooth: props.smooth,
                itemStyle: {
                    color: 'white',
                    borderColor: color.color,
                    borderWidth: 1
                },
                emphasis: {
                    disabled: true,
                    scale: 2,
                    itemStyle: {
                        color: color.color,
                        borderColor: 'white',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.4)',
                        shadowBlur: 4,
                        shadowOffsetY: 2
                    }
                },
                lineStyle: {
                    color: color.lineColor
                },
                areaStyle: {
                    color: color.areaColor
                },
                label: {
                    show: true,
                    position: 'top'
                }
            }
        })
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};
defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>
