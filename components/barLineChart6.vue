<template>
    <!-- <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`"></div>
</template>
<script setup>
import * as echarts from 'echarts';
import { defineProps, ref, onMounted } from 'vue';
import { computeColorRGBA } from '../utils/index.js';
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// legend 图标映射
const legendIconMap = {
    bar: 'path://M4,4L12,4L12,12L4,12ZM0,0L16,16M16,0L0,16',
    line: 'path://M3,7L13,7L13,9L3,9ZM0,0L16,16M16,0L0,16',
};
// 可配置属性
const props = defineProps({
    /**
     * @description 颜色
     * @example ['blue', 'grey']
     */
    color: {
        type: [Array],
        default: () => ['#0055FF', '#1FC49D', '#FF9700']
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
     * @description 最多显示的数量（实际显示数量会根据输入值调整）
     * @example 8
     */
    showCount: {
        type: [Number],
        default: () => 5
    },
    /**
     * @description 何种方式拖动 inside 内容区域拖动，slider 滑块拖动
     * @example 'inside'
     */
    dataZoomType: {
        type: [String],
        default: () => 'slider'
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
     * @example { top: 89, right: 12, bottom: 40, left: 53 }
     */
    grid: {
        type: [Object],
        default: () => ({ top: 65, right: 12, bottom: 34, left: 40 })
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
     * @description 折线是否显示 symbol
     * @example 'circle'
     */
    showLineSymbol: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 线条是否显示区域颜色
     * @example true
     */
    showLineArea: {
        type: [Boolean],
        default: () => false
    },
    /**
     * @description 是否将 tooltip 框限制在图表的区域内
     * @example true
     */
    tooltipConfine: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 是否将 yAxis 刻度线对齐
     * @example false
     */
    alignTicks: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 标记线
     * @example [
     *     {
     *         value: 134,
     *         yAxisIndex: 0,
     *         color: '#33FFBB'
     *     },
     *     {
     *         value: 166,
     *         yAxisIndex: 0,
     *         color: '#F74768'
     *     }
     * ]
     */
    markLine: {
        type: [Array],
        default: () => []
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
// 图表实例
let chart;
// 图表 dom 对象
// const chartRef = ref();
// 渲染函数
const renderChart = () => {
    if (chart) {
        typeof chart.dispose === 'function' && chart.dispose();
        chart = null;
    }
    // chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
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
            selectedMode: false,
            show: props.showLegend,
            // top: 12 * props.scale,
            // right: 24 * props.scale,
            itemHeight: 16 * props.scale,
            itemWidth: 16 * props.scale,
            itemGap: 12 * props.scale,
            data: props.legendData.map((name, index) => {
                const color = props.color[index % props.color.length];
                return {
                    name,
                    icon: legendIconMap[props.seriesData[index].type || 'bar'],
                    itemStyle: {
                        color,
                        borderWidth: 0
                    }
                };
            }),
            textStyle: {
                color: `rgba(${0x32}, ${0x32}, ${0x33}, 1)`,
                fontSize: 12 * props.scale,
                fontFamily: 'PingFangSC-Regular',
                height: 18,
                lineHeight: 18,
                verticalAlign: 'middle'
            }
        },
        grid: (() => {
            const grid = { top: 65, right: 12, bottom: 34, left: 40 };
            for (const k in grid) {
                props.grid[k] !== undefined && (grid[k] = props.grid[k]);
                grid[k] = grid[k] * props.scale;
            }
            return grid;
        })(),
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    type: props.axisLineType,
                    color: props.axisLineColor
                }
            },
            confine: props.tooltipConfine,
            formatter: (params) => {
                const templateStr = params.map(item => {
                    let dot;
                    const seriesIndex = item.seriesIndex;
                    const color = props.color[seriesIndex % props.color.length];
                    const unit = props.unit instanceof Array ? props.unit[seriesIndex % props.unit.length] : props.unit;
                    if (props.seriesData[item.seriesIndex]?.type === 'line') {
                        dot = `<i style="width: ${ 10 * props.scale }px; height: ${ 2 * props.scale }px; background-color: ${ color };"></i>`;
                    } else {
                        dot = `<i style="width: ${ 8 * props.scale }px; height: ${ 8 * props.scale }px; background-color: ${ color };"></i>`;
                    }
                    return `
                        <div style="display: grid; grid-template-columns: ${8 * props.scale}px auto min-content; grid-template-rows: ${24 * props.scale}px auto min-content; grid-column-gap: ${8 * props.scale}px; align-items: center;">
                            ${ dot }
                            <span style="opacity: 0.7; font-family: MicrosoftYaHei; font-size: ${14 * props.scale}px; color: #3B4155;">${props.legendData[seriesIndex % props.legendData.length]}</span>
                            <span style="font-family: DINCondensed-Bold; font-size: ${16 * props.scale}px; color: #3B4155; font-weight: 600; white-space: nowrap;">
                                ${item.value}
                                <i style="font-weight: 400; font-size: ${12 * props.scale}px; font-style: normal;">${unit || ''}</i>
                            </span>
                        </div>
                    `;
                }).join('');
                return `
                    <h4 style="opacity: 0.7; font-family: MicrosoftYaHei; font-size: ${14 * props.scale}px; color: #3B4155; line-height: ${24 * props.scale}px;">${params[0].axisValue}</h4>
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
                length: 3 * props.scale,
                alignWithLabel: true,
                lineStyle: {
                    color: '#E5E7EA'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#E5E7EA'
                }
            },
            axisLabel: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: 12 * props.scale,
                color: `rgba(${0x96}, ${0x97}, ${0x99}, 1)`,
                // lineHeight: 18 * props.scale,
                // height: 18 * props.scale,
                // margin: 6 * props.scale,
                margin: 12 * props.scale
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
                alignTicks: props.alignTicks,
                nameTextStyle: {
                    align: index === 0 ? 'left' : 'right',
                    padding: index === 0
                        ? [0, 0, 0, -36].map(n => n * props.scale)
                        : [0, -30, 0, 0].map(n => n * props.scale),
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: 12 * props.scale,
                    color: `rgba(${0x96}, ${0x97}, ${0x99}, 1)`,
                    lineHeight: 18 * props.scale
                },
                max: value => {
                    const valueArr = props.markLine.filter(i => i.yAxisIndex == index).map(i => i.value);
                    const maxV = Math.max(...[valueArr]);
                    if (value.max < maxV) {
                        return maxV;
                    }
                },
                splitNumber: 4,
                axisTick: { show: false },
                axisLabel: {
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: 12 * props.scale,
                    color: `rgba(${0x96}, ${0x97}, ${0x99}, 1)`,
                    margin: 4 * props.scale
                },
                splitLine: {
                    lineStyle: {
                        color: '#E5E7EA',
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
                data: seriesItem.data.map(originInputValue => {
                    const value = (typeof originInputValue === 'object' && originInputValue !== null) ? originInputValue.value : originInputValue;
                    return {
                        value,
                        originInputValue: originInputValue,
                        label: {
                            show: !!seriesItem.showLabel,
                            formatter: `{a|${value}}\n{b|}`,
                            distance: 4 * props.scale,
                            rich: {
                                a: {
                                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                    padding: [0, 6, 0, 6].map(n => n * props.scale),
                                    fontFamily: 'DINCondensed-Bold',
                                    fontSize: 14 * props.scale,
                                    color: '#323233',
                                    lineHeight: 28 * props.scale,
                                    height: 28 * props.scale,
                                    borderRadius: 4 * props.scale,
                                    shadowColor: 'rgba(0, 0, 0, .2)',
                                    shadowBlur: 12 * props.scale,
                                    align: 'center'
                                },
                                b: {
                                    align: 'center',
                                    width: 8 * props.scale,
                                    height: 4 * props.scale,
                                    backgroundColor: {
                                        // image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAYAAACXU8ZrAAAAAXNSR0IArs4c6QAAACxJREFUGFdj/P///38GAoARJI9PISMIwAzBphAmD1eEbiKyASiKYAqRFYDEANlzFAIJfsytAAAAAElFTkSuQmCC'
                                        image: (() => {
                                            const canvas = document.createElement('canvas');
                                            canvas.width = 8;
                                            canvas.height = 4;
                                            const ctx = canvas.getContext('2d');
                                            ctx.beginPath();
                                            ctx.moveTo(0, 0);
                                            ctx.lineTo(canvas.width, 0);
                                            ctx.lineTo(canvas.width / 2, canvas.height);
                                            ctx.closePath();
                                            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
                                            ctx.fill();
                                            return canvas.toDataURL();
                                        })()
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
                conf.barWidth = props.barWidth * props.scale;
                // conf.barGap = 8 / props.barWidth;
                conf.barGap = 4 / props.barWidth;
                const { r, g, b, a } = computeColorRGBA(color);
                conf.itemStyle = {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: `rgba(${ r }, ${ g }, ${ b }, 0.5)` },
                            { offset: 1, color: `rgba(${ r }, ${ g }, ${ b }, 1)` }
                        ]
                    },
                    borderRadius: [6, 6, 0, 0].map(n => n * props.scale)
                };
                conf.data.forEach(n => {
                    n.emphasis = {
                        itemStyle: { color: emphasisColor[seriesIndex % emphasisColor.length] }
                    };
                });
            }
            if (seriesItem.type === 'line') {
                conf.smooth = props.smooth;
                conf.symbol = 'circle';
                conf.symbolSize = 6 * props.scale;
                conf.itemStyle = { color: props.showLineSymbol ? color : 'transparent', borderColor: 'transparent', borderWidth: 1 * props.scale };
                conf.emphasis = {
                    disabled: true,
                    scale: 2,
                    itemStyle: {
                        color,
                        borderColor: 'white',
                        borderWidth: 2 * props.scale,
                        shadowColor: 'rgba(0, 0, 0, 0.4)',
                        shadowBlur: 4 * props.scale,
                        shadowOffsetY: 2 * props.scale
                    }
                }
                conf.lineStyle = { color };
                if (props.showLineArea) {
                    const { r, g, b, a } = computeColorRGBA(color);
                    conf.areaStyle = {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [
                                { offset: 0, color: `rgba(${ r }, ${ g }, ${ b }, ${ a * 0.35 })` },
                                { offset: 1, color: `rgba(${ r }, ${ g }, ${ b }, ${ a * 0 })` },
                            ]
                        }
                    };
                }
            }
            const markLines = props.markLine.filter(n => (n.yAxisIndex || 0) === conf.yAxisIndex);
            if (markLines.length) {
                conf.markLine = {
                    symbol: 'none',
                    silent: true,
                    data: markLines.map(n => {
                        const { r, g, b, a } = computeColorRGBA(n.color);
                        return {
                            yAxis: n.value,
                            lineStyle: {
                                width: 1 * props.scale,
                                color: n.color,
                                type: n.type
                            },
                            label: {
                                show: true,
                                align: 'right',
                                distance: 0,
                                color: '#323233',
                                fontSize: 12 * props.scale,
                                fontFamily: 'PingFangSC-Regular',
                                borderWidth: 1 * props.scale,
                                borderColor: n.color,
                                borderRadius: 2 * props.scale,
                                backgroundColor: `rgba(${ 255 - (255 - r) * 0.15 }, ${ 255 - (255 - g) * 0.15 }, ${ 255 - (255 - b) * 0.15 }, ${ 1 })`,
                                lineHeight: 18 * props.scale,
                                fontWeight: 400,
                                padding: [0, 4].map(n => n * props.scale),
                                offset: [-12, 0].map(n => n * props.scale),
                                formatter: param => `{value|${param.value}}`,
                                rich: {
                                    value: { fontSize: 14 * props.scale }
                                }
                            }
                        };
                    })
                };
            }
            return conf;
        })
    }
    let start = 0;
    let end = props.showCount / props.xAxisData.length * 100;
    if (props.showCount) {
        if (props.dataZoomType === 'slider') {
            if (props.dataZoomStartAtEnd) {
                start = 100 - end;
                end = 100;
            }
            option.dataZoom = [
                {
                    type: 'slider',
                    zoomLock: props.zoomLock,
                    brushSelect : false,
                    handleIcon: 'none',
                    borderColor: 'transparent',
                    dataBackground: {
                        lineStyle: {
                            color: 'transparent'
                        },
                        areaStyle: {
                            color: 'transparent'
                        }
                    },
                    selectedDataBackground: {
                        lineStyle: {
                            color: 'transparent'
                        },
                        areaStyle: {
                            color: 'transparent'
                        }
                    },
                    height: 4 * props.scale,
                    fillerColor: '#E5E7EA',
                    labelFormatter: '',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    start,
                    end,
                    handleStyle: {
                        color: 'red'
                    },
                    bottom: props.dataZoomBottom
                }
            ];
        } else {
            option.dataZoom = [
                { type: 'inside', start, end, zoomLock: props.zoomLock }
            ];
        }
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
    return chart;
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>
