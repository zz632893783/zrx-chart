<template>
    <!-- <div class="zrx-chart" ref="containerRef">
        <div class="chart" ref="chartRef"></div>
        <canvas class="bg" ref="canvasRef"></canvas>
    </div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef">
        <div class="chart"></div>
        <canvas class="bg"></canvas>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
import { computeColorRGBA } from '../utils/index.js';
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表对象
let chart = null;
// 图表 dom 对象
const chartRef = ref();
// canvas 背景 dom 对象
// const canvasRef = ref();
// 外侧容器 dom 对象
// const containerRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 指示器轴的分割段数。
     * @example 5
     */
    splitNumber: {
        type: [Number],
        default: () => 5
    },
    /**
     * @description 轴的半径
     * @example 90
     */
    radius: {
        type: [Number],
        default: () => 90
    },
    /**
     * @description 雷达图的指示器，用来指定雷达图中的多个变量（维度），如下示例
     * @example [
     *     { name: '经营情况', max: 10 },
     *     { name: '发展潜力', max: 10 },
     *     { name: '管理能力', max: 10 },
     *     { name: '贡献能力', max: 10 },
     *     { name: '能效水平', max: 10 }
     * ]
     */
    indicator: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 雷达图的指示器文字颜色
     * @example 'red'
     */
    indicatorColor: {
        type: [String],
        default: () => 'white'
    },
    /**
     * @description 雷达图的指示器字号
     * @example 32
     */
    indicatorFontSize: {
        type: [Number],
        default: () => 16
    },
    /**
     * @description 雷达图的指示器文字与图标的间距
     * @example 16
     */
    indicatorNameGap: {
        type: [Number],
        default: () => 16
    },
    /**
     * @description 数据项
     * @example [[4, 2, 1, 5, 3], [2, 1, 5, 3, 3]]
     */
    seriesData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description legend 数据
     * @example ['总能耗', '能耗照明']
     */
    legendData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 预设颜色
     * @example ['red', 'green', 'blue']
     */
    color: {
        type: [Array],
        default: () => ['rgb(48, 213, 235)']
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
    createRadarBg();
    if (chart) {
        typeof chart.dispose === 'function' && chart.dispose();
        chart = null;
    }
    // chart = echarts.init(chartRef.value);
    // chart = echarts.init(document.querySelector(`#zrx-chart-${ randomId } .chart`));
    chart = echarts.init((document.querySelector(`#zrx-chart-${ randomId }`) || chartRef.value).querySelector('.chart'));
    const option = {
        radar: {
            radius: props.radius,
            indicator: props.indicator.map(n => {
                return {
                    name: n.name,
                    max: n.max
                }
            }),
            splitArea: { show: false },
            splitLine: { show: false },
            axisLine: {
                // show: false
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            axisName: {
                color: props.indicatorColor,
                fontSize: props.indicatorFontSize
            },
            nameGap: props.indicatorNameGap
        },
        series: {
            type: 'radar',
            data: props.seriesData.map((group, index) => {
                const color = props.color[index % props.color.length];
                const { r, g, b, a } = computeColorRGBA(color);
                return {
                    value: group,
                    name: props.legendData[props.legendData.length % index] || '',
                    itemStyle: {
                        color: props.color[index % props.color.length]
                    },
                    areaStyle: {
                        color: `rgba(${ r }, ${ g }, ${ b }, ${ a * 0.7 })`
                    }
                }
            }),
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                borderColor: 'white',
                borderWidth: 1
            },
            lineStyle: { width: 1 }
        }
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};
// 绘制雷达图背景
const createRadarBg = async () => {
    const canvas = (document.querySelector(`#zrx-chart-${ randomId }`) || chartRef.value).querySelector('canvas.bg');
    canvas.width = (document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value).offsetWidth;
    canvas.height = (document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value).offsetHeight;
    await Promise.resolve();
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 1;
    const offsetAngle = 0;
    for (let j = 1; j <= props.splitNumber; j++) {
        let maxDistance = 0
        for (let i = 0; i < props.indicator.length; i++) {
            const angle = offsetAngle + (360 / props.indicator.length) * i
            const x = Math.cos(angle / 180 * Math.PI) * props.radius / props.splitNumber * j + canvas.width / 2
            const y = Math.sin(angle / 180 * Math.PI) * props.radius / props.splitNumber * j + canvas.height / 2
            const distance = Math.pow(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2), 1 / 2)
            maxDistance = maxDistance < distance ? distance : maxDistance
        }
        const startAngle = -29 - 90 + 180
        const endAngle = -29 - 90
        const x1 = Math.cos(startAngle / 180 * Math.PI) * maxDistance + canvas.width / 2
        const y1 = Math.sin(startAngle / 180 * Math.PI) * maxDistance + canvas.height / 2
        const x2 = Math.cos(endAngle / 180 * Math.PI) * maxDistance + canvas.width / 2
        const y2 = Math.sin(endAngle / 180 * Math.PI) * maxDistance + canvas.height / 2
        const linearGradient = ctx.createLinearGradient(x1, y1, x2, y2)
        linearGradient.addColorStop(0, 'rgba(11, 20, 65, 0)')
        linearGradient.addColorStop(1, 'rgba(202, 237, 242, 0.14)')
        ctx.beginPath()
        for (let i = 0; i < props.indicator.length; i++) {
            const angle = offsetAngle + (360 / props.indicator.length) * i - 90
            const x = Math.cos(angle / 180 * Math.PI) * props.radius / props.splitNumber * j + canvas.width / 2
            const y = Math.sin(angle / 180 * Math.PI) * props.radius / props.splitNumber * j + canvas.height / 2
            ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y)
        }
        ctx.closePath()
        ctx.fillStyle = linearGradient
        ctx.fill()
        ctx.strokeStyle = 'rgba(130, 188, 238, 0.14)'
        ctx.lineWidth = 1
        ctx.stroke()
    }
};
// 暴露渲染，清除方法
defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped>
.zrx-chart {
    position: relative;
    .chart {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 1;
    }
    .bg {
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>