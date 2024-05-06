<template>
    <div class="zrx-chart">
        <!-- <div class="chart-container" ref="chartRef"></div> -->
        <div class="chart-container" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div>
        <div class="center">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
// import riseIcon from '@/assets/imgs/header/common_angle_up_red.svg';
// import fallIcon from '@/assets/imgs/header/common_angle_down_green.svg';
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
const riseIcon = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDx0aXRsZT5jb21tb25fYW5nbGVfdXBfcmVkPC90aXRsZT4NCiAgICA8ZGVmcz4NCiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4NCiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNzQ3NjgiIG9mZnNldD0iMC4wNjI4Mjc3OTcyJSI+PC9zdG9wPg0KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0Y3NDc2OCIgc3RvcC1vcGFjaXR5PSIwLjIiIG9mZnNldD0iMTAwJSI+PC9zdG9wPg0KICAgICAgICA8L2xpbmVhckdyYWRpZW50Pg0KICAgIDwvZGVmcz4NCiAgICA8ZyBpZD0iY29tbW9uX2FuZ2xlX3VwX3JlZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+DQogICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHg9IjAiIHk9IjAiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PC9yZWN0Pg0KICAgICAgICA8cG9seWdvbiBpZD0i6Lev5b6EIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIiBwb2ludHM9IjEgOSA4IDIuMTk4OTgxNzRlLTE0IDE1IDkgMTEgOSAxMSAxNiA1IDE2IDUgOSI+PC9wb2x5Z29uPg0KICAgIDwvZz4NCjwvc3ZnPg==';
const fallIcon = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxzdmcgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDE2IDE2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPg0KICAgIDx0aXRsZT5jb21tb25fYW5nbGVfZG93bl9ncmVlbjwvdGl0bGU+DQogICAgPGRlZnM+DQogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNTAlIiB5MT0iMCUiIHgyPSI1MCUiIHkyPSIxMDAlIiBpZD0ibGluZWFyR3JhZGllbnQtMSI+DQogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDBGRjgxIiBvZmZzZXQ9IjAuMDYyODI3Nzk3MiUiPjwvc3RvcD4NCiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwMEZGODEiIHN0b3Atb3BhY2l0eT0iMC4yIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4NCiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4NCiAgICA8L2RlZnM+DQogICAgPGcgaWQ9ImNvbW1vbl9hbmdsZV9kb3duX2dyZWVuIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4NCiAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2Ij48L3JlY3Q+DQogICAgICAgIDxwb2x5Z29uIGlkPSLot6/lvoQiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtOC4wMDAwMDAsIC04LjAwMDAwMCkgIiBwb2ludHM9IjEgOSA4IDIuMTk4OTgxNzRlLTE0IDE1IDkgMTEgOSAxMSAxNiA1IDE2IDUgOSI+PC9wb2x5Z29uPg0KICAgIDwvZz4NCjwvc3ZnPg==';
// 图表实例
let chart;
// 图表 dom 对象
const chartRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 标题
     * @example '标题'
     */
    title: {
        type: [String],
        default: () => ''
    },
    /**
     * @description 半径
     * @example [60, 70]
     */
    radius: {
        type: [Array],
        default: () => [68, 80]
    },
    /**
     * @description 间距
     * @example 4
     */
    itemGap: {
        type: [Number],
        default: () => 2
    },
    /**
     * @description 数据项
     * @example [
     *     { value: 2, name: '住宿业营业额' },
     *     { value: 3, name: '餐饮业营业额' },
     *     { value: 5, name: '零售业营业额' },
     *     { value: 4, name: '批发业营业额' }
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 颜色
     * @example ['#ae7efd', '#7670d7', '#709ad7', '#72dde0', '#d0f1ff', '#b5bfe2', '#206e8a', '#1dd1ff', '#d2abea', '#0e8fff']
     */
    color: {
        type: [Array],
        default: () => ['#ae7efd', '#7670d7', '#709ad7', '#72dde0', '#d0f1ff', '#b5bfe2', '#206e8a', '#1dd1ff', '#d2abea', '#0e8fff']
    },
    /**
     * @description 单位
     * @example '个'
     */
    unit: {
        type: [String],
        default: () => ''
    },
    /**
     * @description 自定义 label 函数
     * @example function (...params) {
     *     return '自定义 label 格式'
     * }
     */
    labelFormatter: {
        type: [Function],
        default: () => null
    },
    /**
     * @description 文字与边缘之间的距离
     * @example 20
     */
    edgeDistance: {
        type: [Number],
        default: () => 10
    },
    /**
     * @description 单项的最小角度
     * @example 4
     */
    minAngle: {
        type: [Number],
        default: () => 0
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
    // chart = echarts.init(chartRef.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    const option = {
        legend: {
            show: true,
            top: -1e6
        },
        tooltip: { show: false },
        series: [
            {
                type: 'pie',
                width: '100%',
                height: '100%',
                radius: [
                    props.radius[0] - props.itemGap,
                    props.radius[1] + props.itemGap
                ].map(n => n * props.scale),
                minAngle: props.minAngle,
                data: props.seriesData.map((value, index) => {
                    typeof value !== 'object' && (value = { value });
                    const color = props.color[index % props.color.length];
                    return {
                        ...value,
                        itemStyle: { color },
                        label: {
                            show: true,
                            alignTo: 'edge',
                            distanceToLabelLine: 0,
                            edgeDistance: props.edgeDistance * props.scale,
                            formatter: props.labelFormatter || (param => {
                                return `{title|${ param.name || `第${ index }项` }}\n{split|}\n{value|${ [null, undefined, '', NaN].includes(param.value) ? '- -' : param.value }}{unit|${ props.unit }}{colGap|}{value|${ param.percent }}{unit|%}`
                            }),
                            rich: {
                                title: {
                                    color: 'white',
                                    lineHeight: 20 * props.scale,
                                    fontSize: 12 * props.scale,
                                    verticalAlign: 'center'
                                },
                                split: {
                                    height: 1 * props.scale,
                                    width: '100%',
                                    backgroundColor: '#5c768d'
                                },
                                value: {
                                    color: 'white',
                                    fontFamily: 'DINAlternate-Bold',
                                    fontSize: 16 * props.scale,
                                    lineHeight: 18 * props.scale,
                                    verticalAlign: 'bottom'
                                },
                                unit: {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    lineHeight: 20 * props.scale,
                                    fontSize: 12 * props.scale,
                                    verticalAlign: 'bottom'
                                },
                                colGap: { width: 6 * props.scale },
                                rise: {
                                    width: 14 * props.scale,
                                    height: 16 * props.scale,
                                    backgroundColor: {
                                        image: riseIcon
                                    },
                                    verticalAlign: 'center'
                                },
                                fall: {
                                    width: 14 * props.scale,
                                    height: 16 * props.scale,
                                    backgroundColor: {
                                        image: fallIcon
                                    },
                                    verticalAlign: 'center'
                                }
                            }
                        },
                        labelLine: {
                            show: true,
                            lineStyle: { color: '#5c768d' }
                        }
                        // emphasis: {
                        //     label: { show: props.centerDisplay === 'item' }
                        // }
                    }
                }),
                labelLine: { show: false },
                itemStyle: {
                    borderWidth: props.itemGap,
                    borderColor: 'rgb(3, 43, 68)'
                },
                emphasis: { scaleSize: 5 * props.scale }
            }
        ]
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped>
.chart-container {
    width: 100%;
    height: 100%;
}
.zrx-chart {
    position: relative;
    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>