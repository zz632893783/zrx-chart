<template>
    <div class="zrx-chart" ref="chartRef"></div>
</template>
<script setup>
import { ref } from 'vue'
import * as echarts from 'echarts'
// 图表实例
let chart;
// 图表 dom 对象
const chartRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description x 轴坐标
     * @example ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月']
     */
    xAxisData: {
        type: [Array],
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
            right: 50,
            bottom: 33,
            left: 56
        })
    },
    /**
     * @description 数据数组
     * @example [
     *     {
     *         // 需要指定类型
     *         type: 'bar',
     *         // 需要指定 y 轴索引
     *         yAxisIndex: 0,
     *         data: [163, 129, 123, 198, 152, 152, 178, 133]
     *     },
     *     {
     *         type: 'bar',
     *         yAxisIndex: 0,
     *         data: [102, 126, 120, 136, 160, 198, 128, 141]
     *     },
     *     {
     *         type: 'bar',
     *         yAxisIndex: 0,
     *         data: [182, 108, 114, 149, 188, 178, 122, 160]
     *     },
     *     {
     *         type: 'bar',
     *         yAxisIndex: 0,
     *         data: [187, 119, 141, 131, 139, 195, 113, 101]
     *     },
     *     {
     *         type: 'line',
     *         yAxisIndex: 1,
     *         data: [81, 17, 30, 94, 45, 54, 60, 69]
     *     },
     *     {
     *         type: 'line',
     *         yAxisIndex: 1,
     *         data: [36, 17, 43, 86, 23, 77, 66, 60]
     *     },
     *     {
     *         type: 'line',
     *         yAxisIndex: 1,
     *         data: [19, 97, 96, 21, 57, 71, 5, 65]
     *     },
     *     {
     *         type: 'line',
     *         yAxisIndex: 1,
     *         data: [46, 51, 35, 23, 78, 29, 79, 37]
     *     }
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 图表项颜色
     * @example ['blue', 'green', 'celeste', 'grey']
     */
    color: {
        type: [Array],
        default: () => ['blue', 'green', 'celeste', 'grey']
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
     * @description 最多显示的数量（实际显示数量会根据输入值调整）
     * @example 3
     */
    showCount: {
        type: [Number],
        default: () => 5
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
     * @description 是否显示 legend
     * @example false
     */
    showLegend: {
        type: [Boolean],
        default: () => true
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
     * @description tooltip 标题
     * @example ['标题A']
     */
    tooltipTitle: {
        type: [Array],
        default: () => null
    },
    /**
     * @description 高亮区域的索引
     * @example [2, 4]
     */
    xAxisHighlightArea: {
        type: [Array],
        default: () => []
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
// legend 图标映射
const legendIconMap = {
    // line: 'path://M0,15L8,15L8,8L24,8L24,15L32,15L32,17L22,17L22,10L10,10L10,17L0,17ZM8,17L8,24L24,24L24,17L22,17L22,22L10,22L10,17Z',
    // line: 'path://M0,15L32,15L32,17L0,17Z',
    line: 'path://M8,16A8,8,180,1,1,24,16A8,8,-180,1,1,8,16ZM0,15L32,15L32,17L0,17Z',
    bar: 'path://M8,8L24,8L24,24L8,24ZM0,0L32,32M32,0L0,32'
};
// 默认颜色映射
const colorMap = {
    blue: {
        legend: '#2e9dff',
        barArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#1260C4' },
                { offset: 1, color: '#3db0fe' }
            ]
        },
        line: '#2e9dff',
        tooltip: '#2e9dff'
    },
    green: {
        legend: '#00ff81',
        barArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#13BE68' },
                { offset: 1, color: '#62FFC5' }
            ]
        },
        line: '#00ff81',
        tooltip: '#00ff81'
    },
    celeste: {
        legend: '#66ffff',
        barArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#2BDEDE' },
                { offset: 1, color: '#9FFAFA' }
            ]
        },
        line: '#66ffff',
        tooltip: '#66ffff'
    },
    grey: {
        legend: '#d0f1ff',
        barArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#89B9EF' },
                { offset: 1, color: '#D0F1FF' }
            ]
        },
        line: '#d0f1ff',
        tooltip: '#d0f1ff'
    },
    yellow: {
        legend: '#f4dc3c',
        barArea: '#f4dc3c',
        tooltip: '#f4dc3c',
        line: '#f4dc3c'
    },
    violet: {
        legend: '#756fd6',
        barArea: '#756fd6',
        tooltip: '#756fd6',
        line: '#756fd6'
    },
    pink: {
        legend: '#d78796',
        barArea: '#d78796',
        tooltip: '#d78796',
        line: '#d78796'
    }
};
// 渲染函数
const renderChart = () => {
    if (chart) {
        chart.dispose();
        chart = null;
    }
    chart = echarts.init(chartRef.value);
    const option = {
        grid: (() => {
            const grid = { top: 60, right: 50, bottom: 33, left: 56 };
            for (const k in grid) {
                props.grid[k] !== undefined && (grid[k] = props.grid[k]);
                grid[k] = grid[k] * props.scale;
            }
            return grid;
        })(),
        tooltip: {
            trigger: 'axis',
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
            // tooltipTitle
            formatter: params => {
                // const tooltipTitle = !props.tooltipTitle ? params[0].axisValue : props.tooltipTitle[params[0].dataIndex % props.tooltipTitle.length];
                let tooltipTitle;
                if (props.tooltipTitle instanceof Array) {
                    tooltipTitle = props.tooltipTitle[params[0]?.dataIndex];
                }
                !tooltipTitle && (tooltipTitle = params[0]?.axisValue);
                return `
                    <div style="background-color: #125176; padding: ${ 8 * props.scale }px; border-radius: 0; border: ${ 1 * props.scale }px solid rgba(102, 255, 255, 0.2);">
                        <h4 style="font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400;">${ tooltipTitle }</h4>
                        <div style="display: grid; grid-auto-rows: ${ 19 * props.scale }px; grid-row-gap: ${ 4 * props.scale }px; grid-template-columns: ${ 16 * props.scale }px ${ 8 * props.scale }px min-content ${ 12 * props.scale }px min-content; grid-column-gap: ${ 2 * props.scale }px ${ 12 * props.scale }px; align-items: center; margin-top: ${ 8 * props.scale }px;">
                            ${
                                params.slice(0, params.length - 1).map(n => {
                                    const colorName = props.color[n.seriesIndex % props.color.length];
                                    const color = colorMap[colorName]?.tooltip || colorName;
                                    const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName
                                    const yAxisIndex = props.seriesData[n.seriesIndex]?.yAxisIndex || 0;
                                    const unit = yAxisName[yAxisIndex % yAxisName.length] || '';
                                    const svgPath = legendIconMap[n.seriesType || 'bar'].replace('path://', '').replace(/(?<!(a|A)(-?\d+(\.\d+)?,){3,4})-?\d+(\.\d+)?/g, s => s * props.scale);
                                    return `
                                        <i style="height: ${ 16 * props.scale }px; position: relative; overflow: hidden;">
                                            <svg viewbox="0 0 ${ 32 * props.scale } ${ 32 * props.scale }" width="${ 16 * props.scale }" height="${ 16 * props.scale }" style="filter: drop-shadow(${ 16 * props.scale }px 0 0 ${ color }); margin-left: ${ -16 * props.scale }px; position: absolute; top: 0; left: 0;">
                                                <path d="${ svgPath }"></path>
                                            </svg>
                                        </i>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3;">${ n.seriesName }</label>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5;">${ [null, undefined, '', NaN].includes(n.value) ? '- -' : n.value }${ unit }</label>
                                    `
                                }).join('')
                            }
                        </div>
                    </div>
                `
            }
        },
        xAxis: [
            {
                type: 'category',
                data: props.xAxisData,
                axisTick: { show: false },
                axisLine: {
                    lineStyle: { color: '#677b87' }
                },
                axisLabel: {
                    fontSize: 14 * props.scale,
                    color: '#ccd2d7'
                },
                nameGap: 0,
                // splitArea: {
                //     show: true,
                //     areaStyle: {
                //         color: props.xAxisData.map((n, i) => props.xAxisHighlightArea.includes(i) ? 'rgba(14, 143, 255, 0.2)' : 'transparent')
                //     }
                // }
            },
            {
                type: 'category',
                data: props.xAxisData.map((n, i) => ''),
                axisTick: { show: false },
                axisLine: { show: false },
                axisLabel: { show: false }
            }
        ],
        yAxis: [
            ...(typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName).map((name, index) => {
                return {
                    type: 'value',
                    alignTicks: props.yAxisName instanceof Array && props.yAxisName.length > 1,
                    name,
                    nameTextStyle: {
                        fontSize: 13 * props.scale,
                        color: '#ccd4da',
                        padding: [[0, 40, -2, 0], [0, 0, 0, 42]][index].map(n => n * props.scale)
                    },
                    splitNumber: 3,
                    splitLine: {
                        lineStyle: {
                            color: '#4f6878',
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        fontSize: 13 * props.scale,
                        color: '#ccd3d8',
                        margin: 10 * props.scale
                    }
                }
            }),
            {
                type: 'value',
                alignTicks: true,
                max: 1,
                min: 0,
                axisLabel: { show: false },
                splitLine: { show: false }
            }
        ],
        series: (() => {
            const series = props.seriesData.map((seriesItem, seriesIndex) => {
                const colorName = props.color[seriesIndex % props.color.length];
                const type = seriesItem.type || 'bar'
                const seriesOption = {
                    type,
                    name: props.legendData[seriesIndex % props.legendData.length],
                    data: seriesItem.data || [],
                    yAxisIndex: seriesItem.yAxisIndex || 0,
                    itemStyle: {
                        color: colorMap[colorName]?.barArea ||  colorName
                    }
                }
                if (seriesOption.type === 'bar') {
                    seriesOption.barWidth = 8 * props.scale;
                    seriesOption.barGap = `${4 / 8 * 100}%`;
                }
                if (seriesOption.type === 'line') {
                    seriesOption.symbol = 'circle';
                    seriesOption.symbolSize = 4 * props.scale;
                    seriesOption.itemStyle = {
                        color: colorMap[colorName]?.line || colorName
                    };
                    seriesOption.lineStyle = {
                        // color: props.itemColors[seriesIndex % props.itemColors.length],
                        color: colorMap[colorName]?.line || colorName,
                        width: 1 * props.scale,
                        type: seriesItem.lineType || 'solid'
                    };
                    seriesOption.label = {
                        show: false,
                        fontFamily: 'DINAlternate-Bold',
                        fontSize: 16 * props.scale,
                        // color: props.itemColors[seriesIndex % props.itemColors.length] || '#F4DC3C',
                        color: colorMap[colorName]?.line,
                        textShadowBlur: 4 * props.scale,
                        textShadowOffsetX: 0,
                        textShadowOffsetY: 2 * props.scale,
                        textShadowColor: 'rgba(0, 0, 0, 0.50)',
                        formatter: v => `${ v.value } ${ props.yAxisName[v.seriesIndex % props.yAxisName.length] }`
                    }
                }
                return seriesOption
            });
            series.push({
                type: 'bar',
                barWidth: '100%',
                barGap: 0,
                yAxisIndex: (typeof props.yAxisName === 'string' || (props.yAxisName instanceof Array && props.yAxisName.length === 1)) ? 1 : 2,
                xAxisIndex: 1,
                showBackground: false,
                label: { show: false },
                data: props.xAxisData.map((n, i) => ({
                    value: 1,
                    itemStyle: {
                        color: props.xAxisHighlightArea.includes(i) ? 'rgba(14, 143, 255, 0.2)' : 'transparent'
                    }
                })),
                animation: false
            });
            return series;
        })(),
        legend: (() => {
            const legendConfig = {
                show: props.showLegend,
                data: props.legendData.map((name, index) => {
                    const colorName = props.color[index % props.color.length];
                    const icon = legendIconMap[props.seriesData[index % props.seriesData.length]?.type || 'bar'];
                    return {
                        name,
                        icon,
                        itemStyle: {
                            color: colorMap[colorName]?.legend ||  colorName
                        }
                    }
                }),
                top: 20 * props.scale,
                textStyle: {
                    fontSize: 16 * props.scale,
                    color: 'white'
                },
                itemGap: 20 * props.scale,
                itemWidth: 16 * props.scale,
                itemHeight: 16 * props.scale
            }
            return legendConfig;
        })()
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
                    height: 8,
                    fillerColor: '#467C9F',
                    labelFormatter: '',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
                { type: 'inside', start, end }
            ];
        }
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>