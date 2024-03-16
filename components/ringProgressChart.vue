<template>
    <div class="ring-progress" ref="ringProgress">
        <div class="ring-label">
            <div class="content" v-if="showLabel">
                <span class="value">{{ (value / rate * 100).toFixed(percentageFixedBit) }}</span>
                <i class="unit">{{ unit }}</i>
            </div>
            <slot></slot>
        </div>
        <div class="ring" ref="chartDom"></div>
    </div>
</template>
<script setup>
import * as echarts from 'echarts'
import { defineProps, computed, ref, watch, onMounted, nextTick } from 'vue'
const props = defineProps({
    // 目标进度
    rate: {
        type: [Number],
        default: function () {
            return 100
        }
    },
    // 当前进度
    value: {
        type: [Number],
        default: function () {
            return 0
        }
    },
    // 圆环内外半径
    radius: {
        type: [Array],
        default: function () {
            return [58, 76]
        }
    },
    // 单位
    unit: {
        type: [String],
        default: function () {
            return '%'
        }
    },
    // 进度条颜色
    color: {
        type: [String],
        default: function () {
            return '#405FFE'
        }
    },
    // 轨道颜色
    layerColor: {
        type: [String],
        default: function () {
            return '#DCDFE8'
        }
    },
    // 是否显示 legend
    showLabel: {
        type: [Boolean],
        default: function () {
            return true
        }
    },
    // 单项的圆角大小
    itemBorderRadius: {
        type: [Number],
        default: function () {
            return 0
        }
    },
    // 是否显示单项的 label
    // showLabel: {
    //     type: [Boolean],
    //     default: function () {
    //         return true
    //     }
    // },
    // 饼图的扇区是否是顺时针排布
    clockwise: {
        type: [Boolean],
        default: function () {
            return true
        }
    },
    // 起始角度，支持范围[0, 360]
    startAngle: {
        type: [Number],
        default: function () {
            return 90
        }
    },
    percentageFixedBit: {
        type: [Number],
        default: function () {
            return 0
        }
    }
})
let chart
const chartDom = ref()
const renderChart = () => {
    if (chart) {
        typeof chart.dispose === 'function' && chart.dispose()
        chart = null
    }
    chart = echarts.init(chartDom.value)
    const option = {
        color: [props.color],
        tooltip: { show: false },
        legend: { show: false },
        // legend: {
        //     show: props.showLegend,
        //     icon: 'circle',
        //     left: 0,
        //     itemHeight: 8,
        //     itemWidth: 8,
        //     padding: [16, 16, 0, 16],
        //     itemGap: 16,
        //     textStyle: {
        //         color: `rgba(${0x3B}, ${0x41}, ${0x55}, 0.7)`,
        //         fontSize: 14,
        //         fontFamily: 'MicrosoftYaHei'
        //     }
        // },
        series: [
            {
                type: 'pie',
                startAngle: props.startAngle,
                radius: props.radius,
                data: [0],
                silent: true,
                label: { show: false },
                itemStyle: { color: props.layerColor },
                center: ['50%', '50%'],
                animation: false
            },
            {
                type: 'pie',
                startAngle: props.startAngle,
                clockwise: props.clockwise,
                label: { show: false },
                radius: props.radius,
                silent: true,
                itemStyle: {
                    borderRadius: props.itemBorderRadius
                },
                data: [
                    props.value,
                    {
                        value: props.rate - props.value,
                        itemStyle: {
                            color: props.layerColor,
                            decal: { symbol: 'none' }
                        },
                        label: { show: false }
                    }
                ],
                center: ['50%', '50%']
            }
        ]
    }
    chart.setOption(option)
}
onMounted(renderChart)
defineExpose({ renderChart })
</script>
<style lang="scss" scoped>
.ring-progress {
    position: relative;
    .ring {
        height: 100%;
    }
    .ring-label {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: minmax(0, 1fr);
        align-items: center;
        justify-items: center;
        .content {
            white-space: nowrap;
            // transform: translate(-50%, -50%);
            // display: inline-block;
            .value {
                font-family: MicrosoftYaHei;
                font-weight: 600;
                opacity: 0.9;
                color: #3B4155;
                font-size: 24px;
            }
            .unit {
                font-family: MicrosoftYaHei;
                opacity: 0.9;
                color: #3B4155;
                font-size: 18px;
            }
        }
    }
}
</style>
