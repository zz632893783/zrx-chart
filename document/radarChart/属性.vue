<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2024-5-6 12:25:2 -->
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
                <div class="table-cell">
                    splitNumber
                </div>
                <div class="table-cell">
                    指示器轴的分割段数。
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    5
                </div>
                <div class="table-cell">
                    5
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    radius
                </div>
                <div class="table-cell">
                    轴的半径
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    90
                </div>
                <div class="table-cell">
                    90
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    indicator
                </div>
                <div class="table-cell">
                    雷达图的指示器，用来指定雷达图中的多个变量（维度），如下示例
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    []
                </div>
                <div class="table-cell">
                    [<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name: '经营情况', max: 10 },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name: '发展潜力', max: 10 },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name: '管理能力', max: 10 },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name: '贡献能力', max: 10 },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name: '能效水平', max: 10 }<br/>]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    indicatorColor
                </div>
                <div class="table-cell">
                    雷达图的指示器文字颜色
                </div>
                <div class="table-cell">
                    String
                </div>
                <div class="table-cell">
                    'white'
                </div>
                <div class="table-cell">
                    'red'
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    indicatorFontSize
                </div>
                <div class="table-cell">
                    雷达图的指示器字号
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    16
                </div>
                <div class="table-cell">
                    32
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    indicatorNameGap
                </div>
                <div class="table-cell">
                    雷达图的指示器文字与图标的间距
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    16
                </div>
                <div class="table-cell">
                    16
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    seriesData
                </div>
                <div class="table-cell">
                    数据项
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    []
                </div>
                <div class="table-cell">
                    [[4, 2, 1, 5, 3], [2, 1, 5, 3, 3]]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    legendData
                </div>
                <div class="table-cell">
                    legend 数据
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    []
                </div>
                <div class="table-cell">
                    ['总能耗', '能耗照明']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    color
                </div>
                <div class="table-cell">
                    预设颜色
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    ['rgb(48, 213, 235)']
                </div>
                <div class="table-cell">
                    ['red', 'green', 'blue']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    beforeSetOption
                </div>
                <div class="table-cell">
                    万能方法，图表渲染之前执行
                </div>
                <div class="table-cell">
                    Function
                </div>
                <div class="table-cell">
                    null
                </div>
                <div class="table-cell">
                    function (option, chart) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;return '执行对 option 的修改，绑定自定义事件等'<br/>}
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    afterSetOption
                </div>
                <div class="table-cell">
                    万能方法，图表渲染之后执行
                </div>
                <div class="table-cell">
                    Function
                </div>
                <div class="table-cell">
                    null
                </div>
                <div class="table-cell">
                    function (option, chart) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;return '执行对 option 的修改，绑定自定义事件等'<br/>}
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.table-row {
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 3fr);
}
</style>