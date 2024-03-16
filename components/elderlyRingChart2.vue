<template>
    <div class="chart">
        <div class="chart-content" ref="chartRef"></div>
        <div class="center">
            <slot></slot>
        </div>
        <div class="watermark"><i class="corner"></i></div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import * as echarts from 'echarts'
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

const props = defineProps({
    title: {
        type: [String],
        default: () => ''
    },
    radius: {
        type: [Array],
        // default: () => [60, 70]
        default: () => [128, 150]
    },
    itemGap: {
        type: [Number],
        default: () => 4
    },
    seriesData: {
        type: [Array],
        default: () => [61, 52, 97, 99, 80, 77, 80, 67, 83].map((value, index) => ({ value, name: `第${ index + 1 }项` }))
    },
    color: {
        type: [Array],
        default: () => ['#ae7efd', '#7670d7', '#709ad7', '#72dde0', '#d0f1ff', '#b5bfe2', '#206e8a', '#1dd1ff', '#d2abea', '#0e8fff']
    },
    // tooltipTitle: {
    //     type: [String],
    //     default: () => 'tooltip标题'
    // },
    unit: {
        type: [String],
        default: () => ''
    },
    // showLabel: {
    //     type: [Boolean],
    //     default: () => false
    // },
    // 中心部分的展示部分
    // null，'' 或者不传，表示中心部分不显示
    // item 表示中心部分展示单项
    // sum 表示中心部分展示总量
    centerDisplay: {
        type: [String],
        default: () => null
        // default: () => 'item'
        // default: () => 'sum'
        // default: () => 'itemValue'
        // default: () => 'itemPercentage'
    },
    beforeSetOption: {
        type: [Function],
        default: () => null
    },
    afterSetOption: {
        type: [Function],
        default: () => null
    },
    minAngle: {
        type: [Number],
        default: () => 0
    }
});

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
        title: (() => {
            const sum = props.seriesData.reduce((x, y) => x + (Number(typeof y === 'object' ? y?.value : y) || 0), 0);
            const isInteger = parseInt(sum) === sum;
            const titleConfig = {
                show: props.centerDisplay === 'sum',
                text: `{a|${ props.title }}\n{gap0|}\n{b|${ setFixed(sum || 0, isInteger ? 0 : 2) }}\n{gap1|}\n{c|${ props.unit }}`,
                left: 'center',
                top: 'center',
                textStyle: {
                    rich: {
                        a: {
                            color: 'white',
                            fontFamily: 'MicrosoftYaHei-Bold',
                            fontSize: 24 * scale,
                            lineHeight: 31 * scale
                        },
                        gap0: { height: 6 * scale },
                        b: {
                            color: '#F4DC3C',
                            fontFamily: 'DINAlternate-Bold',
                            fontSize: 60 * scale,
                            lineHeight: 70 * scale
                        },
                        gap1: { height: 6 },
                        c: {
                            color: 'white', 
                            fontFamily: 'MicrosoftYaHei-Bold',
                            fontSize: 24 * scale,
                            lineHeight: 31 * scale
                        }
                    }
                }
            };
            return titleConfig;
        })(),
        tooltip: {
            // show: true,
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
                <div style="background-color: #125176; padding: ${ 12 * scale }px; border-radius: 0; border: ${ 2 * scale }px solid rgba(158,202,255,0.40);">
                    ${ props.title ? `<h4 style="font-family: MicrosoftYaHei; font-size: ${ 28 * scale }px; color: #FFFFFF; font-weight: 400; margin-bottom: ${ 8 * scale }px;">${ props.title }</h4>` : '' }
                    <div style="display: grid; grid-auto-rows: ${ 37 * scale }px; grid-row-gap: ${ 8 * scale }px; grid-template-columns: ${ 18 * scale }px ${ 8 * scale }px min-content ${ 12 * scale }px min-content; grid-column-gap: ${ 2 * scale }px ${ 12 * scale }px; align-items: center;">
                        ${
                            (() => {
                                const colors = props.color;
                                const color = colors[param.dataIndex % colors.length];
                                let background;
                                if (typeof color === 'object' && color.type === 'linear') {
                                    const angle = Math.atan((color.y2 - color.y) / (color.x2 - color.x)) / Math.PI * 180 + 90;
                                    const colorStops = [...color.colorStops].sort((x, y) => x.offset - y.offset);
                                    background = `background-image: linear-gradient(${angle}deg, ${ colorStops.map(n => `${ param.color } ${ `${param.offset * 100}%` } `).join(',') })`;
                                } else {
                                    background = `background-color: ${ color }`;
                                }
                                const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName
                                const yAxisIndex = props.seriesData[param.seriesIndex]?.yAxisIndex || 0;
                                let value;
                                if ([null, undefined, '', NaN].includes(param.value)) {
                                    value = '- -'
                                } else {
                                    value = parseInt(param.value) === Number(param.value) ? param.value : setFixed(Number(param.value) || 0, 2);
                                }
                                return `
                                    <i style="${ background }; width: ${ 18 * scale }px; height: ${ 18 * scale }px;"></i>
                                    <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 28 * scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3;">${ param.name }</label>
                                    <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 28 * scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5;">${ value }${ props.unit }</label>
                                `;
                            })()
                        }
                    </div>
                </div>
            `
        },
        series: [
            {
                type: 'pie',
                name: 'pie',
                radius: [
                    props.radius[0] - props.itemGap,
                    props.radius[1] + props.itemGap
                ].map(n => n * scale),
                minAngle: props.minAngle,
                data: props.seriesData.map((value, index) => {
                    typeof value !== 'object' && (value = { value });
                    const color = props.color[index % props.color.length];
                    const labelConfig = { position: 'center' };
                    switch (props.centerDisplay) {
                        case null:
                        case undefined:
                        case '':
                        case 'sum':
                            labelConfig.show = false;
                            break;
                        case 'item':
                            labelConfig.show = false;
                            labelConfig.formatter = param => {
                                const sum = props.seriesData.reduce((x, y) => x + (Number(typeof y === 'object' ? y?.value : y) || 0), 0);
                                const value = setFixed(param.value, 2);
                                const percent = [null, undefined, '', NaN].includes(param.value) ? '' : setFixed(param.value / sum * 100, 2);

                                return `{dot|}{colGap0|}{itemTitle|${ param.name }}\n{rowGap0|}\n{value|${ [null, undefined, '', NaN].includes(value) ? '- -' : value }}{unit|${ props.unit }}\n{rowGap1|}\n{label|占比}{percent|${ [null, undefined, '', NaN].includes(percent) ? '- -' : percent }}{label|%}`
                            };
                            labelConfig.rich = {
                                dot: {
                                    backgroundColor: color,
                                    width: 18 * scale,
                                    height: 18 * scale,
                                    verticalAlign: 'center'
                                },
                                colGap0: { width: 8 * scale },
                                itemTitle: {
                                    color: 'white',
                                    fontFamily: 'MicrosoftYaHei-Bold',
                                    fontSize: 24 * scale,
                                    lineHeight: 24 * scale,
                                    verticalAlign: 'center'
                                },
                                rowGap0: { height: 4 * scale },
                                value: {
                                    color: '#F4DC3C',
                                    fontFamily: 'DINAlternate-Bold',
                                    fontSize: 60 * scale,
                                    lineHeight: 70 * scale,
                                    verticalAlign: 'bottom'
                                },
                                unit: {
                                    color: 'white',
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 24 * scale,
                                    lineHeight: 31 * scale,
                                    padding: [24 * scale, 0, 0]
                                },
                                rowGap1: { height: 0 },
                                label: {
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 24 * scale,
                                    lineHeight: 31 * scale,
                                    verticalAlign: 'bottom'
                                },
                                percent: {
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontFamily: 'MicrosoftYaHei-Bold',
                                    fontSize: 28 * scale,
                                    lineHeight: 37 * scale,
                                    verticalAlign: 'bottom'
                                }
                            };
                            break;
                        case 'itemValue':
                        case 'itemPercentage':
                            labelConfig.show = false;
                            labelConfig.formatter = param => {
                                const unit = props.centerDisplay === 'itemValue' ? props.unit : '%';
                                const value = [null, undefined, '', NaN].includes(param.value) ? '- -' : (props.centerDisplay === 'itemValue' ? param.value : param.percent);
                                return `{dot|}\n{title|${ param.name }}\n{value|${ value }}{unit|${ unit }}`;
                            };
                            labelConfig.rich = {
                                dot: {
                                    backgroundColor: color,
                                    width: 18 * scale,
                                    height: 18 * scale
                                },
                                title: {
                                    color: 'white',
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 24 * scale,
                                    lineHeight: 31 * scale,
                                    padding: [10, 0, 2, 0].map(n => n * scale)
                                },
                                value: {
                                    color: 'rgba(255, 255, 255, 1)',
                                    fontFamily: ' DINAlternate-Bold',
                                    fontSize: 60 * scale,
                                    lineHeight: 70 * scale,
                                    verticalAlign: 'bottom'
                                },
                                unit: {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    fontFamily: 'MicrosoftYaHei',
                                    fontSize: 24 * scale,
                                    lineHeight: 31 * scale,
                                    verticalAlign: 'bottom'
                                }
                            };
                            break;
                    }
                    return {
                        ...value,
                        itemStyle: { color },
                        label: labelConfig,
                        emphasis: {
                            label: { show: ['item', 'itemValue', 'itemPercentage'].includes(props.centerDisplay) }
                        }
                    }
                }),
                labelLine: { show: false },
                // silent: props.centerDisplay === 'sum',
                itemStyle: {
                    borderWidth: props.itemGap,
                    // borderColor: 'rgb(3, 43, 68)',
                    borderColor: 'rgb(27,85,148)'
                },
                emphasis: { scaleSize: 5 * scale }
            }
        ]
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
    // chart.on('mouseover', param => {
    //     console.log(param.dataIndex)
    // })
    // chart.on('mouseout', param => {
    //     console.log(param.dataIndex)
    // })
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
    >.chart-content {
        height: 100%;
    }
    .center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
.watermark {
    z-index: -1;
    position: absolute;
    width: 352 * $remh;
    height: 352 * $remh;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    // @include bgImage('@/assets/imgs/conferenceVersion/img_circularbox.svg');
    &:before, &:after {
        content: '';
        position: absolute;
        width: 245 * $remh;
        height: 245 * $remh;
    }
    &:before {
        left: 0;
        top: 0;
        // background-color: rgb(17,80,148);
        // background-color: #0E8FFF;
        background-color: rgba(255, 255, 255, 0.025);
    }
    &:after {
        right: 0;
        bottom: 0;
        // background-color: rgb(17,80,148);
        // background-color: #0E8FFF;
        background-color: rgba(255, 255, 255, 0.025);
    }
    .corner {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(255, 255, 255, 0.05);
        clip-path: polygon(
            0 0, 60 * $remh 0, 60 * $remh 60 * $remh, 0 60 * $remh,
            0 0, 0 100%,
            0 calc(100% - 60 * $remh), 60 * $remh calc(100% - 60 * $remh), 60 * $remh 100%, 0 100%,
            100% 100%,
            calc(100% - 60 * $remh) 100%, calc(100% - 60 * $remh) calc(100% - 60 * $remh), 100% calc(100% - 60 * $remh), 100% 100%,
            100% 0,
            100% 60 * $remh, calc(100% - 60 * $remh) 60 * $remh, calc(100% - 60 * $remh) 0, 100% 0,
            100% 100%, 0 100%
        );
    }
}
</style>