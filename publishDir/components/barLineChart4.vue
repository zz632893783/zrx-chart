<template>
    <div class="zrx-chart" ref="chartDom"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { defineProps, ref, onMounted } from 'vue';
// 可配置属性
const props = defineProps({
    /**
     * @description 各项颜色
     * @example ['#405FFE', 'rgb(255, 164, 51)', 'rgb(27, 190, 140)']
     */
    color: {
        type: [Array],
        default: () => ['#405FFE', 'rgb(255, 164, 51)', 'rgb(27, 190, 140)']
    },
    /**
     * @description x 轴坐标数据
     * @example ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
     */
    xAxisData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description x 图表数据
     * @example [
     *     [8, 30, 50, 82, 73, 84, 50],
     *     [32, 94, 61, 11, 52, 68, 58],
     *     [33, 13, 27, 92, 44, 82, 19]
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description legend 数据
     * @example ['总能耗', '能耗照明', '节约能耗', '同环比']
     */
    legendData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description y 轴单位
     * @example '单位：次'
     */
    yAxisName: {
        type: [String, Array],
        default: () => ''
    },
    /**
     * @description 数据的单位
     * @example ['kw/h', 'kw', 'h']
     */
    unit: {
        type: [String, Array],
        default: () => ''
    },
    /**
     * @description 上下左右间距
     * @example { top: 89, right: 16, bottom: 40, left: 53 }
     */
    grid: {
        type: [Object],
        default: () => ({ top: 89, right: 16, bottom: 40, left: 53 })
    },
    /**
     * @description 是否显示 legend
     * @example false
     */
    showLegend: {
        type: [Boolean],
        default: () => false
    },
    /**
     * @description 被选中时，遮罩层的颜色
     * @example 'rgba(255, 255, 255, 0.4)'
     */
    emphasisCoverColor: {
        type: [String],
        default: () => 'rgba(255, 255, 255, 0.4)'
    },
    /**
     * @description 柱子宽度
     * @example 24
     */
    barWidth: {
        type: [Number],
        default: () => 12
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
     * @description 指示线样式
     * @example 'solid'
     */
    axisLineType: {
        type: [String],
        default: () => 'dashed'
    },
    /**
     * @description 指示线颜色
     * @example 'rgba(255, 0, 0, 0.3)'
     */
    axisLineColor: {
        type: [String],
        default: () => 'rgba(59, 65, 85, 0.3)'
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
// 图表实例
let chart;
// 图表 dom 对象
const chartDom = ref();
// 渲染函数
const renderChart = () => {
    if (chart) {
        typeof chart.dispose === 'function' && chart.dispose();
        chart = null;
    }
    chart = echarts.init(chartDom.value);
    // UI 要求的高亮时覆盖上一层 0.4 透明度白色
    // 但是由于 props.color 可能为 red, #f00, #ff0000, rgb(255, 0, 0), rgba(255, 0, 0, 1) 中的任意一种格式
    // 所以引入一个 canvas 用于计算高亮颜色 emphasisColor
    // 计算方式为绘制本身颜色，之后再绘制 emphasisCoverColor，然后取绘制部分的 getImageData 的 r, g, b, a 值拼接成高亮颜色
    const emphasisColor = [];
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext('2d');
    props.color.forEach(color => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);
        ctx.fillStyle = props.emphasisCoverColor;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        emphasisColor.push(`rgba(${r}, ${g}, ${b}, ${a / 255})`);
    });
    const option = {
        legend: {
            show: props.showLegend,
            top: 12,
            right: 24,
            itemHeight: 8,
            itemWidth: 8,
            itemGap: 16,
            data: props.legendData.map((name, index) => {
                const color = props.color[index % props.color.length];
                return {
                    icon: 'path://M 10, 10 m -10, 0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0 Z',
                    name,
                    itemStyle: {
                        color,
                        borderWidth: 0
                    }
                };
            }),
            textStyle: {
                color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`,
                fontSize: 14,
                fontFamily: 'MicrosoftYaHei'
            }
        },
        grid: {
            top: props.grid.top || 89,
            right: props.grid.right || 16,
            bottom: props.grid.bottom || 40,
            left: props.grid.left || 53
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    type: props.axisLineType,
                    color: props.axisLineColor
                }
            },
            formatter: (params) => {
                const templateStr = params.map(item => {
                    const seriesIndex = item.seriesIndex;
                    const color = props.color[seriesIndex % props.color.length];
                    const unit = props.unit instanceof Array ? props.unit[seriesIndex % props.unit.length] : props.unit;
                    return `
                        <div style="display: grid; grid-template-columns: 8px auto min-content; grid-template-rows: 24px auto min-content; grid-column-gap: 8px; align-items: center;">
                            <i style="background-color: ${color}; display: inline-block; height: 8px; border-radius: 50%;"></i>
                            <span style="opacity: 0.7; font-family: MicrosoftYaHei; font-size: 14px; color: #3B4155;">${props.legendData[seriesIndex % props.legendData.length]}</span>
                            <span style="font-family: MicrosoftYaHei; font-size: 16px; color: #3B4155; font-weight: 600; white-space: nowrap;">
                                ${item.value}
                                <i style="font-weight: 400; font-size: 12px; font-style: normal;">${unit || ''}</i>
                            </span>
                        </div>
                    `;
                }).join('');
                return `
                    <h4 style="opacity: 0.7; font-family: MicrosoftYaHei; font-size: 14px; color: #3B4155; line-height: 24px;">${params[0].axisValue}</h4>
                    ${templateStr}
                `;
            }
        },
        xAxis: {
            type: 'category',
            data: props.xAxisData,
            axisTick: {
                show: false,
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
        // yAxis: {
        //     type: 'value',
        //     name: props.yAxisName,
        //     nameTextStyle: {
        //         align: 'left',
        //         padding: [0, 0, 0, -36],
        //         fontFamily: 'MicrosoftYaHei',
        //         fontSize: 14,
        //         color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`,
        //         lineHeight: 32
        //     },
        //     splitNumber: 4,
        //     axisTick: {
        //         show: false
        //     },
        //     axisLabel: {
        //         fontFamily: 'MicrosoftYaHei',
        //         fontSize: 12,
        //         color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`,
        //         margin: 8
        //     },
        //     splitLine: {
        //         lineStyle: {
        //             color: '#DCDFE8',
        //             type: 'dashed'
        //         }
        //     }
        // },
        yAxis: (typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName).map((name, index) => {
            return {
                type: 'value',
                name,
                nameTextStyle: {
                    align: 'left',
                    padding: [0, 0, 0, -36],
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: 14,
                    color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`,
                    lineHeight: 32
                },
                splitNumber: 4,
                axisTick: { show: false },
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
            }
        }),
        series: props.seriesData.map((seriesItem, seriesIndex) => {
            const color = props.color[seriesIndex % props.color.length];
            const conf = {
                name: props.legendData[seriesIndex % props.legendData.length],
                type: seriesItem.type,
                yAxisIndex: seriesItem.yAxisIndex || 0,
                data: seriesItem.data.map(value => {
                    return {
                        value,
                        label: {
                            show: false,
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
                                    shadowBlur: 4
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
                    };
                }),
                label: {
                    show: true,
                    position: 'top'
                }
            }
            if (seriesItem.type === 'bar') {
                conf.symbol = 'none';
                conf.barWidth = props.barWidth;
                conf.barGap = 4 / props.barWidth;
                conf.itemStyle = { color, borderRadius: [2, 2, 0, 0] };
                conf.data.forEach(n => {
                    n.emphasis = {
                        itemStyle: { color: emphasisColor[seriesIndex % emphasisColor.length] }
                    };
                });
            }
            if (seriesItem.type === 'line') {
                conf.smooth = props.smooth;
                conf.symbol = 'circle';
                conf.symbolSize = 6;
                conf.itemStyle = { color: 'transparent', borderColor: 'transparent', borderWidth: 1 };
                conf.emphasis = {
                    disabled: true,
                    scale: 2,
                    itemStyle: {
                        color,
                        borderColor: 'white',
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, 0.4)',
                        shadowBlur: 4,
                        shadowOffsetY: 2
                    }
                }
                conf.lineStyle = { color };
            }
            return conf;
        })
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>
