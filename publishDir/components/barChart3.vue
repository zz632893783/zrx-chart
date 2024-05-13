<template>
    <!-- <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`"></div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
import { setMaxVal } from '../utils/index.js';
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
     *     ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业'],
     *     ['农', '工', '建', '批', '交', '住', '金', '房', '其']
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
            left: 106
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
     * @description 自定义 tooltip 的格式，支持模板字符串或函数
     * @example function (...params) {
     *     return '返回自定义格式'
     * }
     */
    tooltipFormatter: {
        type: [Function, String],
        default: () => ''
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
        type: [String, Array],
        default: () => ['blue', 'grey']
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
     * @example 24
     */
    barWidth: {
        type: [Number],
        default: () => 10
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
     * @description 每一项的背景色
     * @example 'rgba(255, 0, 0, 0.12)'
     */
    itemBackgroundColor: {
        type: [String],
        default: () => 'rgba(29, 63, 105, 0.12)'
    },
    /**
     * @description 是否显示柱子对应的数值
     * @example true
     */
    showSeriesLabel: {
        type: [Boolean],
        default: () => false
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
    // chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
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
                    <div style="background-color: #125176; padding: ${ 8 * props.scale }px; border-radius: 0; border: ${ 1 * props.scale }px solid rgba(102, 255, 255, 0.2);">
                        <h4 style="font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400;">${ tooltipTitle }</h4>
                        <div style="display: grid; grid-auto-rows: ${ 19 * props.scale }px; grid-row-gap: ${ 4 * props.scale }px; grid-template-columns: ${ 8 * props.scale }px ${ 8 * props.scale }px min-content ${ 12 * props.scale }px min-content; grid-column-gap: ${ 2 * props.scale }px ${ 12 * props.scale }px; align-items: center; margin-top: ${ 8 * props.scale }px;">
                            ${
                                params.map(n => {
                                    const colorName = props.color[n.seriesIndex % props.color.length];
                                    const color = colorMap[colorName]?.tooltip;
                                    return `
                                        <i style="background-color: ${ color }; height: ${ 8 * props.scale }px;"></i>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3;">${ n.seriesName }</label>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5;">${ [null, undefined, '', NaN].includes(n.value) ? '- -' : n.value }${ props.unit || '' }</label>
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
            // name: 'props.xAxisName',
            // nameLocation: 'center',
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
                fontSize: 14 * props.scale,
                color: '#ccd3d8'
            }
        },
        yAxis: props.yAxisData.map((yAxis, index) => {
            return {
                type: 'category',
                inverse: true,
                // nameLocation: 'right',
                // name: 'props.xAxisName',
                data: yAxis,
                axisTick: { show: false },
                axisLine: {
                    show: index === 0,
                    lineStyle: { color: '#677b87' }
                },
                axisLabel: {
                    fontSize: 14 * props.scale,
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
        series: props.seriesData.map((seriesItem, seriesIndex) => {
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
                        itemStyle: {
                            color: barAreaColor,
                            borderRadius: props.barBorderRadius || 0
                        }
                    }
                }),
                name: props.legendData[seriesIndex % props.legendData.length],
                type: 'bar',
                barGap: `${10 / props.barWidth * 100}%`,
                barWidth: props.barWidth * props.scale,
                // showBackground: true,
                showBackground: false,
                label: {
                    show: props.showSeriesLabel,
                    position: 'outside',
                    textStyle: {
                        color: 'white'
                    }
                },
                backgroundStyle: {
                    color: props.itemBackgroundColor
                }
            }
        }),
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
                    fontSize: 16 * props.scale,
                    color: 'white'
                },
                itemGap: 20 * props.scale,
                itemWidth: 16 * props.scale,
                itemHeight: 16 * props.scale
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
                    fillerColor: '#467C9F',
                    labelFormatter: '',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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