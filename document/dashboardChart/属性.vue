<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2024-9-10 15:36:35 -->
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
                    max
                </div>
                <div class="table-cell">
                    最大值
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    100
                </div>
                <div class="table-cell">
                    200
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    layerColor
                </div>
                <div class="table-cell">
                    底色
                </div>
                <div class="table-cell">
                    String
                </div>
                <div class="table-cell">
                    '#50697a'
                </div>
                <div class="table-cell">
                    '#aabbcc'
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    color
                </div>
                <div class="table-cell">
                    颜色
                </div>
                <div class="table-cell">
                    String
                </div>
                <div class="table-cell">
                    '#34d3ec'
                </div>
                <div class="table-cell">
                    'red'
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
                    200
                </div>
                <div class="table-cell">
                    180
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    endAngle
                </div>
                <div class="table-cell">
                    终止角度
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    -20
                </div>
                <div class="table-cell">
                    -40
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    value
                </div>
                <div class="table-cell">
                    数值
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    0
                </div>
                <div class="table-cell">
                    60
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    barWidth
                </div>
                <div class="table-cell">
                    环形条宽度
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    10
                </div>
                <div class="table-cell">
                    20
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    radius
                </div>
                <div class="table-cell">
                    半径
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    95
                </div>
                <div class="table-cell">
                    80
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