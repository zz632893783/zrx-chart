<template>
    <div class="zrx-chart" ref="chartRef"></div>
</template>
<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';
const emit = defineEmits(['clickColumn']);
// 图表实例
let chart;
// 图表 dom 对象
const chartRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description x 轴坐标
     * @example ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月']
     */
    xAxisData: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 上下左右边距
     * @example { top: 84, right: 18, bottom: 56, left: 56 }
     */
    grid: {
        type: [Object],
        default: () => ({
            top: 109,
            right: 70,
            bottom: 80,
            left: 90
        })
    },
    /**
     * @description 数据数组
     * @example [
     *     {
     *         // 需要指定类型
     *         type: 'bar',
     *         // 需要指定 y 轴索引
     *         yAxisIndex: 0,
     *         data: [163, 129, 123, 198, 152, 152, 178]
     *     },
     *     {
     *         type: 'line',
     *         yAxisIndex: 1,
     *         data: [81, 17, 30, 94, 45, 54, 60]
     *     }
     * ]
     */
    seriesData: {
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
     * @description 最多显示的数量（实际显示数量会根据输入值调整）
     * @example 3
     */
    showCount: {
        type: [Number],
        default: () => 5
    },
    /**
     * @description 何种方式拖动 inside 内容区域拖动，slider 滑块拖动
     * @example 'slider'
     */
    dataZoomType: {
        type: [String],
        default: () => 'slider'
    },
    /**
     * @description 当 dataZoomType 为 slider 时，拖动区域距离底部的距离
     * @example 16
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
     * @description 是否显示 legend
     * @example false
     */
    showLegend: {
        type: [Boolean],
        default: () => true
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
     * @description 图表项颜色
     * @example ['blue', 'yellow', 'grey']
     */
    color: {
        type: [Array],
        default: () => ['blue', 'yellow', 'grey']
    },
    /**
     * @description 线条是否显示区域颜色
     * @example true
     */
    showLineArea: {
        type: [Boolean],
        default: () => false
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
     * @description 高亮区域的索引
     * @example [2, 4]
     */
    xAxisHighlightArea: {
        type: [Array],
        default: () => []
    },
    /**
     * @description 是否平滑
     * @example true
     */
    smooth: {
        type: [Boolean, Number],
        default: () => false
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
// legend 图标映射
const legendIconMap = {
    line: 'path://M8,16A8,8,0,0,0,24,16L21,16A5,5,0,0,1,11,16M8,16A8,8,0,1,1,24,16L21,16A5,5,0,1,0,11,16M0,15L8,15L8,17L0,17M32,15L24,15L24,17L32,17',
    bar: 'path://M8,8L24,8L24,24L8,24ZM0,0L32,32M32,0L0,32'
};
// 默认颜色映射
const colorMap = {
    blue: {
        legend: '#2e9dff',
        barArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: '#1260C4' },
                { offset: 1, color: '#3db0fe' }
            ]
        },
        line: '#2e9dff',
        lineArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: 'rgba(249, 159, 42, 0.5)' },
                { offset: 1, color: 'rgba(249, 159, 42, 0)' }
            ]
        },
        tooltip: '#2e9dff'
    },
    yellow: {
        legend: '#f4dc3c',
        barArea: '#f4dc3c',
        tooltip: '#f4dc3c',
        line: '#f4dc3c',
        lineArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: 'rgba(249, 159, 42, 0.5)' },
                { offset: 1, color: 'rgba(249, 159, 42, 0)' }
            ]
        }
    },
    grey: {
        legend: '#B5BFE2',
        barArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: '#89B9EF' },
                { offset: 1, color: '#D0F1FF' }
            ]
        },
        tooltip: '#B5BFE2',
        line: '#B5BFE2',
        lineArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: 'rgba(181, 191, 226, 0.5)' },
                { offset: 1, color: 'rgba(181, 191, 226, 0)' }
            ]
        }
    },
    green: {
        legend: '#00FF81',
        barArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: '#13BE68' },
                { offset: 1, color: '#62FFC5' }
            ]
        },
        tooltip: '#00FF81',
        line: '#00FF81',
        lineArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: 'rgba(0, 255, 129, 0.5)' },
                { offset: 1, color: 'rgba(0, 255, 129, 0)' }
            ]
        }
    },
    celeste: {
        legend: '#66FFFF',
        barArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: '#2BDEDE' },
                { offset: 1, color: '#9FFAFA' }
            ]
        },
        tooltip: '#66FFFF',
        line: '#66FFFF',
        lineArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: 'rgba(102, 255, 255, 0.5)' },
                { offset: 1, color: 'rgba(102, 255, 255, 0)' }
            ]
        }
    },
    pink: {
        legend: '#D28493',
        barArea: '#D28493',
        tooltip: '#D28493',
        line: '#D28493',
        lineArea: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                { offset: 0, color: 'rgba(210, 132, 147, 0.5)' },
                { offset: 1, color: 'rgba(210, 132, 147, 0)' }
            ]
        }
    },
    violet: {
        legend: '#756fd6',
        barArea: '#756fd6',
        tooltip: '#756fd6',
        line: '#756fd6'
    }
};
// 渲染函数
const renderChart = () => {
    if (chart) {
        chart.dispose();
        chart = null;
    }
    chart = echarts.init(chartRef.value);
    const option = {
        grid: (() => {
            const grid = { top: 109, right: 70, bottom: 80, left: 90 };
            for (const k in grid) {
                props.grid[k] !== undefined && (grid[k] = props.grid[k]);
                grid[k] = grid[k] * props.scale;
            }
            return grid;
        })(),
        tooltip: {
            trigger: 'axis',
            confine: true,
            backgroundColor: 'transparent',
            padding: 0,
            borderRadius: 0,
            borderWidth: 0,
            borderColor: 'transparent',
            axisPointer: {
                type: 'line',
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.6)',
                    type: 'solid'
                }
            },
            formatter: params => {
                let tooltipTitle;
                if (props.tooltipTitle instanceof Array) {
                    tooltipTitle = props.tooltipTitle[params[0]?.dataIndex];
                }
                !tooltipTitle && (tooltipTitle = params[0]?.axisValue);
                return `
                    <div style="background-color: #124776; padding: ${16 * props.scale}px; border-radius: 0; border: ${ 2 * props.scale }px solid rgba(158, 202, 255, 0.4); box-shadow: 0 ${6 * props.scale}px ${24 * props.scale}px ${2 * props.scale}px rgba(3, 28, 45, 0.8);">
                        <h4 style="font-family: MicrosoftYaHei; font-size: ${28 * props.scale}px; color: #FFFFFF; font-weight: 700;">${tooltipTitle}</h4>
                        <div style="display: grid; grid-auto-rows: ${37 * props.scale}px; grid-row-gap: ${8 * props.scale}px; grid-template-columns: ${ 32 * props.scale }px min-content min-content; grid-column-gap: ${4 * props.scale}px ${12 * props.scale}px; align-items: center; margin-top: ${8 * props.scale}px;">
                            ${ params
                                .slice(0, params.length - 1)
                                .map(n => {
                                    const colorName = props.color[n.seriesIndex % props.color.length];
                                    // const colors = props.tooltipColors || props.itemColors;
                                    // const color = colors[n.seriesIndex % colors.length];
                                    const color = colorMap[colorName]?.tooltip || colorName;
                                    const yAxisName = typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName;
                                    const yAxisIndex = props.seriesData[n.seriesIndex]?.yAxisIndex || 0;
                                    const unit = yAxisName[yAxisIndex % yAxisName.length] || '';
                                    const svgPath = legendIconMap[n.seriesType || 'bar']
                                        .replace('path://', '')
                                        .replace(/(?<!(a|A)(-?\d+(\.\d+)?,){3,4})-?\d+(\.\d+)?/g, s => s * props.scale);
                                    return `
                                        <i style="height: ${32 * props.scale}px; position: relative; overflow: hidden;">
                                            <svg viewbox="0 0 ${32 * props.scale} ${32 * props.scale}" width="${32 * props.scale}" height="${ 32 * props.scale }" style="filter: drop-shadow(${32 * props.scale}px 0 0 ${color}); margin-left: ${ -32 * props.scale }px; position: absolute; top: 0; left: 0;">
                                                <path d="${svgPath}"></path>
                                            </svg>
                                        </i>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 28 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 3; margin-left: ${6 * props.scale}px; display: ${ n.seriesName ? 'block' : 'none' };">${ n.seriesName }</label>
                                        <label style="white-space: nowrap; font-family: MicrosoftYaHei; font-size: ${ 28 * props.scale }px; color: #FFFFFF; font-weight: 400; grid-column-start: 5; margin-left: ${6 * props.scale}px;">${ [null, undefined, '', NaN].includes(n.value) ? '- -' : n.value }${unit}</label>
                                    `
                                })
                                .join('')}
                        </div>
                    </div>
                `
            }
        },
        xAxis: [
            {
                type: 'category',
                data: props.xAxisData,
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        width: 2 * props.scale,
                        color: '#427597'
                    }
                },
                axisLabel: {
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: 27 * props.scale,
                    color: `rgba(${255}, ${255}, ${255}, 0.8)`,
                    margin: 8 * props.scale,
                    lineHeight: 38 * props.scale
                },
                nameGap: 0
                // splitArea: {
                //     show: true,
                //     interval: 0,
                //     areaStyle: {
                //         color: props.xAxisData.map((n, i) => props.xAxisHighlightArea.includes(i) ? 'rgba(14, 143, 255, 0.2)' : 'transparent')
                //     }
                // }
            },
            {
                type: 'category',
                data: props.xAxisData.map((n, i) => ''),
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        width: 2 * props.scale,
                        color: '#427597'
                    }
                },
                axisLabel: { show: false }
            }
        ],
        yAxis: [
            ...(typeof props.yAxisName === 'string' ? [props.yAxisName] : props.yAxisName).map((name, index) => {
                return {
                    type: 'value',
                    alignTicks: props.yAxisName instanceof Array && props.yAxisName.length > 1,
                    name,
                    max: value => {
                        const valueArr = props.markLine.filter(i => i.yAxisIndex == index).map(i => i.value);
                        const maxV = Math.max(...[valueArr]);
                        if (value.max < maxV) {
                            return maxV;
                        }
                    },
                    nameTextStyle: {
                        fontFamily: 'MicrosoftYaHei',
                        fontSize: 28 * props.scale,
                        // color: '#ccd4da',
                        color: `rgba(${255}, ${255}, ${255}, 0.8)`,
                        padding: [
                            [0, 40, 20, 0],
                            [0, 0, 20, 42]
                        ][index].map(n => n * props.scale)
                    },
                    splitNumber: 3,
                    splitLine: {
                        lineStyle: {
                            width: 2 * props.scale,
                            color: '#427597',
                            type: [4, 4] // 'dashed'
                        }
                    },
                    axisLabel: {
                        fontFamily: 'MicrosoftYaHei',
                        fontSize: 28 * props.scale,
                        color: `rgba(${255}, ${255}, ${255}, 0.8)`,
                        margin: 10 * props.scale
                    }
                }
            }),
            {
                type: 'value',
                alignTicks: true,
                max: 1,
                min: 0,
                axisLabel: { show: false },
                splitLine: { show: false }
            }
        ],
        series: (() => {
            // 如果柱状图和折线图都存在，柱状图的数值显示在底部
            const typeList = props.seriesData.map(i => i.type);
            const insideBottomFlag = typeList.includes('line') && typeList.includes('bar');
            const series = props.seriesData.map((seriesItem, seriesIndex) => {
                const colorName = props.color[seriesIndex % props.color.length];
                const type = seriesItem.type || 'bar';
                const seriesOption = {
                    type,
                    name: props.legendData[seriesIndex % props.legendData.length] || '',
                    data: seriesItem.data || [],
                    yAxisIndex: seriesItem.yAxisIndex || 0
                };
                if (seriesOption.type === 'bar') {
                    seriesOption.barWidth = 48 * props.scale;
                    seriesOption.barGap = `${(12 / 48) * 100}%`;
                    seriesOption.itemStyle = { color: colorMap[colorName]?.barArea || colorName };
                    seriesOption.label = {
                        show: true,
                        fontFamily: 'DINAlternate-Bold',
                        fontSize: 28 * props.scale,
                        color: 'white',
                        position: insideBottomFlag ? 'insideBottom' : 'inside',
                        textShadowBlur: 4 * props.scale,
                        textShadowOffsetX: 0,
                        textShadowOffsetY: 2 * props.scale,
                        textShadowColor: 'rgba(0, 0, 0, 0.50)'
                    };
                    seriesOption.showBackground = true;
                    seriesOption.backgroundStyle = { color: `rgba(${0x2e}, ${0x9d}, ${0xff}, 0.1)` };
                }
                if (seriesOption.type === 'line') {
                    seriesOption.smooth = props.smooth;
                    seriesOption.symbol = 'circle';
                    seriesOption.symbolSize = 14 * props.scale;
                    seriesOption.itemStyle = {
                        color: '#0D3A6B',
                        borderColor: colorMap[colorName]?.line || colorName,
                        borderWidth: 4 * props.scale
                    };
                    seriesOption.lineStyle = {
                        color: colorMap[colorName]?.line || colorName,
                        width: 4 * props.scale,
                        type: seriesItem.lineType || 'solid'
                    };
                    seriesOption.label = {
                        show: true,
                        fontFamily: 'DINAlternate-Bold',
                        fontSize: 28 * props.scale,
                        color: colorMap[colorName]?.line || colorName,
                        textShadowBlur: 4 * props.scale,
                        textShadowOffsetX: 0,
                        textShadowOffsetY: 2 * props.scale,
                        textShadowColor: 'rgba(0, 0, 0, 0.50)',
                        formatter: v => v.value
                    };
                    props.showLineArea &&
                        (seriesOption.areaStyle = {
                            origin: 'start',
                            color: colorMap[colorName]?.lineArea || colorName
                        });
                }
                const markLines = props.markLine.filter(n => (n.yAxisIndex || 0) === seriesOption.yAxisIndex);
                markLines.length &&
                    (seriesOption.markLine = {
                        symbol: 'none',
                        silent: true,
                        data: markLines.map(n => ({
                            yAxis: n.value,
                            lineStyle: {
                                width: 2 * props.scale,
                                color: n.color,
                                type: n.type
                            },
                            label: {
                                show: true,
                                align: 'right',
                                distance: 0,
                                color: '#FFFFFF',
                                fontSize: 28 * props.scale,
                                borderWidth: 2 * props.scale,
                                borderColor: n.color,
                                backgroundColor: '#0F325C',
                                padding: [6 + 6, 20, 0 + 6].map(n => n * props.scale),
                                offset: [-38, 0].map(n => n * props.scale),
                                formatter: param => `{value|${param.value}}`,
                                rich: {
                                    value: {
                                        fontSize: 28 * props.scale
                                    }
                                }
                            }
                        }))
                    });
                return seriesOption;
            })
            series.push({
                type: 'bar',
                barWidth: '100%',
                barGap: 0,
                yAxisIndex: props.yAxisName === 'string' || (props.yAxisName instanceof Array && props.yAxisName.length === 1) ? 1 : 2,
                xAxisIndex: 1,
                showBackground: false,
                label: { show: false },
                data: props.xAxisData.map((n, i) => ({
                    value: 1,
                    itemStyle: {
                        color: props.xAxisHighlightArea.includes(i) ? 'rgba(14, 143, 255, 0.2)' : 'transparent'
                    }
                })),
                animation: false
            })
            return series
        })(),
        legend: (() => {
            const legendConfig = {
                show: props.showLegend,
                data: props.legendData.map((name, index) => {
                    const colorName = props.color[index % props.color.length];
                    // const colors = props.legendColors || props.itemColors;
                    // const legendIcon = props.legendIcon instanceof Array ? props.legendIcon : [props.legendIcon];
                    // const iconName = legendIcon[index % legendIcon.length];
                    const icon = legendIconMap[props.seriesData[index % props.seriesData.length]?.type || 'line'];
                    return {
                        name,
                        icon,
                        itemStyle: {
                            // color: colors[index % colors.length]
                            color: colorMap[colorName]?.legend || colorName
                        }
                    };
                }),
                top: 20 * props.scale,
                textStyle: {
                    fontFamily: 'MicrosoftYaHei',
                    fontSize: 32 * props.scale,
                    color: 'white'
                },
                itemGap: 64 * props.scale,
                itemWidth: 32 * props.scale,
                itemHeight: 32 * props.scale
            }
            return legendConfig;
        })()
    }
    let start = 0;
    let end = (props.showCount / props.xAxisData.length) * 100;
    if (props.showCount) {
        if (props.dataZoomType === 'slider' && end < 100) {
            if (props.dataZoomStartAtEnd) {
                start = 100 - end;
                end = 100;
            }
            option.dataZoom = [
                {
                    type: 'slider',
                    brushSelect: false,
                    handleIcon: 'none',
                    borderColor: 'transparent',
                    dataBackground: {
                        lineStyle: {
                            color: 'transparent'
                        },
                        areaStyle: {
                            color: 'transparent'
                        }
                    },
                    selectedDataBackground: {
                        lineStyle: {
                            color: 'transparent'
                        },
                        areaStyle: {
                            color: 'transparent'
                        }
                    },
                    height: 14 * props.scale,
                    fillerColor: '#467C9F',
                    // fillerColor: '#2EA8E5',
                    // fillerColor: '#037BD6',
                    labelFormatter: '',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 0,
                    start,
                    end,
                    handleStyle: {
                        color: 'red'
                    },
                    bottom: props.dataZoomBottom
                }
            ];
        } else {
            option.dataZoom = [{ type: 'inside', start, end }];
        }
    }
    typeof props.beforeSetOption === 'function' && props.beforeSetOption(option, chart);
    chart.setOption(option)
    typeof props.afterSetOption === 'function' && props.afterSetOption(option, chart);
    // props.dataZoomStartAtEnd && chart.dispatchAction({ start: 100 - end, end })
    /**添加点击柱子的点击事件 */
    chart.off('click'); //防止触发两次点击事件
    chart.getZr().on('click', params => {
        const pointInPixel = [params.offsetX, params.offsetY];
        if (chart.containPixel('grid', pointInPixel)) {
            const pointInGrid = chart.convertFromPixel(
                {
                    seriesIndex: 0
                },
                pointInPixel
            );
            const xIndex = pointInGrid[0]; //索引
            const handleIndex = Number(xIndex);
            const seriesObj = chart.getOption(); //图表object对象
            const op = chart.getOption();
            //获得图表中点击的列
            const month = op.xAxis[0].data[handleIndex]; //获取点击的列名
            emit('clickColumn', {
                params,
                month,
                handleIndex,
                seriesObj
            });
        }
    });
};

defineExpose({
    resize: () => chart?.resize(),
    renderChart,
    clearChart: () => chart?.clear()
});
</script>
<style lang="scss" scoped></style>
