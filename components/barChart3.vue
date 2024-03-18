<template>
    <div class="zrx-chart" ref="chartRef"></div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
import { setMaxVal } from '../utils/index.js';
// 图表实例
let chart;
// 图表 dom 对象
const chartRef = ref();
// 可配置属性
const props = defineProps({
    // x 轴坐标
    yAxisData: {
        type: [Array],
        // default: () => [
        //     ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
        //     ['农', '工', '建', '批', '交', '住', '金', '房', '其']
        // ]
        default: () => [ [], [] ]
    },
    // 数据数组
    seriesData: {
        type: [Array],
        // default: () => [
        //     [54, 89, 86, 65, 54, 53, 72, 65, 60],
        //     [95, 97, 75, 72, 90, 88, 54, 77, 98]
        // ]
        default: () => []
    },
    // 上下左右边距
    grid: {
        type: [Object],
        default: () => ({
            top: 84,
            right: 58,
            bottom: 56,
            left: 106
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
        // default: () => ['统计金额', '开票金额']
        default: () => []
    },
    // y轴单位
    // xAxisName: {
    //     type: [String],
    //     default: () => ''
    // },
    // 最多显示的数量（实际显示数量会根据输入值调整）
    showCount: {
        type: [Number],
        default: () => 4
    },
    // 何种方式拖动 inside 内容区域拖动，slider 滑块拖动
    dataZoomType: {
        type: [String],
        // default: () => 'inside'
        default: () => 'slider'
    },
    // 当 dataZoomType 为 slider 时，拖动区域距离右侧的距离
    dataZoomRight: {
        type: [Number],
        default: () => 0
    },
    // 是否显示 legend
    showLegend: {
        type: [Boolean],
        default: () => true
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
    // legend 颜色
    // legendColors: {
    //     type: [Array],
    //     default: () => ['#2E9DFF', '#D0F1FF']
    // },
    // tooltipColors: {
    //     type: [Array],
    //     default: () => ['#2E9DFF', '#D0F1FF']
    // },
    // legend 图表，支持字符串或数组
    legendIcon: {
        type: [String, Array],
        default: () => ['rect']
    },
    // 图表项颜色
    color: {
        type: [String, Array],
        default: () => ['blue', 'grey']
    },
    // tooltip 标题
    tooltipTitle: {
        type: [Array],
        default: () => null
    },
    // 高亮区域的索引
    yAxisHighlightArea: {
        type: [Array],
        default: () => []
    },
    // 高亮区域颜色
    highlightAreaColor: {
        type: [String],
        default: () => 'rgba(14, 143, 255, 0.2)'
    },
    // 数据的单位
    unit: {
        type: [String],
        default: () => ''
    },
    // 柱子的宽度
    barWidth: {
        type: [Number],
        default: () => 24
    },
    // 是否显示辅助刻度线
    showSplitLine: {
        type: [Boolean],
        default: () => true
    },
    // 是否显示每一项的背景色
    showItemBackground: {
        type: [Boolean],
        default: () => true
    },
    // 每一项的背景色
    itemBackgroundColor: {
        type: [String],
        default: () => `rgba(${ 0xff }, ${ 0xff }, ${ 0xff }, 0.12)`
        // default: () => `rgba(${ 0x1d }, ${ 0x3f }, ${ 0x65 }, 1)`
    },
    // 是否显示柱子对应的数值
    showSeriesLabel: {
        type: [Boolean],
        default: () => true
    },
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
    // },
    // 图表缩放比例
    scale: {
        type: [Number],
        // default: () => window.innerHeight / 1080;
        default: () => 1
    }
});
// legend 图标映射
const legendIconMap = {
    linerect: 'path://M0,7L8,7L8,0L24,0L24,7L32,7L32,9L22,9L22,2L10,2L10,9L0,9ZM8,9L8,16L24,16L24,9L22,9L22,14L10,14L10,9Z',
    rect: 'path://M4,4L12,4L12,12L4,12ZM0,0L16,16M16,0L0,16'
};
// 默认颜色映射
const colorMap = {
    blue: {
        barArea: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
                { offset: 0, color: '#3EB1FF' },
                { offset: 1, color: '#1260C4' }
            ]
        },
        legend: '#2e9dff',
        tooltip: '#2e9dff'
    },
    grey: {
        barArea: {
            type: 'linear',
            x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
                { offset: 0, color: '#D0F1FF' },
                { offset: 1, color: '#89B9EF' }
            ]
        },
        legend: '#d0f1ff',
        tooltip: '#d0f1ff'
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
            // 默认间距
            const grid = { top: 84, right: 58, bottom: 56, left: 106 };
            // 根据输入值更新间距
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
                lineStyle: { color: '#677b87', width: 2 * props.scale }
            },
            formatter: params => {
                let tooltipTitle;
                if (props.tooltipTitle instanceof Array) {
                    tooltipTitle = props.tooltipTitle[params[0]?.dataIndex];
                }
                !tooltipTitle && (tooltipTitle = params[0]?.axisValue);
                return `
                    <div style="background-color: #125176; padding: ${ 16 * props.scale }px; border-radius: 0; border: ${ 2 * props.scale }px solid rgba(102, 255, 255, 0.2);">
                        <h4 style="font-family: MicrosoftYaHei; font-size: ${ 28 * props.scale }px; color: #FFFFFF; font-weight: 400;">${ tooltipTitle }</h4>
                        <div style="display: grid; grid-auto-rows: ${ 37 * props.scale }px; grid-row-gap: ${ 8 * props.scale }px; grid-template-columns: ${ 18 * props.scale }px ${ 8 * props.scale }px min-content ${ 12 * props.scale }px min-content; grid-column-gap: ${ 4 * props.scale }px ${ 12 * props.scale }px; align-items: center; margin-top: ${ 8 * props.scale }px;">
                            ${
                                params.map(n => {
                                    const seriesIndex = n.seriesIndex / 2;
                                    const colorName = props.color[seriesIndex % props.color.length];
                                    const color = colorMap[colorName]?.tooltip;
                                    if (n.data instanceof Object && n.data?.isGap) {
                                        return '';
                                    }
                                    return `
                                        <i style="background-color: ${ color }; height: ${ 18 * props.scale }px;"></i>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 28 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3;">${ n.seriesName }</label>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 28 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5;">${ [null, undefined, '', NaN].includes(n.value) ? '- -' : n.value }${ props.unit || '' }</label>
                                    `
                                }).join('')
                            }
                        </div>
                    </div>
                `
            }
        },
        xAxis: {
            type: 'value',
            min: v => v.min <= 0 ? -setMaxVal(Math.max(Math.abs(v.max), Math.abs(v.min)) * ( props.showSeriesLabel ? 1.31 : 1))  : 0,
            max: v => v.max >= 0 ? setMaxVal(Math.max(Math.abs(v.max), Math.abs(v.min)) * ( props.showSeriesLabel ? 1.31 : 1))  : 0,
            position: 'top',
            nameTextStyle: {
                fontSize: 14 * props.scale,
                color: '#ccd4da',
                padding: [0, 40, -2, 0].map(n => n * props.scale)
            },
            splitNumber: 6,
            splitLine: {
                show: props.showSplitLine,
                lineStyle: {
                    color: '#4f6878',
                    type: 'dashed'
                }
            },
            axisLabel: {
                fontSize: 20 * props.scale,
                color: 'rgba(255, 255, 255, 0.8)'
            }
        },
        yAxis: props.yAxisData.map((yAxis, index) => {
            return {
                type: 'category',
                inverse: true,
                data: yAxis,
                axisTick: { show: false },
                axisLine: {
                    show: index === 0,
                    lineStyle: {
                    	width: 2,
                    	color: 'rgba(46, 157, 255, 1)'
                    }
                },
                axisLabel: {
                    fontSize: 20 * props.scale,
                    color: '#ccd2d7',
                    lineHeight: 20 * props.scale,
                    verticalAlign: 'middle',
                    borderWidth: 1
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: yAxis.map((n, i) => props.yAxisHighlightArea.includes(i) ? props.highlightAreaColor : 'transparent')
                    }
                },
                nameGap: 0
            }
        }),
        series: (() => {
            const series = props.seriesData.map((seriesItem, seriesIndex) => {
                const colorName = props.color[seriesIndex % props.color.length];
                return {
                    data: seriesItem.map(value => {
                        const barAreaColor = { ...colorMap[colorName]?.barArea };
                        const { x, x2 } = barAreaColor;
                        if (value < 0) {
                            barAreaColor.x = x2;
                            barAreaColor.x2 = x;
                        }
                        return {
                            value,
                            itemStyle: { color: barAreaColor }
                        }
                    }),
                    name: props.legendData[seriesIndex % props.legendData.length],
                    type: 'bar',
                    // barGap: `${10 / props.barWidth * 100}%`,
                    // barGap: `${9 / props.barWidth * 100}%`,
                    barGap: `0%`,
                    barWidth: props.barWidth * props.scale,
                    showBackground: props.showItemBackground,
                    // showBackground: false,
                    label: {
                        show: props.showSeriesLabel,
                        position: 'outside',
                        textStyle: {
                            fontSize: 20 * props.scale,
                            color: 'white',
                            fontFamily: 'MicrosoftYaHei',
                            fontWeight: 400
                        }
                    },
                    backgroundStyle: { color: props.itemBackgroundColor }
                }
            });
            const result = [series.shift()];
            while (series.length) {
                result.push({
                    type: 'bar',
                    data: new Array(props.yAxisData[0]?.length).fill({
                        value: 0,
                        isGap: true
                    }),
                    barWidth: 9 * props.scale,
                    itemStyle: { color: 'red' },
                    showBackground: props.showItemBackground,
                    backgroundStyle: {
                        color: props.itemBackgroundColor
                    }
                });
                result.push(series.shift());
            }
            return result;
            // showItemBackground
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
                top: 20 * props.scale,
                textStyle: {
                    fontSize: 20 * props.scale,
                    color: 'white'
                },
                itemGap: 20 * props.scale,
                itemWidth: 36 * props.scale,
                itemHeight: 36 * props.scale
            }
            return legendConfig;
        })()
    };
    if (props.showCount) {
        const start = 0;
        const end = props.showCount / props.yAxisData[0].length * 100;
        if (props.dataZoomType === 'slider') {
            option.dataZoom = [
                {
                    type: 'slider',
                    yAxisIndex: props.yAxisData.map((n, i) => i),
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
                    width: 8,
                    // fillerColor: '#467C9F',
                    fillerColor: 'rgb(70, 124, 159)',
                    labelFormatter: '',
                    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(63, 96, 137, 1)',
                    borderWidth: 0,
                    start,
                    end,
                    handleStyle: {
                        color: 'red'
                    },
                    right: props.dataZoomRight
                }
            ];
        } else {
            option.dataZoom = [
                {
                    type: 'inside',
                    yAxisIndex: props.yAxisData.map((n, i) => i),
                    start,
                    end
                }
            ];
        }
    }
    // if (props.showCount) {
    //     const start = 0;
    //     const end = props.showCount / Math.max(...props.yAxisData.map(n => n.length)) * 100;
    //     option.dataZoom = [
    //         { type: 'inside', start, end, yAxisIndex: 0 },
    //         { type: 'inside', start, end, yAxisIndex: 1 }
    //     ];
    // }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>
