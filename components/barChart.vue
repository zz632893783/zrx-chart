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
        default: () => ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业']
    },
    // 数据数组
    seriesData: {
        type: [Array],
        default: () => [
            [54, 89, 86, 65, 54, 53, 72, 65, 60],
            [95, 97, 75, 72, 90, 88, 54, 77, 98]
        ]
    },
    // 上下左右边距
    grid: {
        type: [Object],
        default: () => ({
            top: 84,
            right: 18,
            bottom: 56,
            left: 56
        })
    },
    // 每一项颜色
    // itemColors: {
    //     type: [Array],
    //     default: () => [
    //         {
    //             type: 'linear',
    //             x: 0, y: 0, x2: 0, y2: 1,
    //             colorStops: [
    //                 { offset: 0, color: '#1260c4' },
    //                 { offset: 1, color: '#3db0fe' }
    //             ]
    //         },
    //         {
    //             type: 'linear',
    //             x: 0, y: 0, x2: 0, y2: 1,
    //             colorStops: [
    //                 { offset: 0, color: '#89baef' },
    //                 { offset: 1, color: '#d0f1ff' }
    //             ]
    //         }
    //     ]
    // },
    // legend 数据
    legendData: {
        type: [Array],
        default: () => ['统计金额', '开票金额']
    },
    // y轴单位
    yAxisName: {
        type: [String],
        default: () => ''
    },
    // 最多显示的数量（实际显示数量会根据输入值调整）
    showCount: {
        type: [Number],
        default: () => 7
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
    tooltipFormatter: {
        type: [Function, String],
        default: () => ''
    },
    beforeSetOption: {
        type: [Function],
        default: () => null
    },
    afterSetOption: {
        type: [Function],
        default: () => null
    },
    // legend 颜色
    // legendColors: {
    //     type: [Array],
    //     default: () => ['#2E9DFF', '#D0F1FF']
    // },
    // tooltipColors: {
    //     type: [Array],
    //     default: () => ['#2E9DFF', '#D0F1FF']
    // },
    legendIcon: {
        type: [String, Array],
        default: () => ['rect']
    },
    color: {
        type: [String, Array],
        default: () => ['blue', 'grey']
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
    // visualMap: {
    //     type: [Array],
    //     // default: () => null
    //     default: () => [
    //         {
    //             seriesIndex: 0,
    //             start: 1,
    //             end: 2
    //         }
    //     ]
    // }
});

const legendIconMap = {
    linerect: 'path://M0,7L8,7L8,0L24,0L24,7L32,7L32,9L22,9L22,2L10,2L10,9L0,9ZM8,9L8,16L24,16L24,9L22,9L22,14L10,14L10,9Z',
    rect: 'path://M4,4L12,4L12,12L4,12ZM0,0L16,16M16,0L0,16'
};

const colorMap = {
    blue: {
        barArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#1260c4' },
                { offset: 1, color: '#3db0fe' }
            ]
        },
        legend: '#2e9dff',
        tooltip: '#2e9dff'
    },
    grey: {
        barArea: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
                { offset: 0, color: '#89baef' },
                { offset: 1, color: '#d0f1ff' }
            ]
        },
        legend: '#d0f1ff',
        tooltip: '#d0f1ff'
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
            // 默认间距
            const grid = { top: 84, right: 18, bottom: 56, left: 56 };
            // 根据输入值更新间距
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
                lineStyle: { color: '#677b87' }
            },
            // tooltipTitle
            formatter: params => {
                let tooltipTitle;
                if (props.tooltipTitle instanceof Array) {
                    tooltipTitle = props.tooltipTitle[params[0]?.dataIndex];
                }
                !tooltipTitle && (tooltipTitle = params[0]?.axisValue);
                return `
                    <div style="background-color: #125176; padding: ${ 8 * scale }px; border-radius: 0; border: ${ 1 * scale }px solid rgba(102, 255, 255, 0.2);">
                        <h4 style="font-family: MicrosoftYaHei; font-size: ${ 14 * scale }px; color: #FFFFFF; font-weight: 400;">${ tooltipTitle }</h4>
                        <div style="display: grid; grid-auto-rows: ${ 19 * scale }px; grid-row-gap: ${ 4 * scale }px; grid-template-columns: ${ 8 * scale }px ${ 8 * scale }px min-content ${ 12 * scale }px min-content; grid-column-gap: ${ 2 * scale }px ${ 12 * scale }px; align-items: center; margin-top: ${ 8 * scale }px;">
                            ${
                                params.slice(0, params.length - 1).map(n => {
                                    const colorName = props.color[n.seriesIndex % props.color.length];
                                    const color = colorMap[colorName]?.tooltip;
                                    return `
                                        <i style="background-color: ${ color }; height: ${ 8 * scale }px;"></i>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3;">${ n.seriesName }</label>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5;">${ [null, undefined, '', NaN].includes(n.value) ? '- -' : n.value } ${ props.yAxisName || '' }</label>
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
                    fontSize: 14 * scale,
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
                    name: props.yAxisName,
                    nameTextStyle: {
                        fontSize: 14 * scale,
                        color: '#ccd4da',
                        padding: [0, 40, -2, 0].map(n => n * scale)
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
                        color: '#ccd3d8'
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
                return {
                    data: seriesItem,
                    name: props.legendData[seriesIndex % props.legendData.length],
                    type: 'bar',
                    barGap: `${4 / 12 * 100}%`,
                    barWidth: 12 * scale,
                    itemStyle: {
                        // color: props.itemColors[seriesIndex % props.itemColors.length]
                        color: colorMap[colorName]?.barArea
                    },
                    backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' }
                }
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
                    // const colors = props.legendColors || props.itemColors;
                    const colorName = props.color[index % props.color.length];
                    const legendIcon = props.legendIcon instanceof Array ? props.legendIcon : [props.legendIcon];
                    const iconName = legendIcon[index % legendIcon.length];
                    return {
                        name,
                        icon: legendIconMap[iconName] || legendIconMap.rect,
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
    };
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
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};

defineExpose({
    renderChart,
    clearChart: () => chart?.clear()
});
</script>
<style lang="scss" scoped>
.chart {
}
</style>
