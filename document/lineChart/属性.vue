<template>
    <div class="table">
        <div class="table-header">
            <div class="table-row">
                <div class="table-cell">属性名</div>
                <div class="table-cell">说明</div>
                <div class="table-cell">类型</div>
                <div class="table-cell">默认值</div>
                <div class="table-cell">参考值</div>
            </div>
        </div>
        <div class="table-body">
            <div class="table-row">
                <div class="table-cell">color</div>
                <div class="table-cell">预设颜色</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">
                    [
                        {
                            color: '#405FFE',
                            lineColor: '#405FFE',
                            areaColor: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(64, 95, 254, 0.4)' },
                                    { offset: 1, color: 'rgba(64, 95, 254, 0)' }
                                ]
                            }
                        },
                        {
                            color: '#1BBE8C',
                            lineColor: '#1BBE8C',
                            areaColor: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(27, 190, 140, 0.4)' },
                                    { offset: 1, color: 'rgba(27, 190, 140, 0)' }
                                ]
                            }
                        }
                    ]
                </div>
                <div class="table-cell">
                    [
                        {
                            color: '#405FFE',
                            lineColor: '#405FFE',
                            areaColor: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(64, 95, 254, 0.4)' },
                                    { offset: 1, color: 'rgba(64, 95, 254, 0)' }
                                ]
                            }
                        },
                        {
                            color: '#1BBE8C',
                            lineColor: '#1BBE8C',
                            areaColor: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    { offset: 0, color: 'rgba(27, 190, 140, 0.4)' },
                                    { offset: 1, color: 'rgba(27, 190, 140, 0)' }
                                ]
                            }
                        }
                    ]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">xAxisData</div>
                <div class="table-cell">x 轴坐标</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell">['周一', '周二', '周三', '周四', '周五', '周六', '周日']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">seriesData</div>
                <div class="table-cell">图表数据</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell">
                    [
                        [8, 30, 50, 82, 73, 84, 50],
                        [32, 94, 61, 11, 52, 68, 58]
                    ]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">legendData</div>
                <div class="table-cell">legend 数据</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell">['总能耗', '能耗照明']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">smooth</div>
                <div class="table-cell">是否平滑</div>
                <div class="table-cell">Boolean, Number</div>
                <div class="table-cell">true</div>
                <div class="table-cell">false</div>
            </div>
            <div class="table-row">
                <div class="table-cell">showLabel</div>
                <div class="table-cell">是否显示 label</div>
                <div class="table-cell">Boolean</div>
                <div class="table-cell">false</div>
                <div class="table-cell">true</div>
            </div>
            <div class="table-row">
                <div class="table-cell">showSymbol</div>
                <div class="table-cell">是否显示 symbol</div>
                <div class="table-cell">Boolean</div>
                <div class="table-cell">false</div>
                <div class="table-cell">true</div>
            </div>
            <div class="table-row">
                <div class="table-cell">unit</div>
                <div class="table-cell">单位</div>
                <div class="table-cell">String, Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell">['kw/h', 'kg']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">grid</div>
                <div class="table-cell">上下左右间距</div>
                <div class="table-cell">Object</div>
                <div class="table-cell">
                    {
                        top: 60,
                        right: 29,
                        bottom: 36,
                        left: 48
                    }
                </div>
                <div class="table-cell">
                    {
                        top: 60,
                        right: 29,
                        bottom: 36,
                        left: 48
                    }
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">yAxisName</div>
                <div class="table-cell">y 轴名称</div>
                <div class="table-cell">String</div>
                <div class="table-cell">''</div>
                <div class="table-cell">'名称'</div>
            </div>
            <div class="table-row">
                <div class="table-cell">legendPosition</div>
                <div class="table-cell">legend 定位</div>
                <div class="table-cell">Object</div>
                <div class="table-cell">{ top: 20, left: 16 }</div>
                <div class="table-cell">{ top: 20, left: 16 }</div>
            </div>
            <div class="table-row">
                <div class="table-cell">tooltipNames</div>
                <div class="table-cell">tooltip 名称数组</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell">['标题A', '标题B']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">beforeSetOption</div>
                <div class="table-cell">万能方法，图表渲染之前执行</div>
                <div class="table-cell">Function</div>
                <div class="table-cell">null</div>
                <div class="table-cell">
                    function (option, chart) {<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;return '执行对 option 的修改，绑定自定义事件等'<br/>
                    }
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">afterSetOption</div>
                <div class="table-cell">万能方法，图表渲染之后执行</div>
                <div class="table-cell">Function</div>
                <div class="table-cell">null</div>
                <div class="table-cell">
                    function (option, chart) {<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;return '执行对 option 的修改，绑定自定义事件等'<br/>
                    }
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.table-row {
    grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 2fr) minmax(0, 3fr);
}
</style>
