<template>
    <!-- <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`"></div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
import { computeColorRGBA } from '../utils/index.js';
// 以下这串字符串为特殊字符串，用于指定组件自动生成的 “属性.vue” 说明文件中，每列列宽
/* @attribute-template-columns: minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 3fr); */
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表实例
let chart;
// 图表 dom 对象
const chartRef = ref();
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
     * @description legend 数据
     * @example ['统计金额', '开票金额']
     */
    legendData: {
        type: [Array],
        default: () => []
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
     * @description 是否显示 legend
     * @example false
     */
    showLegend: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 图表项颜色
     * @example ['blue', 'grey']
     */
    color: {
        type: [String, Array],
        default: () => ['#DE882C', '#2CB0DE', '#82ED9A']
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
     * @description 图表缩放比例
     * @example 2
     */
    scale: {
        type: [Number],
        default: () => 1
    },
    /**
     * @description 上下左右边距
     * @example { top: 84, right: 18, bottom: 56, left: 56 }
     */
    grid: {
        type: [Object],
        default: () => ({
            top: 42,
            right: 50,
            bottom: 28,
            left: 50
        })
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
     * @description 最多显示的数量（实际显示数量会根据输入值调整）
     * @example 4
     */
    showCount: {
        type: [Number],
        default: () => 6
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
     * @description 从末尾开始显示图表
     * @example false
     */
    dataZoomStartAtEnd: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 柱子顶部是否显示白色方块
     * @example false
     */
    showBarTopRect: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 标记线
     * @example [
     *     {
     *         value: 134,
     *         yAxisIndex: 0,
     *         color: '#33FFBB'
     *     },
     *     {
     *         value: 166,
     *         yAxisIndex: 0,
     *         color: '#F74768'
     *     }
     * ]
     */
    markLine: {
        type: [Array],
        default: () => []
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
    // chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef?.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
    const option = {
        grid: (() => {
            const grid = { top: 56, right: 60, bottom: 40, left: 60 };
            for (const k in grid) {
                props.grid[k] !== undefined && (grid[k] = props.grid[k]);
                grid[k] = grid[k] * props.scale;
            }
            return grid;
        })(),
        xAxis: {
            type: 'category',
            data: props.xAxisData,
            axisTick: { show: false },
            axisLine: {
                lineStyle: { color: 'rgb(101, 156, 182)' }
            },
            axisLabel: {
                color: `rgb(137, 174, 190)`,
                margin: 8 * props.scale,
                fontSize: 12 * props.scale,
                fontFamily: 'MicrosoftYaHei',
                lineHeight: 16 * props.scale
            }
        },
        yAxis: [
            ...(typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName).map((name, index) => {
                return {
                    name,
                    type: 'value',
                    // max: value => {
                    //     const valueArr = props.markLine.filter(i => i.yAxisIndex == index).map(i => i.value);
                    //     const maxV = Math.max(...[valueArr]);
                    //     if (value.max < maxV) {
                    //         return maxV;
                    //     }
                    // },
                    // alignTicks: props.yAxisName instanceof Array && props.yAxisName.length > 1,
                    splitNumber: 3,
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: {
                        color: `rgb(137, 174, 190)`,
                        margin: 6 * props.scale,
                        fontSize: 12 * props.scale,
                        fontFamily: 'MicrosoftYaHei'
                    },
                    nameTextStyle: {
                        color: `rgb(137, 174, 190)`,
                        fontSize: 12 * props.scale,
                        fontFamily: 'DIN Alternate',
                        align: ['right', 'left'][index],
                        padding: [[14, 14, 0, 2], [14, 2, 0, 14]][index].map(n => n * props.scale)
                    },
                    splitLine: {
                        show: !index && props.showSplitLine,
                        lineStyle: {
                            width: props.scale,
                            type: 'dashed',
                            color: 'rgb(23, 73, 101)'
                        }
                    }
                }
            })
        ],
        series: (() => {
            const lineWidth = 1 * props.scale;
            const result = props.seriesData.map((item, index) => {
                let canvas = document.createElement('canvas');
                canvas.width = 8.8 * props.scale;
                canvas.height = parseFloat(window.getComputedStyle(document.getElementById(`zrx-chart-${ randomId }`)).height) - (Number(props.grid.top) || 56) * props.scale - (Number(props.grid.bottom) || 40) * props.scale;
                let ctx = canvas.getContext('2d');
                const { r, g, b, a } = computeColorRGBA(props.color[index % props.color.length]);
                // 绘制中间渐变填充色
                let linearGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                const rate = 0.15;
                linearGradient.addColorStop(0, `rgba(${ r + (255 - r) * rate }, ${ g + (255 - g) * rate }, ${ b + (255 - b) * rate }, ${ a * 0.2 })`);
                linearGradient.addColorStop(1, `rgba(${ r + (255 - r) * rate }, ${ g + (255 - g) * rate }, ${ b + (255 - b) * rate }, ${ a * 1 })`);
                ctx.fillStyle = linearGradient;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(canvas.width, 0);
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                ctx.fill();
                // 绘制左右渐变线条
                ctx.beginPath();
                ctx.moveTo(lineWidth / 2, lineWidth / 2);
                ctx.lineTo(lineWidth / 2, canvas.height - lineWidth / 2);
                ctx.moveTo(canvas.width - lineWidth / 2, canvas.height - lineWidth / 2);
                ctx.lineTo(canvas.width - lineWidth / 2, lineWidth / 2);
                ctx.closePath();
                linearGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                linearGradient.addColorStop(0, `rgba(${ r }, ${ g }, ${ b }, ${ a * 0.2 })`);
                linearGradient.addColorStop(1, `rgba(${ r }, ${ g }, ${ b }, ${ a * 1 })`);
                ctx.strokeStyle = linearGradient;
                ctx.stroke();
                // 随机成成粒子
                const count = Math.round(Math.random() * 10 + 10);
                for (let i = 0; i < count; i++) {
                    // const w = Math.ceil(Math.random() * 2) * props.scale;
                    // const h = w > 1 ? 1 : Math.ceil(Math.random() * 3) * props.scale;
                    const w = 1 * props.scale;
                    const h = 1 * props.scale;
                    const x = Math.random() * (canvas.width - w);
                    const y = Math.random() * (canvas.height - h);
                    // ctx.beginPath();
                    ctx.fillStyle = `rgba(255, 255, 255, ${ y / canvas.height })`;
                    ctx.fillRect(x, y, w, h);
                }
                const barBase64 = canvas.toDataURL();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // 绘制底部尖尖
                canvas.height = 4 * props.scale;
                ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(canvas.width, 0);
                ctx.lineTo(canvas.width / 2, canvas.height);
                ctx.closePath();
                ctx.fillStyle = `rgba(${ r + (255 - r) * rate }, ${ g + (255 - g) * rate }, ${ b + (255 - b) * rate }, ${ a * 1 })`;
                ctx.fill();
                const footerBase64 = canvas.toDataURL();
                return {
                    type: 'pictorialBar',
                    name: props.legendData[index % props.legendData.length] || '',
                    yAxisIndex: item.yAxisIndex || 0,
                    barWidth: 8.8 * props.scale,
                    barGap: `${ 5 / 8.8 * 100 }%`,
                    symbol: `image://${ barBase64 }`,
                    symbolSize: ['100%', '100%'],
                    symbolOffset: [0, -4 * props.scale],
                    data: item.data,
                    animation: false,
                    label: {
                        show: true,
                        distance: 0,
                        position: 'bottom',
                        formatter: '{footer|}',
                        offset: [0, -4 * props.scale],
                        rich: {
                            footer: {
                                width: 8.8 * props.scale,
                                height: 4 * props.scale,
                                backgroundColor: {
                                    image: canvas
                                }
                            }
                        }
                    }
                };
            });
            // 绘制顶部的方框
            props.seriesData.forEach(async (item, index) => {
                const { r, g, b, a } = computeColorRGBA(props.color[index % props.color.length]);
                const canvas = document.createElement('canvas');
                canvas.width = 8.8 * props.scale;
                canvas.height = 7 * props.scale;
                const ctx = canvas.getContext('2d');
                // ctx.beginPath();
                // ctx.moveTo(canvas.width / 2, lineWidth / 2);
                // ctx.lineTo(canvas.width - lineWidth / 2, canvas.height / 2);
                // ctx.lineTo(canvas.width / 2, canvas.height - lineWidth / 2);
                // ctx.lineTo(lineWidth / 2, canvas.height / 2);
                // ctx.closePath();
                // ctx.strokeStyle = `rgba(${ r }, ${ g }, ${ b }, ${ a * 0.4 })`;
                // ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2, 0);
                ctx.lineTo(canvas.width, canvas.height / 2);
                ctx.lineTo(canvas.width / 2, canvas.height);
                ctx.lineTo(0, canvas.height / 2);
                ctx.closePath();
                const linearGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                let rate = 0.05;
                linearGradient.addColorStop(0, `rgba(${ r + (255 - r) * rate }, ${ g + (255 - g) * rate }, ${ b + (255 - b) * rate }, ${ a * 0.32 })`);
                rate = 0.1;
                linearGradient.addColorStop(1, `rgba(${ r + (255 - r) * rate }, ${ g + (255 - g) * rate }, ${ b + (255 - b) * rate }, ${ 1 })`);
                ctx.fillStyle = linearGradient;
                ctx.fill();
                result.push({
                    type: 'bar',
                    name: props.legendData[index % props.legendData.length] || '',
                    yAxisIndex: item.yAxisIndex || 0,
                    silent: true,
                    barWidth: 8.8 * props.scale,
                    barGap: `${ 5 / 8.8 * 100 }%`,
                    data: item.data,
                    animation: false,
                    label: {
                        show: true,
                        distance: 0,
                        position: 'top',
                        formatter: '{header|}',
                        offset: [0, 0 * props.scale],
                        rich: {
                            header: {
                                width: 8.8 * props.scale,
                                height: 7 * props.scale,
                                backgroundColor: {
                                    image: canvas
                                }
                            }
                        }
                    },
                    itemStyle: {
                        color: 'transparent'
                    }
                })
            })
            return result;
        })(),
        legend: (() => {
            const legendConfig = {
                show: props.showLegend,
                data: props.legendData.map((name, index) => {
                    return {
                        name,
                        itemStyle: { color: props.color[index % props.color.length] }
                    };
                }),
                icon: 'roundRect',
                top: 0 * props.scale,
                align: 'left',
                textStyle: {
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: 12 * props.scale,
                    fontFamily: 'PingFangSC-Regular',
                    lineHeight: 24 * props.scale,
                    padding: [0, 0, 0, 0].map(n => n * props.scale)
                },
                itemGap: 16 * props.scale,
                itemWidth: 8 * props.scale,
                itemHeight: 8 * props.scale
            };
            return legendConfig;
        })(),
        tooltip: {
            padding: 0,
            confine: true,
            borderWidth: 0,
            borderRadius: 0,
            trigger: 'axis',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    type: 'dashed',
                    color: '#B0D0EE'
                }
            },
            formatter: params => {
                const tooltipTitle = props.tooltipTitle instanceof Array ? props.tooltipTitle[params[0]?.dataIndex] : params[0]?.axisValue;
                return `
                    <div style="background-color: rgba(0, 35, 68, 0.8); padding: ${ 8 * props.scale }px ${ 21 * props.scale }px ${ 13 * props.scale }px; border-radius: 0; border-radius: ${ 5 * props.scale }px;">
                        <h4 style="line-height: ${ 19 * props.scale }px; font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #B0D0EE; font-weight: 400; margin-bottom: ${ 9 * props.scale }px;">
                            ${ tooltipTitle }
                        </h4>
                        <div style="display: grid; grid-template-columns: ${ 6 * props.scale }px min-content min-content; grid-column-gap: ${ 10 * props.scale }px; grid-auto-rows: ${ 19 * props.scale }px; grid-row-gap: ${ 7 * props.scale }px; align-items: center;">
                            ${ params
                                .filter(n => n.seriesType === 'pictorialBar')
                                .map(n => {
                                    const color = props.color[n.seriesIndex % props.color.length];
                                    const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName;
                                    const yAxisIndex = props.seriesData[n.seriesIndex]?.yAxisIndex || 0;
                                    const unit = yAxisName[yAxisIndex % yAxisName.length] || '';
                                    let tooltipTitle;
                                    if (props.tooltipTitle instanceof Array) {
                                        tooltipTitle = props.tooltipTitle[params[0]?.dataIndex];
                                    }
                                    !tooltipTitle && (tooltipTitle = params[0]?.axisValue);
                                    return `
                                        <i style="background-color: ${ color }; height: ${ 6 * props.scale }px; border-radius: 50%;"></i>
                                        <span style="font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #B0D0EE; font-weight: 400;">${ n.seriesName }</span>
                                        <div style="font-family: DINAlternate-Bold; font-size: ${ 18 * props.scale }px; color: #FF9811; font-weight: 700;">
                                            ${ n.data }
                                            <span style="font-family: MicrosoftYaHei; font-size: ${ 14 * props.scale }px; color: #B0D0EE; font-weight: 400;">${ unit }</span>
                                        </div>
                                    `
                                })
                                .join('')}
                        </div>
                    </div>
                `
            }
        }
    };
    let start = 0;
    let end = props.showCount / props.xAxisData.length * 100;
    if (props.showCount) {
        if (props.dataZoomStartAtEnd) {
            start = 100 - end;
            end = 100;
        }
        if (props.dataZoomType === 'slider') {
            option.dataZoom = [
                {
                    end,
                    start,
                    type: 'slider',
                    zoomLock: props.zoomLock,
                    borderWidth: 0,
                    handleIcon: 'none',
                    labelFormatter: '',
                    brushSelect : false,
                    fillerColor: '#467C9F',
                    height: 8 * props.scale,
                    borderColor: 'transparent',
                    bottom: props.dataZoomBottom,
                    handleStyle: { color: 'red' },
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    dataBackground: {
                        lineStyle: { color: 'transparent' },
                        areaStyle: { color: 'transparent' }
                    },
                    selectedDataBackground: {
                        lineStyle: { color: 'transparent' },
                        areaStyle: { color: 'transparent' }
                    }
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
