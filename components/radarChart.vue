<template>
    <div class="zrx-chart" ref="containerRef">
        <div class="chart" ref="chartRef"></div>
        <canvas class="bg" ref="canvasRef"></canvas>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
// 图表对象
let chart = null;
// 图表 dom 对象
const chartRef = ref();
// canvas 背景 dom 对象
const canvasRef = ref();
// 外侧容器 dom 对象
const containerRef = ref();
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
     * @description 数据项
     * @example [4, 2, 1, 5, 3]
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
    }
});
// 渲染函数
const renderChart = () => {
    createRadarBg();
    if (chart) {
        typeof chart.dispose === 'function' && chart.dispose();
        chart = null;
    }
    chart = echarts.init(chartRef.value);
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
                color: 'rgba(255, 255, 255, 0.75)'
            }
        },
        series: {
            type: 'radar',
            data: props.seriesData.map((group, index) => {
                return {
                    value: group,
                    name: props.legendData[props.legendData.length % index] || ''
                }
            }),
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                color: 'rgb(48, 213, 235)',
                borderColor: 'white',
                borderWidth: 1
            },
            lineStyle: {
                width: 1
            },
            areaStyle: {
                color: 'rgba(48, 213, 235, 0.3)'
            }
        }
    };
    chart.setOption(option);
};
// 绘制雷达图背景
const createRadarBg = async () => {
    canvasRef.value.width = containerRef.value.offsetWidth;
    canvasRef.value.height = containerRef.value.offsetHeight;
    await Promise.resolve();
    const ctx = canvasRef.value.getContext('2d');
    ctx.lineWidth = 1;
    const offsetAngle = 0;
    for (let j = 1; j <= props.splitNumber; j++) {
        let maxDistance = 0
        for (let i = 0; i < props.indicator.length; i++) {
            const angle = offsetAngle + (360 / props.indicator.length) * i
            const x = Math.cos(angle / 180 * Math.PI) * props.radius / props.splitNumber * j + canvasRef.value.width / 2
            const y = Math.sin(angle / 180 * Math.PI) * props.radius / props.splitNumber * j + canvasRef.value.height / 2
            const distance = Math.pow(Math.pow(x - canvasRef.value.width / 2, 2) + Math.pow(y - canvasRef.value.height / 2, 2), 1 / 2)
            maxDistance = maxDistance < distance ? distance : maxDistance
        }
        const startAngle = -29 - 90 + 180
        const endAngle = -29 - 90
        const x1 = Math.cos(startAngle / 180 * Math.PI) * maxDistance + canvasRef.value.width / 2
        const y1 = Math.sin(startAngle / 180 * Math.PI) * maxDistance + canvasRef.value.height / 2
        const x2 = Math.cos(endAngle / 180 * Math.PI) * maxDistance + canvasRef.value.width / 2
        const y2 = Math.sin(endAngle / 180 * Math.PI) * maxDistance + canvasRef.value.height / 2
        const linearGradient = ctx.createLinearGradient(x1, y1, x2, y2)
        linearGradient.addColorStop(0, 'rgba(11, 20, 65, 0)')
        linearGradient.addColorStop(1, 'rgba(202, 237, 242, 0.14)')
        ctx.beginPath()
        for (let i = 0; i < props.indicator.length; i++) {
            const angle = offsetAngle + (360 / props.indicator.length) * i - 90
            const x = Math.cos(angle / 180 * Math.PI) * props.radius / props.splitNumber * j + canvasRef.value.width / 2
            const y = Math.sin(angle / 180 * Math.PI) * props.radius / props.splitNumber * j + canvasRef.value.height / 2
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