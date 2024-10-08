<template>
    <!-- <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`"></div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
import { setMaxVal, computeColorRGBA } from '../utils/index.js';
// 以下这串字符串为特殊字符串，用于指定组件自动生成的 “属性.vue” 说明文件中，每列列宽
/* @attribute-template-columns: minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 3fr); */
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表实例
let chart;
// 图表 dom 对象
// const chartRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description y 轴坐标
     * @example [
     *     ['农业', '工业', '建筑', '批发', '交通', '住宿', '金融'],
     *     ['农', '工', '建', '批', '交', '住', '金']
     * ]
     */
    yAxisData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 数据数组
     * @example [
     *     [54, 89, 86, 65, 54, 53, 72, 65, 60],
     *     [95, 97, 75, 72, 90, 88, 54, 77, 98]
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 上下左右边距
     * @example { top: 84, right: 58, bottom: 56, left: 106 }
     */
    grid: {
        type: [Object],
        default: () => ({
            top: 84,
            right: 58,
            bottom: 56,
            left: 174
        })
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
     * @description 最多显示的数量（实际显示数量会根据输入值调整）
     * @example 4
     */
    showCount: {
        type: [Number],
        default: () => 4
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
     * @description 当 dataZoomType 为 slider 时，拖动区域距离右侧的距离
     * @example 12
     */
    dataZoomRight: {
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
     * @description legend 图表，支持字符串或数组
     * @example ['rect']
     */
    legendIcon: {
        type: [String, Array],
        default: () => ['rect']
    },
    /**
     * @description 图表项颜色
     * @example ['blue', 'grey']
     */
    color: {
        type: [Array],
        default: () => ['#0055FF', '#1FC49D']
    },
    /**
     * @description tooltip 标题
     * @example ['标题']
     */
    tooltipTitle: {
        type: [Array],
        default: () => null
    },
    /**
     * @description 高亮区域的索引
     * @example [2, 4]
     */
    yAxisHighlightArea: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 高亮区域颜色
     * @example 'rgba(255, 143, 255, 0.2)'
     */
    highlightAreaColor: {
        type: [String],
        default: () => 'rgba(14, 143, 255, 0.2)'
    },
    /**
     * @description 数据的单位
     * @example '元'
     */
    unit: {
        type: [String],
        default: () => ''
    },
    /**
     * @description 柱子的宽度
     * @example 12
     */
    barWidth: {
        type: [Number],
        default: () => 24
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
     * @description 是否显示每一项的背景色
     * @example false
     */
    showItemBackground: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 每一项的背景色
     * @example 'rgba(255, 0, 0, 0.12)'
     */
    itemBackgroundColor: {
        type: [String],
        default: () => 'rgba(0, 0, 0, 0.05)'
    },
    /**
     * @description 是否显示柱子对应的数值
     * @example false
     */
    showSeriesLabel: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 圆柱的圆角
     * @example [4, 4, 0, 0]
     */
    barBorderRadius: {
        type: [Number, Array],
        default: () => [0]
    },
    /**
     * @description 是否锁定选择区域的大小
     * @example true
     */
    zoomLock: {
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
     * @description 是否将 tooltip 框限制在图表的区域内
     * @example false
     */
    tooltipConfine: {
        type: [Boolean],
        default: () => true
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
    linerect: 'path://M0,7L8,7L8,0L24,0L24,7L32,7L32,9L22,9L22,2L10,2L10,9L0,9ZM8,9L8,16L24,16L24,9L22,9L22,14L10,14L10,9Z',
    rect: 'path://M4,4L12,4L12,12L4,12ZM0,0L16,16M16,0L0,16'
};
// 渲染函数
const renderChart = () => {
    if (chart) {
        chart.dispose();
        chart = null;
    }
    // chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
    const option = {
        grid: (() => {
            // 默认间距
            const grid = { top: 84, right: 58, bottom: 56, left: 174 };
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
            confine: props.tooltipConfine,
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: '#E5E7EA',
                    width: 2 * props.scale
                }
            },
            formatter: params => {
                let tooltipTitle;
                if (props.tooltipTitle instanceof Array) {
                    tooltipTitle = props.tooltipTitle[params[0]?.dataIndex];
                }
                !tooltipTitle && (tooltipTitle = params[0]?.axisValue);
                return `
                    <div style="background-color: #fff; padding: ${ 16 * props.scale }px; border-radius: 0; border: ${ 2 * props.scale }px solid rgba(0, 0, 0, 0.1);">
                        <h4 style="font-family: PingFangSC-Regular; font-size: ${ 24 * props.scale }px; color: #323233; font-weight: 400;">${ tooltipTitle }</h4>
                        <div style="display: grid; grid-auto-rows: ${ 37 * props.scale }px; grid-row-gap: ${ 8 * props.scale }px; grid-template-columns: ${ 18 * props.scale }px ${ 8 * props.scale }px min-content ${ 12 * props.scale }px min-content; align-items: center; margin-top: ${ 8 * props.scale }px;">
                            ${
                                params.map(n => {
                                    const seriesIndex = (n.seriesIndex - 1) / 2;
                                    // const colorName = props.color[seriesIndex % props.color.length];
                                    // const color = colorMap[colorName]?.tooltip;
                                    const color = props.color[seriesIndex % props.color.length];
                                    if (n.data instanceof Object && n.data?.isGap) {
                                        return '';
                                    }
                                    return `
                                        <i style="background-color: ${ color }; height: ${ 18 * props.scale }px;"></i>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 24 * props.scale }px; color: #323233; font-weight: 400; grid-column-start: 3;">${ n.seriesName }</label>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 24 * props.scale }px; color: #323233; font-weight: 400; grid-column-start: 5;">${ [null, undefined, '', NaN].includes(n.value) ? '- -' : n.value }${ props.unit || '' }</label>
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
            // nameTextStyle: {
            //     fontSize: 14 * props.scale,
            //     color: 'red',
            //     padding: [0, 40, -2, 0].map(n => n * props.scale)
            // },
            splitNumber: 6,
            splitLine: {
                show: props.showSplitLine,
                lineStyle: {
                    width: 2,
                    color: '#E5E7EA',
                    type: 'dashed'
                }
            },
            axisLabel: {
                fontSize: 24 * props.scale,
                color: '#969799',
                fontFamily: 'PingFangSC-Regular',
                lineHeight: 36 * props.scale,
                fontWeight: 400
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
                    	width: 2 * props.scale,
                    	color: '#E5E7EA'
                    }
                },
                axisLabel: {
                    margin: 12 * props.scale,
                    color: '#323233',
                    fontSize: 24 * props.scale,
                    lineHeight: 36 * props.scale,
                    verticalAlign: 'middle',
                    // borderWidth: 1 * props.scale,
                    fontFamily: 'PingFangSC-Regular',
                    fontWeight: 400
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
                // const colorName = props.color[seriesIndex % props.color.length];
                return {
                    data: seriesItem.map(value => {
                        const { r, g, b, a } = computeColorRGBA(props.color[seriesIndex % props.color.length]);
                        // const barAreaColor = { ...colorMap[colorName]?.barArea };
                        // const { x, x2 } = barAreaColor;
                        // if (value < 0) {
                        //     barAreaColor.x = x2;
                        //     barAreaColor.x2 = x;
                        // }
                        const colorStops = [
                            { offset: value < 0 ? 0 : 1, color: `rgba(${ 255 - (255 - r) * 0.25 }, ${ 255 - (255 - g) * 0.25 }, ${ 255 - (255 - b) * 0.25 }, ${ a })` },
                            { offset: value < 0 ? 1 : 0, color: `rgba(${ r }, ${ g }, ${ b }, ${ a })` },
                        ];
                        return {
                            value,
                            itemStyle: {
                                // color: barAreaColor,
                                color: {
                                    type: 'linear',
                                    x: 0, y: 0, x2: 1, y2: 0,
                                    colorStops
                                },
                                borderRadius: props.barBorderRadius || 0,
                                borderRadius: value >= 0
                                    ? [0, 12 * props.scale, 12 * props.scale, 0]
                                    : [12 * props.scale, 0, 0, 12 * props.scale]
                            },
                            label: {
                                offset: [value >= 0 ? -16 : 16, 0].map(n => n * props.scale)
                            }
                        }
                    }),
                    name: props.legendData[seriesIndex % props.legendData.length],
                    type: 'bar',
                    barGap: `0%`,
                    barWidth: props.barWidth * props.scale,
                    showBackground: props.showItemBackground,
                    label: {
                        show: props.showSeriesLabel,
                        position: 'outside',
                        formatter: ({ value }) => `{value|${ value }}`,
                        rich: {
                            value: {
                                color: '#323233',
                                fontSize: 28 * props.scale,
                                height: 40 * props.scale,
                                fontFamily: 'DINCondensed-Bold',
                                padding: [4, 8, 0, 18].map(n => n * props.scale),
                                fontWeight: 700,
                                verticalAlign: 'middle',
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                                shadowColor: 'rgba(128, 134, 147, 0.5)',
                                shadowOffsetX: 0,
                                shadowOffsetY: 6 * props.scale,
                                shadowBlur: 12 * props.scale,
                                borderRadius: 4 * props.scale,
                            }
                        }
                    },
                    backgroundStyle: { color: props.itemBackgroundColor }
                }
            });
            const result = [series.shift()];
            // 间隔项
            const gapSerieItem = {
                type: 'bar',
                data: new Array(props.yAxisData[0]?.length).fill({
                    value: 0,
                    isGap: true
                }),
                itemStyle: { color: 'red' },
                showBackground: props.showItemBackground,
                backgroundStyle: { color: props.itemBackgroundColor }
            }
            // 每条柱之间的间隔
            while (series.length) {
                result.push({ ...gapSerieItem, barWidth: 9 * props.scale });
                result.push(series.shift());
            }
            // 柱上下两端的间隔
            result.unshift({ ...gapSerieItem, barWidth: 26 * props.scale });
            result.push({ ...gapSerieItem, barWidth: 26 * props.scale });
            return result;
        })(),
        legend: (() => {
            const legendConfig = {
                show: props.showLegend,
                data: props.legendData.map((name, index) => {
                    // const colors = props.legendColors || props.itemColors;
                    // const colorName = props.color[index % props.color.length];
                    // const legendIcon = props.legendIcon instanceof Array ? props.legendIcon : [props.legendIcon];
                    // const iconName = legendIcon[index % legendIcon.length];
                    return {
                        name,
                        // icon: legendIconMap[iconName] || legendIconMap.rect,
                        icon: legendIconMap.rect,
                        itemStyle: {
                            color: props.color[index % props.color.length]
                            // color: colorMap[colorName]?.legend
                        }
                    }
                }),
                top: 0 * props.scale,
                textStyle: {
                    fontSize: 24 * props.scale,
                    color: '#323233'
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
                    zoomLock: props.zoomLock,
                    yAxisIndex: props.yAxisData.map((n, i) => i),
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
                    width: 8,
                    // fillerColor: '#467C9F',
                    fillerColor: 'rgb(70, 124, 159)',
                    labelFormatter: '',
                    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundColor: 'rgba(63, 96, 137, 1)',
                    borderWidth: 0,
                    start,
                    end,
                    handleStyle: { color: 'red' },
                    right: props.dataZoomRight
                }
            ];
        } else {
            option.dataZoom = [
                {
                    type: 'inside',
                    yAxisIndex: props.yAxisData.map((n, i) => i),
                    start,
                    end,
                    zoomLock: props.zoomLock
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
    return chart;
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>