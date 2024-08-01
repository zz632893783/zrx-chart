<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2024-8-1 17:46:21 -->
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
                    radius
                </div>
                <div class="table-cell">
                    半径
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    [60, 68]
                </div>
                <div class="table-cell">
                    [60, 70]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    ringColor
                </div>
                <div class="table-cell">
                    圆环颜色
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    ['#0e8fff', '#00d5ef', '#b5bfe2']
                </div>
                <div class="table-cell">
                    ['#0e8fff', '#00d5ef', '#b5bfe2']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    barColor
                </div>
                <div class="table-cell">
                    柱子颜色
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    ['#206e8a', '#72dde0']
                </div>
                <div class="table-cell">
                    ['#206e8a', '#72dde0']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    itemGap
                </div>
                <div class="table-cell">
                    间距
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    2
                </div>
                <div class="table-cell">
                    4
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    ringSeriesData
                </div>
                <div class="table-cell">
                    圆环数据
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    []
                </div>
                <div class="table-cell">
                    [73, 54, 98]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    barSeriesData
                </div>
                <div class="table-cell">
                    柱子数据
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    []
                </div>
                <div class="table-cell">
                    [73, 54, 23, 66]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    barHeight
                </div>
                <div class="table-cell">
                    柱子的高度
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    120
                </div>
                <div class="table-cell">
                    160
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    lineLength
                </div>
                <div class="table-cell">
                    连接线长度
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    34
                </div>
                <div class="table-cell">
                    20
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    unit
                </div>
                <div class="table-cell">
                    单位
                </div>
                <div class="table-cell">
                    String
                </div>
                <div class="table-cell">
                    ''
                </div>
                <div class="table-cell">
                    '个'
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    startAngle
                </div>
                <div class="table-cell">
                    起始角度
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    52
                </div>
                <div class="table-cell">
                    40
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    scale
                </div>
                <div class="table-cell">
                    图表缩放比例
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    1
                </div>
                <div class="table-cell">
                    2
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
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 1fr) minmax(0, 1.8fr) minmax(0, 2.6fr);
}
</style>