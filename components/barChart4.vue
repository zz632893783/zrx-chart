<template>
    <!-- <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`"></div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
// 以下这串字符串为特殊字符串，用于指定组件自动生成的 “属性.vue” 说明文件中，每列列宽
/* @attribute-template-columns: minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 3fr) minmax(0, 3fr); */
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表实例
let chart;
// 图表 dom 对象
// const chartRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 上下左右边距
     * @example { top: 0, right: 0, bottom: 0, left: 0 }
     */
    grid: {
        type: [Object],
        default: () => ({ top: 0, right: 20, bottom: 0, left: 20 })
    },
    /**
     * @description legend 数据
     * @example ['男', '女']
     */
    legendData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 纵坐标数据
     * @example [
     *     [12, 64, 84, 11, 69, 51],
     *     [87, 29, 80, 66, 21, 23]
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 纵坐标数据
     * @example ['0-6岁', '7-17岁', '18-35岁', '36-59岁', '60-79岁', '>80岁']
     */
    yAxisData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 中心部分 y 轴的宽度
     * @example 120
     */
    yAxisWidth: {
        type: [Number],
        default: () =>  72
    },
    /**
     * @description 圆柱的圆角
     * @example 4
     */
    barBorderRadius: {
        type: [Number],
        default: () => 4
    },
    /**
     * @description 圆的宽度
     * @example 24
     */
    barWidth: {
        type: [Number],
        default: () => 16
    },
    /**
     * @description 是否显示数值
     * @example false
     */
    showValue: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 单位
     * @example '人'
     */
    unit: {
        type: [String],
        default: () => ''
    },
    /**
     * @description 最多显示的数量（实际显示数量会根据输入值调整）
     * @example 3
     */
    showCount: {
        type: [Number],
        default: () => 3
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
     * @description 颜色
     * @example ['blue', 'grey']
     */
    color: {
        type: [Array],
        default: () => [
            {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                    {
                        offset: 0,
                        color: '#1261c5'
                    },
                    {
                        offset: 1,
                        color: '#3eb1ff'
                    }
                ]
            },
            {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                    {
                        offset: 0,
                        color: '#d2f3ff'
                    },
                    {
                        offset: 1,
                        color: '#8bbbf2'
                    }
                ]
            }
        ]
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
        chart.dispose();
        chart = null;
    }
    // chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
    // 计算最大值
    let max = Math.max(...props.seriesData.reduce((x, y) => [...x, ...y], []));
    const n = Math.floor(Math.log10(max))
    max = Math.ceil(Number((max / Math.pow(10, n)).toFixed(1))) * Math.pow(10, n);
    // 计算 上下组有边距
    const grid = { top: 0, right: 0, bottom: 0, left: 0 };
    for (const k in grid) {
        props.grid[k] !== undefined && (grid[k] = props.grid[k]);
        grid[k] = grid[k] * props.scale;
    }
    const option = {
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.25)'
                }
            },
            padding: 0,
            margin: 0,
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderRadius: 0,
            formatter: ([param]) => {
                const value = param.value * (param.seriesIndex === 0 ? -1 : 1);
                let color = props.color[param.seriesIndex % props.color.length];
                if (typeof color === 'object') {
                    color = [...color.colorStops].sort((x, y) => x.offset - y.offset).reduce((x, y) => [...x, y.color], []);
                    color = `linear-gradient(90deg, ${ color.join(', ') })`
                }
                return `
                    <div style="background-color: #125176; padding: ${ 4 * props.scale }px ${ 12 * props.scale }px; border: ${ props.scale }px solid #227491;">
                        <h4 style="font-size: ${ 14 * props.scale }px; color: white;">${ param.seriesName }</h4>
                        <i style="display: inline-block; width: ${ 8 * props.scale }px; height: ${ 8 * props.scale }px; background: ${ color }; lineHeight: ${ 24 * props.scale }px; vertical-align: middle;"></i>
                        <span style="display: inline-block; font-size: ${ 14 * props.scale }px; color: white; lineHeight: ${ 24 * props.scale }px; vertical-align: middle; margin-left: ${ 4 * props.scale }px;">${ value }${ props.unit }</span>
                    </div>
                `;
            }
        },
        grid: [
            {
                left: grid.left,
                top: grid.top,
                bottom: grid.bottom,
                // right: grid.right + (chartRef.value.offsetWidth - grid.left - grid.right) / 2 + props.yAxisWidth / 2
                // right: grid.right + ((document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value).offsetWidth - grid.left - grid.right) / 2 + props.yAxisWidth / 2
                right: grid.right + ((document.getElementById(`zrx-chart-${ randomId }`)).offsetWidth - grid.left - grid.right) / 2 + props.yAxisWidth / 2
            },
            {
                // left: grid.left + (chartRef.value.offsetWidth - grid.left - grid.right) / 2 + props.yAxisWidth / 2,
                // left: grid.left + ((document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value).offsetWidth - grid.left - grid.right) / 2 + props.yAxisWidth / 2,
                left: grid.left + ((document.getElementById(`zrx-chart-${ randomId }`)).offsetWidth - grid.left - grid.right) / 2 + props.yAxisWidth / 2,
                top: grid.top,
                bottom: grid.bottom,
                right: grid.right
            }
        ],
        xAxis: [
            {
                max: 0,
                min: -max,
                type: 'value',
                splitLine: { show: false },
                axisLabel: { show: false }
            },
            {
                max: 0,
                min: max,
                gridIndex: 1,
                type: 'value',
                splitLine: { show: false },
                axisLabel: { show: false }
            }
        ],
        yAxis: [
            {
                type: 'category',
                position: 'right',
                inverse: true,
                gridIndex: 0,
                axisTick: { show: false },
                axisLabel: {
                    show: true,
                    width: props.yAxisWidth,
                    color: '#fff',
                    margin: 0,
                    formatter: v => `{labelStyle|${ v }}`,
                    rich: {
                        labelStyle: {
                            fontSize: 14,
                            color: 'white',
                            align: 'center'
                        }
                    }
                },
                axisLine: { show: false },
                splitLine: { show: false },
                data: props.yAxisData
            },
            {
                type: 'category',
                inverse: true,
                gridIndex: 1,
                axisTick: { show: false },
                axisLabel: {
                    show: false,
                    color: '#fff',
                    fontSize: 14
                },
                axisLine: { show: false },
                splitLine: { show: false },
                data: props.yAxisData
            }
        ],
        series: [
            {
                name: props.legendData[0],
                type: 'bar',
                stack: 'age',
                data: props.seriesData[0].map(n => -1 * n),
                barWidth: props.barWidth,
                itemStyle: {
                    borderRadius: [props.barBorderRadius, 0, 0, props.barBorderRadius],
                    color: props.color[0]
                },
                label: {
                    show: props.showValue,
                    position: 'left',
                    formatter: (param) => param.value * (param.seriesIndex === 0 ? -1 : 1),
                    color: 'white',
                    fontSize: 14
                },
                emphasis: {
                    disabled: true,
                    itemStyle: { color: props.color[0] }
                }
            },
            {
                xAxisIndex: 1,
                yAxisIndex: 1,
                name: props.legendData[1],
                type: 'bar',
                stack: 'age',
                data: props.seriesData[1],
                barWidth: props.barWidth,
                itemStyle: {
                    borderRadius: [0, props.barBorderRadius, props.barBorderRadius, 0],
                    color: props.color[1]
                },
                label: {
                    show: props.showValue,
                    position: 'right',
                    color: 'white',
                    fontSize: 14
                },
                emphasis: {
                    disabled: true,
                    itemStyle: { color: props.color[1] }
                }
            }
        ]
    };
    if (props.showCount) {
        const start = 0;
        const end = props.showCount / props.yAxisData.length * 100;
        if (props.dataZoomType === 'slider') {
            option.dataZoom = [
                {
                    type: 'slider',
                    zoomLock: props.zoomLock,
                    yAxisIndex: [0, 1],
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
                    yAxisIndex: [0, 1],
                    start,
                    end,
                    zoomLock: props.zoomLock
                }
            ];
        }
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
    return chart;
};

defineExpose({
    renderChart,
    clearChart: () => chart?.clear()
});
</script>
<style lang="scss" scoped></style>