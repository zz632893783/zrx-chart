<template>
    <!-- <div class="zrx-chart" :id="`zrx-chart-${ randomId }`" ref="chartRef"></div> -->
    <div class="zrx-chart" :id="`zrx-chart-${ randomId }`"></div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
import chinaJson from '../utils/china.json';
echarts.registerMap('china', chinaJson);
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
// 渲染函数
const renderChart = () => {
    if (chart) {
        chart.dispose();
        chart = null;
    }
    // chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value);
    chart = echarts.init(document.getElementById(`zrx-chart-${ randomId }`));
    const option = {
        visualMap: {
            type: 'continuous',
            min: Math.min(...props.range),
            max: Math.max(...props.range),
            left: 16 * props.scale,
            bottom: 34 * props.scale,
            // top: 'bottom',
            calculable: true,
            itemWidth: 10 * props.scale,
            itemHeight: 54 * props.scale,
            // seriesIndex: [1],
            inRange: {
                color: props.rangeColor
            },
            padding: 0,
            align: 'right',
            textGap: 0,
            handleStyle: {
                opacity: 0,
                color: 'red',
                borderColor: 'red'
            },
            handleSize: '100%',
            textStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: 10 * props.scale,
                color: '#323233',
                lineHeight: 10 * props.scale,
                fontWeight: 400,
            },
            outOfRange: {
                color: 'rgb(247, 247, 250)'
            },
            // backgroundColor: 'red',
            indicatorStyle: {
                color: 'yellow'
            }
        },
        // geo: {
        //     show: true,
        //     map: '中国',
        //     label: {
        //         normal: {
        //             show: false
        //         },
        //         emphasis: {
        //             show: false,
        //         }
        //     },
        //     roam: false,
        //     itemStyle: {
        //         normal: {
        //             areaColor: '#023677',
        //             borderColor: '#1180c7',
        //         },
        //         emphasis: {
        //             areaColor: '#4499d0',
        //         }
        //     }
        // },
        // grid: (() => {
        //     // 默认间距
        //     const grid = { top: 84, right: 58, bottom: 56, left: 106 };
        //     // 根据输入值更新间距
        //     for (const k in grid) {
        //         props.grid[k] !== undefined && (grid[k] = props.grid[k]);
        //         grid[k] = grid[k] * props.scale;
        //     }
        //     return grid;
        // })(),
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
                    label: {
                        color: 'transparent'
                    },
                    itemStyle: {
                        areaColor: 'rgb(247, 248, 250)',
                        borderColor: 'rgb(200, 201, 204)'
                    }
                },
                itemStyle: {
                    areaColor: 'rgb(247, 248, 250)',
                    borderColor: 'rgb(200, 201, 204)'
                },
                select: {
                    disabled: true
                },
                data: props.seriesData
            }
        ]
    };
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option);
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
    return chart;
};

defineExpose({ renderChart, clearChart: () => chart?.clear() });
</script>
<style lang="scss" scoped></style>