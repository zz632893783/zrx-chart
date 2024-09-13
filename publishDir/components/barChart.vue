<template>
    <!-- <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`"></div>
</template>
<script setup>
import { ref } from 'vue'
import * as echarts from 'echarts'
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
     * @description x 轴坐标
     * @example ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业']
     */
    xAxisData: {
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
     * @example { top: 84, right: 18, bottom: 56, left: 56 }
     */
    grid: {
        type: [Object],
        default: () => ({
            top: 84,
            right: 18,
            bottom: 56,
            left: 56
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
     * @description y轴单位
     * @example '万元'
     */
    yAxisName: {
        type: [String],
        default: () => ''
    },
    /**
     * @description 最多显示的数量（实际显示数量会根据输入值调整）
     * @example 4
     */
    showCount: {
        type: [Number],
        default: () => 7
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
     * @description 圆柱的圆角
     * @example [4, 4, 0, 0]
     */
    barBorderRadius: {
        type: [Number, Array],
        default: () => [0]
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
// 默认颜色映射
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
            const grid = { top: 84, right: 18, bottom: 56, left: 56 };
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
                        <div style="display: grid; grid-auto-rows: ${ 19 * props.scale }px; grid-row-gap: ${ 4 * props.scale }px; grid-template-columns: ${ 8 * props.scale }px ${ 8 * props.scale }px min-content ${ 12 * props.scale }px min-content; align-items: center; margin-top: ${ 8 * props.scale }px;">
                            ${
                                params.slice(0, params.length - 1).map(n => {
                                    const colorName = props.color[n.seriesIndex % props.color.length];
                                    const color = colorMap[colorName]?.tooltip;
                                    return `
                                        <i style="background-color: ${ color }; height: ${ 8 * props.scale }px;"></i>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3;">${ n.seriesName }</label>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5;">${ [null, undefined, '', NaN].includes(n.value) ? '- -' : n.value } ${ props.yAxisName || '' }</label>
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
                    name: props.yAxisName,
                    nameTextStyle: {
                        fontSize: 14 * props.scale,
                        color: '#ccd4da',
                        padding: [0, 40, -2, 0].map(n => n * props.scale)
                    },
                    splitNumber: 3,
                    splitLine: {
                        lineStyle: {
                            color: '#4f6878',
                            type: 'dashed'
                        }
                    },
                    axisLabel: {
                        fontSize: 14 * props.scale,
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
                    barWidth: 12 * props.scale,
                    itemStyle: {
                        // color: props.itemColors[seriesIndex % props.itemColors.length]
                        color: colorMap[colorName]?.barArea,
                        borderRadius: props.barBorderRadius || 0,
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
                { type: 'inside', start, end, zoomLock: props.zoomLock }
            ];
        }
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
    return chart;
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>
