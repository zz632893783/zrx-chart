<template>
    <!-- <div class="zrx-chart" ref="chartRef" :id="`zrx-chart-${ randomId }`"></div> -->
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
     * @description 天气 icon 数组
     * @example ['icon0', 'icon1', 'icon2']
     */
    icons: {
        type: [Array],
        default: () => ['icon0', 'icon1', 'icon2']
    },
    /**
     * @description 图表尺寸
     * @example [40, 40]
     */
    iconSize: {
        type: [Array],
        default: () => [40, 40]
    },
    /**
     * @description 日期数组
     * @example ['今天\n03/25', '明天\n03/26', '周三\n03/27', '周四\n03/28', '周五\n03/29', '周六\n03/30', '周日\n03/31']
     */
    dates: {
        type: [Array],
        default: () => ['今天\n03/25', '明天\n03/26', '周三\n03/27', '周四\n03/28', '周五\n03/29', '周六\n03/30', '周日\n03/31']
    },
    /**
     * @description 每一天的温度，二维数组
     * @example [[7, 18], [12, 24], [15, 26], [13, 22], [15, 24], [11, 27], [13, 25]]
     */
    temperature: {
        type: [Array],
        default: () => [
            [7, 18],
            [12, 24],
            [15, 26],
            [13, 22],
            [15, 24],
            [11, 27],
            [13, 25]
        ]
    }
});
// 渲染函数
const renderChart = () => {
    if (chart) {
        chart.dispose();
        chart = null;
    }
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
    const icons = props.icons.map(icon => ({
        name: `icon${ Math.round(0xffffff * Math.random()).toString(16).padStart(6, 0) }`,
        icon
    }));
    const option = {
        grid: [
            {
                left: 15,
                right: 16,
                height: 90,
                bottom: 82
            },
            {
                left: 15,
                right: 16,
                top: 41,
                bottom: 38
            }
        ],
        tooltip: {
            show: false
            // trigger: 'axis'
        },
        xAxis: [
            {
                type: 'category',
                position: 'bottom',
                data: new Array(props.dates.length).fill(''),
                axisLine: { show: false },
                axisTick: { show: false },
                gridIndex: 0
            },
            {
                type: 'category',
                position: 'top',
                data: props.dates,
                axisLine: { show: false },
                axisTick: { show: false },
                offset: -78,
                gridIndex: 1,
                z: 2,
                axisLabel: {
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: 16,
                    color: 'white',
                    lineHeight: 24,
                    fontWeight: 400
                }
            },
            {
                type: 'category',
                position: 'top',
                offset: -134,
                data: new Array(props.dates.length).fill(''),
                axisLine: { show: false },
                axisTick: { show: false },
                gridIndex: 1,
                z: 2,
                axisLabel: {
                    formatter: (icon, index) => {
                        return `{${ icons[index % icons.length].name }|}`;
                    },
                    rich: icons.reduce((x, y) => ({
                        ...x,
                        [y.name]: {
                            width: props.iconSize instanceof Array ? props.iconSize[0] : props.iconSize,
                            height: props.iconSize instanceof Array ? (props.iconSize[1] || props.iconSize[0]) : props.iconSize,
                            backgroundColor: { image: y.icon }
                        }
                    }), {})
                }
            },
            {
                type: 'category',
                position: 'bottom',
                offset: -178,
                data: props.temperature.map(n => Math.min(...n)).map(n => `${ n }°`),
                axisLine: { show: false },
                axisTick: { show: false },
                gridIndex: 1,
                z: 2,
                axisLabel: {
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: 24,
                    color: 'white',
                    lineHeight: 24,
                    fontWeight: 200
                }
            },
            {
                type: 'category',
                position: 'bottom',
                offset: -46,
                data: props.temperature.map(n => Math.max(...n)).map(n => `${ n }°`),
                axisLine: { show: false },
                axisTick: { show: false },
                gridIndex: 1,
                z: 2,
                axisLabel: {
                    fontFamily: 'PingFangSC-Regular',
                    fontSize: 24,
                    color: 'white',
                    lineHeight: 24,
                    fontWeight: 200
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: { show: false },
                axisLabel: { show: false },
                gridIndex: 0,
                position: 'left'
            },
            {
                type: 'value',
                max: 1,
                min: 0,
                splitLine: { show: false },
                axisLabel: { show: false },
                gridIndex: 1,
                position: 'right'
            }
        ],
        series: [
            {
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: props.temperature.map(n => Math.min(...n)),
                symbol: 'circle',
                symbolSize: 17,
                lineStyle: {
                    width: 1,
                    color: 'rgba(127, 127, 127, 1)'
                },
                itemStyle: {
                    borderColor: 'rgba(127, 127, 127, 1)',
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            { offset: 0, color: 'rgba(127, 127, 127, 1)' },
                            { offset: 1, color: 'rgba(127, 127, 127, 0)' }
                        ]
                    }
                },
                emphasis: {
                    scale: false,
                    itemStyle: {
                        borderColor: 'rgba(80, 199, 187, 1)',
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                { offset: 0, color: 'rgba(80, 199, 187, 1)' },
                                { offset: 1, color: 'rgba(80, 199, 187, 0)' }
                            ]
                        }
                    }
                }
            },
            {
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: props.temperature.map(n => Math.max(...n)),
                symbol: 'circle',
                symbolSize: 17,
                lineStyle: {
                    width: 1,
                    color: 'rgba(127, 127, 127, 1)'
                },
                itemStyle: {
                    borderColor: 'rgba(127, 127, 127, 1)',
                    borderWidth: 1,
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            { offset: 0, color: 'rgba(127, 127, 127, 1)' },
                            { offset: 1, color: 'rgba(127, 127, 127, 0)' }
                        ]
                    }
                },
                emphasis: {
                    scale: false,
                    itemStyle: {
                        borderColor: 'rgba(80, 199, 187, 1)',
                        color: {
                            type: 'radial',
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                { offset: 0, color: 'rgba(80, 199, 187, 1)' },
                                { offset: 1, color: 'rgba(80, 199, 187, 0)' }
                            ]
                        }
                    }
                }
            },
            {
                type: 'bar',
                // 折线图拐点的连线
                stack: 'pointLinkLine',
                xAxisIndex: 0,
                yAxisIndex: 0,
                barWidth: 1,
                data: props.temperature.map(n => Math.min(...n)),
                itemStyle: { color: 'transparent' }
            },
            {
                type: 'bar',
                // 折线图拐点的连线
                stack: 'pointLinkLine',
                xAxisIndex: 0,
                yAxisIndex: 0,
                barWidth: 1,
                data: props.temperature.map(n => (Math.max(...n) - Math.min(...n))),
                itemStyle: {
                    color: {
                        image: (() => {
                            const canvas = document.createElement('canvas');
                            canvas.width = 1;
                            canvas.height = 7;
                            const ctx = canvas.getContext('2d');
                            ctx.fillStyle = 'rgba(127, 127, 127, 1)';
                            ctx.fillRect(0, 0, 1, 3);
                            return canvas;
                        })(),
                        repeat: 'repeat'
                    }
                },
                emphasis: {
                    itemStyle: {
                        color: {
                            image: (() => {
                                const canvas = document.createElement('canvas');
                                canvas.width = 1;
                                canvas.height = 7;
                                const ctx = canvas.getContext('2d');
                                ctx.fillStyle = 'rgba(80, 199, 187, 1)';
                                ctx.fillRect(0, 0, 1, 3);
                                return canvas;
                            })(),
                            repeat: 'repeat'
                        }
                    }
                }
            },
            {
                type: 'bar',
                yAxisIndex: 1,
                xAxisIndex: 1,
                data: new Array(props.dates.length).fill(1),
                barWidth: 90,
                itemStyle: {
                    color: 'rgba(46, 46, 46, 0.6)',
                    borderRadius: 8
                },
                emphasis: {
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                { offset: 0, color: 'rgba(255, 255, 255, 0.17)' },
                                { offset: 1, color: 'rgba(84, 141, 191, 0.3)' }
                            ]
                        }
                    }
                }
            }
        ]
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
    chart.on('mouseover', data => {
        chart.dispatchAction({ type: 'downplay' });
        chart.dispatchAction({ type: 'highlight', dataIndex: data.dataIndex });
    });
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>
