<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2024-3-20 16:10:41 -->
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
                    [128, 150]
                </div>
                <div class="table-cell">
                    [60, 70]
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
                    4
                </div>
                <div class="table-cell">
                    4
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
                    [<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ value: 2, name: '住宿业营业额' },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ value: 3, name: '餐饮业营业额' },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ value: 5, name: '零售业营业额' },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ value: 4, name: '批发业营业额' }<br/>]
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
                    ['#ae7efd', '#7670d7', '#709ad7', '#72dde0', '#d0f1ff', '#b5bfe2', '#206e8a', '#1dd1ff', '#d2abea', '#0e8fff']
                </div>
                <div class="table-cell">
                    ['#405FFE', '#1BBE8C', '#48CBA3', '#A4E5D1', '#ECEFFE']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    showLabel
                </div>
                <div class="table-cell">
                    是否显示 label
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    true
                </div>
                <div class="table-cell">
                    false
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
                    labelFormatter
                </div>
                <div class="table-cell">
                    自定义 label 函数
                </div>
                <div class="table-cell">
                    Function
                </div>
                <div class="table-cell">
                    null
                </div>
                <div class="table-cell">
                    function (...params) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;return '自定义 label 格式'<br/>}
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    edgeDistance
                </div>
                <div class="table-cell">
                    文字与边缘之间的距离
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    48
                </div>
                <div class="table-cell">
                    20
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    minAngle
                </div>
                <div class="table-cell">
                    单项的最小角度
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    4
                </div>
                <div class="table-cell">
                    12
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
    grid-template-columns: minmax(0, 1.5fr) minmax(0, 2fr) minmax(0, 1fr) minmax(0, 1.5fr) minmax(0, 3fr);
}
</style>