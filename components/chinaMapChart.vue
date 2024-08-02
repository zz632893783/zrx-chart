<template>
    <!-- <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
    <div class="zrx-chart"
        @touchmove="dragMove"
        @mousemove="dragMove"
        @mouseup="dragData.dragMinMax = null"
        @mouseleave="dragData.dragMinMax = null"
    >
        <div class="chart" :id="`zrx-chart-${ randomId }`"></div>
        <div class="range" ref="rangeRef" :style="`left: ${ 40 * scale }px;  bottom: ${ 40 * scale }px; width: ${ 11 * scale }px; height: ${ 54 * scale }px;`">
            <div class="color-bar" :style="computeColorBarStyle()"></div>
            <div class="rule" :style="` width: ${ 4 * scale }px; transform: translate(${ -8 * scale }px, 0); grid-template-rows: repeat(6, ${ 1 * scale }px); border-right: ${ 1 * scale }px solid #E5E7EA;`"><i class="tick" v-for="(n, i) in 6" :key="i"></i></div>
            <span class="max-value" @touchstart="dragStart($event, 'max')" @mousedown="dragStart($event, 'max')" :style="computeRangeNumberPosition('max')">{{ Number(dragData.max).toFixed(0) }}</span>
            <span class="min-value" @touchstart="dragStart($event, 'min')" @mousedown="dragStart($event, 'min')" :style="computeRangeNumberPosition('min')">{{ Number(dragData.min).toFixed(0) }}</span>
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';
import { computeColorRGBA } from '../utils/index.js';
import chinaJson from '../utils/china.json';
echarts.registerMap('china', chinaJson);
// 以下这串字符串为特殊字符串，用于指定组件自动生成的 “属性.vue” 说明文件中，每列列宽
/* @attribute-template-columns: minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 3fr); */
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
// 图表实例
let chart;
// 图表 dom 对象
// const chartRef = ref();
const rangeRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 值区间
     * @example [100, 200]
     */
    range: {
        type: [Array],
        default: () => [0, 100]
    },
    /**
     * @description 区间颜色
     * @example ['red', 'green', 'blue']
     */
    rangeColor: {
        type: [Array],
        default: () => ['#0055FF', '#65F1B6', '#FFD655', '#FF9512']
    },
    /**
     * @description 数据数组
     * @example [
     *     { name: '浙江', value: 50 },
     *     { name: '江苏', value: 75 },
     *     { name: '上海', value: 100 }
     * ]
     */
    seriesData: {
        type: [Array],
        default: () => ([
            { name:'黑龙江省', value: 50 },
            { name:'浙江省', value: 15 },
            { name:'四川省', value: 75 },
            { name:'江苏省', value: 100 },
            { name:'安徽省', value: 0 },
            { name:'云南省', value: -10 },
            { name:'广东省', value: 110 }
        ])
    },
    /**
     * @description 中心位置的经纬度
     * @example [104, 35]
     */
    centerLngLat: {
        type: [Array],
        default: () => ([104, 35])
    },
    /**
     * @description 当前视角的缩放比例
     * @example 1.4
     */
    zoom: {
        type: [Number],
        default: () => 1.5
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
// 拖拽相关数据
const dragData = ref({
    // null 表示当前未拖拽元素，'min' 表示当前拖拽最小值, 'max' 表示当前拖拽最大值
    dragMinMax: null,
    min: Math.min(...props.range),
    max: Math.max(...props.range),
    // clientX: 0,
    clientY: 0
});
// 计算区间颜色条的样式
const computeColorBarStyle = () => {
    const min = (dragData.value.min - Math.min(...props.range)) / (Math.max(...props.range) - Math.min(...props.range)) * 100;
    const max = (dragData.value.max - Math.min(...props.range)) / (Math.max(...props.range) - Math.min(...props.range)) * 100;
    return {
        backgroundImage: `linear-gradient(0deg, ${ props.rangeColor.join(', ') })`,
        maskImage: `linear-gradient(0deg, transparent ${ min }%, red ${ min }%, red ${ max }%, transparent ${ max }%)`
    }
};
// 拖拽事件
const dragMove = event => {
    // const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
    const clientY = event.type === 'touchmove' ? event.touches[0].clientY : event.clientY;
    if (!dragData.value.dragMinMax) {
        return false;
    }
    if (dragData.value.dragMinMax === 'max') {
        let max = dragData.value.max + (dragData.value.clientY - clientY) / rangeRef.value?.offsetHeight * (Math.max(...props.range) - Math.min(...props.range));
        max > Math.max(...props.range) && (max = Math.max(...props.range));
        // max < Math.min(...props.range) && (max = Math.min(...props.range));
        max < dragData.value.min && (max = dragData.value.min);
        dragData.value.max = max;
    } else {
        let min = dragData.value.min + (dragData.value.clientY - clientY) / rangeRef.value?.offsetHeight * (Math.max(...props.range) - Math.min(...props.range));
        min < Math.min(...props.range) && (min = Math.min(...props.range));
        // min > Math.max(...props.range) && (min = Math.max(...props.range));
        min > dragData.value.max && (min = dragData.value.max);
        dragData.value.min = min;
    }
    // dragData.value.clientX = clientX;
    dragData.value.clientY = clientY;
    event.preventDefault();
    event.stopPropagation();
};
// 计算最大值，最小值的位置
const computeRangeNumberPosition = (minmax) => {
    let top;
    if (minmax === 'max') {
        const max = dragData.value.max > Math.max(...props.range) ? Math.max(...props.range) : dragData.value.max;
        top = (Math.max(...props.range) - max) / (Math.max(...props.range) - Math.min(...props.range)) * rangeRef.value?.offsetHeight;
        ;
    } else {
        const min = dragData.value.min < Math.min(...props.range) ? Math.min(...props.range) : dragData.value.min;
        top = (Math.max(...props.range) - min) / (Math.max(...props.range) - Math.min(...props.range)) * rangeRef.value?.offsetHeight;
    }
    return {
        top: `${ top }px`,
        fontSize: `${ 10 * props.scale }px`,
        lineHeight: `${ 10 * props.scale }px`,
        paddingRight: `${ 22 * props.scale }px`
    };
};
// 拖拽开始
const dragStart = (event, minmax) => {
    const clientY = event.type === 'touchstart' ? event.touches[0].clientY : event.clientY;
    dragData.value.clientY = clientY;
    dragData.value.dragMinMax = minmax;
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
        series:  [
            {
                name: '中国',
                type: 'map',
                mapType: 'china',
                center: props.centerLngLat,
                zoom: props.zoom,
                // selectedMode : 'multiple',
                label: {
                    show: false,
                    color: 'transparent'
                    // emphasis: { show: false }
                },
                emphasis: {
                    // disabled: true,
                    label: {
                        show: false
                        // color: 'transparent'
                    },
                    itemStyle: {
                        areaColor: 'rgb(247, 248, 250)',
                        borderColor: 'rgb(200, 201, 204)'
                    }
                },
                itemStyle: {
                    areaColor: 'rgb(247, 248, 250)',
                    borderColor: 'rgb(200, 201, 204)',
                    borderWidth: 1 * props.scale,
                },
                select: {
                    disabled: true
                },
                data: props.seriesData.map(({ name, value }) => {
                    const min = Math.min(...props.range);
                    const max = Math.max(...props.range);
                    const v = value < min ? min : (value > max ? max : value);
                    let r, g, b, a;
                    for (let index = 0; index < props.rangeColor.length - 1; index++) {
                        const start = min + (max - min) / (props.rangeColor.length - 1) * index;
                        const end = min + (max - min) / (props.rangeColor.length - 1) * (index + 1);
                        if (v >= start && v <= end) {
                            const offsetPrecent = (v - start) / (end - start);
                            const startColor = computeColorRGBA(props.rangeColor[index]);
                            const endColor = computeColorRGBA(props.rangeColor[index + 1]);
                            r = startColor.r + (endColor.r - startColor.r) * offsetPrecent;
                            g = startColor.g + (endColor.g - startColor.g) * offsetPrecent;
                            b = startColor.b + (endColor.b - startColor.b) * offsetPrecent;
                            a = startColor.a + (endColor.a - startColor.a) * offsetPrecent;
                            break;
                        }
                    }
                    return {
                        name,
                        value,
                        emphasis: {
                            itemStyle: {
                                borderWidth: 1 * props.scale,
                                areaColor: `rgba(${ r }, ${ g }, ${ b }, ${ a * 0.5 })`,
                                borderColor: `rgba(${ r }, ${ g }, ${ b }, ${ a })`,
                            }
                        }
                    }
                })
            }
        ]
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
    computeHighlightData();
    return chart;
};
// 拖拽左侧区域条的时候，需要阻止默认触摸事件
const preventTouchMove = event => (event.target === rangeRef.value || rangeRef.value.contains(event.target)) && event.preventDefault();
// 阻止默认触摸事件
document.addEventListener('touchmove', preventTouchMove, { passive: false });
// 离开页面时解绑触摸事件
onBeforeUnmount(() => document.removeEventListener('touchmove', preventTouchMove, { passive: false }));
// 高亮区间范围内的项
const computeHighlightData = () => {
    const highlightDataIndex = [];
    const downplayDataIndex = [];
    props.seriesData.forEach((n, i) =>
        n.value >= dragData.value.min && n.value <= dragData.value.max
            ? highlightDataIndex.push(i)
            : downplayDataIndex.push(i)
    );
    chart?.dispatchAction({ type: 'highlight', dataIndex: highlightDataIndex });
    chart?.dispatchAction({ type: 'downplay', dataIndex: downplayDataIndex });
};
// 监听区域值的变化
watch(() => dragData.value.min, computeHighlightData);
watch(() => dragData.value.max, computeHighlightData);

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped>
.zrx-chart {
    position: relative;
    .chart {
        width: 100%;
        height: 100%;
    }
    .range {
        position: absolute;
        background-color: rgb(247, 248, 250);
        .color-bar {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
        .rule {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            display: grid;
            align-content: space-between;
            .tick {
                left: 0;
                background-color: #E5E7EA;
            }
        }
        .max-value, .min-value {
            position: absolute;
            right: 0;
            color: black;
            font-family: 'PingFangSC-Regular';
            color: #323233;
            letter-spacing: 0;
            font-weight: 400;
            cursor: pointer;
            transform: translate(0, -50%);
        }
    }
}
</style>