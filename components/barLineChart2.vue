<template>
    <div class="chart" ref="chartRef"></div>
</template>
<script setup>
import { ref } from 'vue'
import * as echarts from 'echarts'

let chart;
const chartRef = ref();
const props = defineProps({
    // x 轴坐标
    xAxisData: {
        type: [Array],
        default: () => ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月']
    },
    // 上下左右边距
    grid: {
        type: [Object],
        default: () => ({
            top: 109,
            right: 76,
            bottom: 38,
            left: 53
        })
    },
    // 数据数组
    seriesData: {
        type: [Array],
        default: () => [
            {
                // 需要指定类型
                type: 'bar',
                // 需要指定 y 轴索引
                yAxisIndex: 0,
                data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
            },
            {
                type: 'line',
                yAxisIndex: 1,
                data: [81, 17, 30, 94, 45, 54, 60, 1, 69]
            }
        ]
    },
    // 每一项颜色
    // itemColors: {
    //     type: [Array],
    //     default: () => [
    //         {
    //             type: 'linear',
    //             x: 0, y: 0, x2: 1, y2: 1,
    //             colorStops: [
    //                 { offset: 0, color: '#1260c4' },
    //                 { offset: 1, color: '#3db0fe' }
    //             ]
    //         },
    //         '#F4DC3C'
    //     ]
    // },
    // y轴单位
    yAxisName: {
        type: [String, Array],
        // default: () => ['亿元', '%']
        default: () => ['']
    },
    // 最多显示的数量（实际显示数量会根据输入值调整）
    showCount: {
        type: [Number],
        default: () => 5
    },
    dataZoomType: {
        type: [String],
        default: () => 'inside'
        // default: () => 'slider'
    },
    dataZoomBottom: {
        type: [Number],
        default: () => 0
    },
    showLegend: {
        type: [Boolean],
        default: () => true
    },
    // legend 颜色
    // legendColors: {
    //     type: [Array],
    //     default: () => ['#2E9DFF', '#F4DC3C']
    // },
    //  tooltip 颜色
    // tooltipColors: {
    //     type: [Array],
    //     default: () => null
    // },
    // legend 数据
    legendData: {
        type: [Array],
        // default: () => ['统计金额', '开票金额']
        default: () => []
    },
    // legendIcon: {
    //     type: [String, Array],
    //     default: () => ['linerect', 'rect']
    // },
    markLine: {
        type: [Array],
        default: () => []
        // default: () => [
        //     {
        //         value: 134,
        //         yAxisIndex: 0,
        //         color: '#33FFBB'
        //     },
        //     {
        //         value: 166,
        //         yAxisIndex: 0,
        //         color: '#F74768'
        //     }
        // ]
    },
    beforeSetOption: {
        type: [Function],
        default: () => null
    },
    afterSetOption: {
        type: [Function],
        default: () => null
    },
    color: {
        type: [Array],
        default: () => ['blue', 'yellow', 'grey']
    },
    showLineArea: {
        type: [Boolean],
        default: () => false
    },
    tooltipTitle: {
        type: [Array],
        default: () => null
    },
    xAxisHighlightArea: {
        type: [Array],
        default: () => []
    },
    dataZoomStartAtEnd: {
        type: [Boolean],
        default: () => true
    }
    // lineType: {
    //     type: [String],
    //     default: () => 'solid'
    // }
});

const legendIconMap = {
    // line: 'path://M0,15L8,15L8,8L24,8L24,15L32,15L32,17L22,17L22,10L10,10L10,17L0,17ZM8,17L8,24L24,24L24,17L22,17L22,22L10,22L10,17Z',
    line: 'path://M8,16A8,8,180,1,1,24,16A8,8,-180,1,1,8,16ZM0,15L32,15L32,17L0,17Z',
    bar: 'path://M8,8L24,8L24,24L8,24ZM0,0L32,32M32,0L0,32'
};

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
        lineArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: 'rgba(249, 159, 42, 0.5)' },
                { offset: 1, color: 'rgba(249, 159, 42, 0)' }
            ]
        },
        tooltip: '#2e9dff'
    },
    yellow: {
        legend: '#f4dc3c',
        barArea: '#f4dc3c',
        tooltip: '#f4dc3c',
        line: '#f4dc3c',
        lineArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: 'rgba(249, 159, 42, 0.5)' },
                { offset: 1, color: 'rgba(249, 159, 42, 0)' }
            ]
        }
    },
    grey: {
        legend: '#D0F1FF',
        barArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#89B9EF' },
                { offset: 1, color: '#D0F1FF' }
            ]
        },
        tooltip: '#D0F1FF',
        line: '#D0F1FF',
        lineArea: '#D0F1FF'
    },
    green: {
        legend: '#33FFBB',
        barArea: '33FFBB',
        tooltip: '#33FFBB',
        line: '#33FFBB',
        lineArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: 'rgba(51, 255, 187, 0.5)' },
                { offset: 1, color: 'rgba(51, 255, 187, 0)' }
            ]
        }
    }
};

const scale = window.innerHeight / 1080;

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
                grid[k] = grid[k] * scale;
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
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.6)',
                    type: 'solid'
                }
            },
            formatter: params => {
                let tooltipTitle;
                if (props.tooltipTitle instanceof Array) {
                    tooltipTitle = props.tooltipTitle[params[0]?.dataIndex];
                }
                !tooltipTitle && (tooltipTitle = params[0]?.axisValue);
                return `
                    <div style="background-color: #125176; padding: ${ 8 * scale }px; border-radius: 0; border: ${ 1 * scale }px solid rgba(102, 255, 255, 0.2);">
                        <h4 style="font-family: MicrosoftYaHei; font-size: ${ 14 * scale }px; color: #FFFFFF; font-weight: 400;">${ tooltipTitle }</h4>
                        <div style="display: grid; grid-auto-rows: ${ 19 * scale }px; grid-row-gap: ${ 4 * scale }px; grid-template-columns: ${ 16 * scale }px min-content min-content; grid-column-gap: ${ 2 * scale }px ${ 12 * scale }px; align-items: center; margin-top: ${ 8 * scale }px;">
                            ${
    params.slice(0, params.length - 1).map(n => {
        const colorName = props.color[n.seriesIndex % props.color.length];
        // const colors = props.tooltipColors || props.itemColors;
        // const color = colors[n.seriesIndex % colors.length];
        const color = colorMap[colorName]?.tooltip;
        const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName
        const yAxisIndex = props.seriesData[n.seriesIndex]?.yAxisIndex || 0;
        const unit = yAxisName[yAxisIndex % yAxisName.length] || '';
        const svgPath = legendIconMap[n.seriesType || 'bar'].replace('path://', '').replace(/(?<!(a|A)(-?\d+(\.\d+)?,){3,4})-?\d+(\.\d+)?/g, s => s * scale);
        return `
                                        <i style="height: ${ 16 * scale }px; position: relative; overflow: hidden;">
                                            <svg viewbox="0 0 ${ 32 * scale } ${ 32 * scale }" width="${ 16 * scale }" height="${ 16 * scale }" style="filter: drop-shadow(${ 16 * scale }px 0 0 ${ color }); margin-left: ${ -16 * scale }px; position: absolute; top: 0; left: 0;">
                                                <path d="${ svgPath }"></path>
                                            </svg>
                                        </i>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3; margin-left: ${ 6 * scale }px; display: ${ n.seriesName ? 'block' : 'none' };">${ n.seriesName }</label>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5; margin-left: ${ 6 * scale }px;">${ [null, undefined, '', NaN].includes(n.value) ? '- -' : n.value }${ unit }</label>
                                    `;
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
                    fontSize: 14 * scale,
                    color: '#ccd2d7'
                },
                nameGap: 0
                // splitArea: {
                //     show: true,
                //     interval: 0,
                //     areaStyle: {
                //         color: props.xAxisData.map((n, i) => props.xAxisHighlightArea.includes(i) ? 'rgba(14, 143, 255, 0.2)' : 'transparent')
                //     }
                // }
            },
            {
                type: 'category',
                data: props.xAxisData.map((n, i) => ''),
                axisTick: { show: false },
                // axisLine: { show: false },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    }
                },
                axisLabel: { show: false }
            }
        ],
        yAxis: [
            ...(typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName).map((name, index) => {
                return {
                    type: 'value',
                    alignTicks: props.yAxisName instanceof Array && props.yAxisName.length > 1,
                    name,
                    max: value => {
                        const valueArr = props.markLine.filter(i => i.yAxisIndex == index).map(i => i.value)
                        const maxV = Math.max(...[valueArr])
                        if (value.max < maxV) return maxV
                    },
                    nameTextStyle: {
                        fontSize: 14 * scale,
                        color: '#ccd4da',
                        padding: [[0, 40, -2, 0], [0, 0, 0, 42]][index].map(n => n * scale)
                    },
                    splitNumber: 3,
                    splitLine: {
                        lineStyle: {
                            color: '#4f6878',
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        fontSize: 14 * scale,
                        color: '#ccd3d8',
                        margin: 10 * scale
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
                const type = seriesItem.type || 'bar';
                const seriesOption = {
                    type,
                    name: props.legendData[seriesIndex % props.legendData.length] || '',
                    data: seriesItem.data || [],
                    yAxisIndex: seriesItem.yAxisIndex || 0
                    // markLine: {
                    //     symbol:'none',
                    //     data: [
                    //         {
                    //             yAxis: 134
                    //         }
                    //     ],
                    //     lineStyle: {
                    //         color: 'red'
                    //     },
                    //     label: {
                    //         show: false
                    //     }
                    // }
                };
                if (seriesOption.type === 'bar') {
                    seriesOption.barWidth = 36 * scale;
                    seriesOption.barGap = `${8 / 36 * 100}%`;
                    seriesOption.itemStyle = {
                        color: colorMap[colorName]?.barArea
                    };
                    seriesOption.label = {
                        show: true,
                        fontFamily: 'DINAlternate-Bold',
                        fontSize: 16 * scale,
                        color: 'white',
                        textShadowBlur: 4 * scale,
                        textShadowOffsetX: 0,
                        textShadowOffsetY: 2 * scale,
                        textShadowColor: 'rgba(0, 0, 0, 0.50)'
                    };
                    seriesOption.showBackground = true;
                    seriesOption.backgroundStyle = {
                        // color: '#2E9DFF'
                        color: `rgba(${0x2E}, ${0x9D}, ${0xFF}, 0.2)`
                    };
                }
                if (seriesOption.type === 'line') {
                    seriesOption.symbol = 'circle';
                    seriesOption.symbolSize = 8 * scale;
                    seriesOption.itemStyle = {
                        color: colorMap[colorName]?.line,
                        width: 1 * scale
                    };
                    seriesOption.lineStyle = {
                        // color: props.itemColors[seriesIndex % props.itemColors.length],
                        color: colorMap[colorName]?.line,
                        width: 1 * scale,
                        type: seriesItem.lineType || 'solid'
                    };
                    seriesOption.label = {
                        show: true,
                        fontFamily: 'DINAlternate-Bold',
                        fontSize: 16 * scale,
                        // color: props.itemColors[seriesIndex % props.itemColors.length] || '#F4DC3C',
                        color: colorMap[colorName]?.line,
                        textShadowBlur: 4 * scale,
                        textShadowOffsetX: 0,
                        textShadowOffsetY: 2 * scale,
                        textShadowColor: 'rgba(0, 0, 0, 0.50)',
                        // formatter: v => `${ v.value } ${ props.yAxisName[v.seriesIndex % props.yAxisName.length] }`
                        formatter: v => v.value
                    };
                    props.showLineArea && (seriesOption.areaStyle = {
                        origin: 'start',
                        color: colorMap[colorName]?.lineArea
                    });
                }
                const markLines = props.markLine.filter(n => (n.yAxisIndex || 0) === seriesOption.yAxisIndex);
                markLines.length && (seriesOption.markLine = {
                    symbol:'none',
                    silent: true,
                    data: markLines.map(n => ({
                        yAxis: n.value,
                        lineStyle: { color: n.color, type: n.type }
                    })),
                    label: {
                        show: false
                    }
                });
                // console.log(seriesOption)
                return seriesOption;
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
                    // const colors = props.legendColors || props.itemColors;
                    // const legendIcon = props.legendIcon instanceof Array ? props.legendIcon : [props.legendIcon];
                    // const iconName = legendIcon[index % legendIcon.length];
                    const icon = legendIconMap[props.seriesData[index % props.seriesData.length]?.type || 'line'];
                    return {
                        name,
                        icon,
                        itemStyle: {
                            // color: colors[index % colors.length]
                            color: colorMap[colorName]?.legend
                        }
                    }
                }),
                top: 20 * scale,
                textStyle: {
                    fontSize: 16 * scale,
                    color: 'white'
                },
                itemGap: 20 * scale,
                itemWidth: 16 * scale,
                itemHeight: 16 * scale
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

defineExpose({
    renderChart,
    clearChart: () => chart?.clear()
});
</script>
<style lang="scss" scoped></style>