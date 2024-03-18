<template>
    <div class="chart" ref="containerRef">
        <div class="chart-container" ref="chartRef"></div>
        <div class="bar" :style="computeBarStyle()">
            <div class="bar-item" v-for="(n, i) in barSeriesData" :style="`background-color: ${ barColor[i % barColor.length] };`"></div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// import { setFixed } from '@/utils/index'
// 这段不是我写的
const setFixed = (value, toFixedNum = 2) => {
    if (!value) return value
    let flag = ''
    if (Number(value) < 0) {
        flag = '-'
    }
    if (!Math.abs(value)) return flag + value
    // console.log('value', value, String(value).split('.').length)
    if (String(value).split('.').length > 1) {
        // return (value = Number(value).toFixed(toFixedNum))
        const arr = String(value).split('.')
        const integer = Math.abs(arr[0])
        const decimal = arr[1] || '0'
        // console.log('decimal', arr, decimal)
        if (decimal?.length == toFixedNum) return value
        value = Math.abs(value)
        let res = value.toString()
        if (decimal?.length < toFixedNum) {
            for (let i = 0; i < toFixedNum - decimal.length; i += 1) {
                res += '0'
            }
            return flag + res
        }

        res = toFixedNum > 0 ? integer + '.' + decimal?.substr(0, toFixedNum) : integer;
        const last = decimal.substr(toFixedNum, 1);
        // 四舍五入，转换为整数再处理，避免浮点数精度的损失
        if (parseInt(last, 10) >= 5) {
            const x = Math.pow(10, toFixedNum)
            res = (Math.round((parseFloat(res) * x)) + 1) / x
            res = res.toFixed(toFixedNum)
        }
        return flag + res
    }
    return flag + Math.abs(value)
};

let chart;
const chartRef = ref();
const containerRef = ref();

const props = defineProps({
    radius: {
        type: [Array],
        // default: () => [59, 70]
        default: () => [60, 68]
    },
    ringColor: {
        type: [Array],
        default: () => ['#0e8fff', '#00d5ef', '#b5bfe2']
    },
    barColor: {
        type: [Array],
        default: () => ['#206e8a', '#72dde0']
    },
    itemGap: {
        type: [Number],
        default: () => 2
    },
    ringSeriesData: {
        type: [Array],
        default: () => [73, 54, 98]
    },
    barSeriesData: {
        type: [Array],
        default: () => [73, 54, 23, 66]
    },
    beforeSetOption: {
        type: [Function],
        default: () => null
    },
    afterSetOption: {
        type: [Function],
        default: () => null
    },
    barHeight: {
        type: [Number],
        default: () => 120
    },
    lineLength: {
        type: [Number],
        default: () => 34
    },
    unit: {
        type: [String],
        default: () => ''
    }
});

const startAngle = 52
// const startAngle = 75

const scale = window.innerHeight / 1080;

const renderChart = () => {
    if (chart) {
        chart.dispose();
        chart = null;
    }
    chart = echarts.init(chartRef.value);
    const option = {
        legend: {
            show: true,
            top: -1e6
        },
        color: props.ringColor,
        series: [
            {
                type: 'pie',
                startAngle,
                radius: [
                    props.radius[0] - props.itemGap,
                    props.radius[1] + props.itemGap
                ].map(n => n * scale),
                data: [
                    {
                        value: 0
                    },
                    ...props.ringSeriesData].map((value, index) => {
                    value = typeof value === 'object' ? value : { value };
                    return {
                        ...value,
                        // name: `${index}`,
                        itemStyle: {
                            color: props.ringColor[(index - 1) % props.ringColor.length]
                        },
                        emphasis: { disabled: index === 0 },
                        label: { show: index === 0, formatter: '' },
                        labelLine: {
                            show: index === 0,
                            length: 0,
                            length2: props.lineLength * scale,
                            lineStyle: { color: '#687e8c' }
                        }
                    }
                }),
                labelLine: { show: false },
                itemStyle: {
                    borderWidth: props.itemGap * scale,
                    borderColor: 'rgb(3, 43, 68)'
                }
                // emphasis: { scaleSize: 5 },
            }
        ],
        tooltip: {
            trigger: 'item',
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
            formatter: param => `
                <div style="background-color: #125176; padding: ${ 8 * scale }px; border-radius: 0; border: ${ 1 * scale }px solid rgba(102, 255, 255, 0.2);">
                    ${ props.title ? `<h4 style="font-family: MicrosoftYaHei; font-size: ${ 14 * scale }px; color: #FFFFFF; font-weight: 400; margin-bottom: ${ 8 * scale }px;">${ props.title }</h4>` : '' }
                    <div style="display: grid; grid-auto-rows: ${ 19 * scale }px; grid-row-gap: ${ 4 * scale }px; grid-template-columns: ${ 8 * scale }px ${ 8 * scale }px min-content ${ 12 * scale }px min-content; grid-column-gap: ${ 2 * scale }px ${ 12 * scale }px; align-items: center;">
                        ${
                            (() => {
                                const colors = props.ringColor;
                                const color = colors[(param.dataIndex + colors.length - 1) % colors.length];
                                let background;
                                if (typeof color === 'object' && color.type === 'linear') {
                                    const angle = Math.atan((color.y2 - color.y) / (color.x2 - color.x)) / Math.PI * 180 + 90;
                                    const colorStops = [...color.colorStops].sort((x, y) => x.offset - y.offset);
                                    background = `background-image: linear-gradient(${angle}deg, ${ colorStops.map(n => `${ param.color } ${ `${param.offset * 100}%` } `).join(',') })`;
                                } else {
                                    background = `background-color: ${ color }`;
                                }
                                const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName
                                const yAxisIndex = props.ringSeriesData[param.seriesIndex]?.yAxisIndex || 0;
                                let value;
                                if ([null, undefined, '', NaN].includes(param.value)) {
                                    value = '- -'
                                } else {
                                    value = parseInt(param.value) === Number(param.value) ? param.value : setFixed(Number(param.value) || 0, 2);
                                }
                                return `
                                    <i style="${ background }; height: ${ 8 * scale }px;"></i>
                                    <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3;">${ param.name }</label>
                                    <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 14 * scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5;">${ value }${ props.unit }</label>
                                `
                            })()
                        }
                    </div>
                </div>
            `
        }
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
};

const computeBarStyle = () => {
    if (!containerRef.value) {
        return false;
    }
    const style = {
        width: `${ 12 * scale }px`,
        height: `${ 200 * scale }px`,
        height: `${ props.barHeight * scale }px`
    };
    const sum = props.barSeriesData.reduce((x, y) => x + y, 0);
    // style['grid-template-rows'] = sum ? props.barSeriesData.map(n => `minmax(0, ${n || 0}fr)`).join(' ') : `repeat(${ props.barSeriesData.length }, minmax(0, 1fr))`;
    style['grid-template-rows'] = sum ? props.barSeriesData.map(n => `minmax(0, ${n || 0}fr)`).join(' ') : `repeat(${ props.barSeriesData.length }, 0)`;
    const { offsetWidth, offsetHeight } = containerRef.value;
    const left = offsetWidth / 2 + Math.cos(startAngle / 180 * Math.PI) * props.radius[1] * scale + props.lineLength * scale + 9 * scale;
    const top = offsetHeight / 2 - Math.sin(startAngle / 180 * Math.PI) * props.radius[1] * scale - 6 * scale;
    style.top = `${ top }px`;
    style.left = `${ left }px`;
    return style;
};

defineExpose({
    renderChart,
    clearChart: () => chart?.clear()
});
</script>
<style lang="scss" scoped>
$remh: 1px;
.chart {
    position: relative;
    .chart-container {
        width: 100%;
        height: 100%;
    }
    .bar {
        display: grid;
        grid-row-gap: 3 * $remh;
        padding: 3 * $remh;
        position: absolute;
        background-color: #0a3a5f;
        &:before, &:after {
            content: '';
            position: absolute;
            right: -3 * $remh;
            left: -3 * $remh;
            height: 8 * $remh;
            border: 1 * $remh solid #30d5eb;
        }
        &:before {
            top: -3 * $remh;
            border-bottom: none;
        }
        &:after {
            bottom: -3 * $remh;
            border-top: none;
        }
        .bar-item {
        }
    }
}
</style>
