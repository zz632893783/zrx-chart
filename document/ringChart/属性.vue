<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2024-3-29 9:54:26 -->
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
                    title
                </div>
                <div class="table-cell">
                    标题
                </div>
                <div class="table-cell">
                    String
                </div>
                <div class="table-cell">
                    ''
                </div>
                <div class="table-cell">
                    '标题'
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
                    Array
                </div>
                <div class="table-cell">
                    [68, 80]
                </div>
                <div class="table-cell">
                    [68, 80]
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
                    颜色
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    ['#ae7efd', '#7670d7', '#709ad7', '#72dde0', '#d0f1ff', '#b5bfe2', '#206e8a', '#1dd1ff', '#d2abea', '#0e8fff']
                </div>
                <div class="table-cell">
                    ['#ae7efd', '#7670d7', '#709ad7', '#72dde0', '#d0f1ff', '#b5bfe2', '#206e8a', '#1dd1ff', '#d2abea', '#0e8fff']
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
                    centerDisplay
                </div>
                <div class="table-cell">
                    中心部分的展示部分<br/>&nbsp;null，'' 或者不传，表示中心部分不显示<br/>&nbsp;'item' 表示中心部分展示单项<br/>&nbsp;'sum' 表示中心部分展示总量<br/>&nbsp;'itemValue' 表示中心部分展示值<br/>&nbsp;'itemPercentage' 表示中心部分展示单项占比
                </div>
                <div class="table-cell">
                    String
                </div>
                <div class="table-cell">
                    null
                </div>
                <div class="table-cell">
                    'item'
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
                    0
                </div>
                <div class="table-cell">
                    4
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