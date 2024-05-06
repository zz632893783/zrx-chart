<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2024-5-6 14:44:27 -->
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
                    [58, 76]
                </div>
                <div class="table-cell">
                    [60, 70]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    backgroundRadius
                </div>
                <div class="table-cell">
                    底色圆环半径
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    [53, 76]
                </div>
                <div class="table-cell">
                    [50, 70]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    backgroundColor
                </div>
                <div class="table-cell">
                    底色
                </div>
                <div class="table-cell">
                    String
                </div>
                <div class="table-cell">
                    'rgb(232, 234, 240)'
                </div>
                <div class="table-cell">
                    'green'
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
                    ['#1BBE8C', '#F0465A', '#FFA433', '#B8BED5']
                </div>
                <div class="table-cell">
                    ['#405FFE', '#1BBE8C', '#48CBA3', '#A4E5D1', '#ECEFFE']
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
                    [<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ value: 1048, name: '正常' },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ value: 735, name: '故障' },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ value: 580, name: '告警' },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ value: 484, name: '离线' }<br/>]
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
                    scaleSize
                </div>
                <div class="table-cell">
                    悬浮选中单项时，增加的半径
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    5
                </div>
                <div class="table-cell">
                    20
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    clockwise
                </div>
                <div class="table-cell">
                    饼图的扇区是否是顺时针排布
                </div>
                <div class="table-cell">
                    Boolean
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