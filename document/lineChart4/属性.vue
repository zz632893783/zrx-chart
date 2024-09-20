<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2024-9-14 16:1:37 -->
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
                    1
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    xAxisData
                </div>
                <div class="table-cell">
                    x 轴坐标
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    []
                </div>
                <div class="table-cell">
                    ['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    yAxisName
                </div>
                <div class="table-cell">
                    y轴单位
                </div>
                <div class="table-cell">
                    String, Array
                </div>
                <div class="table-cell">
                    ['']
                </div>
                <div class="table-cell">
                    ['亿元', '%']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    seriesData
                </div>
                <div class="table-cell">
                    数据数组
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    []
                </div>
                <div class="table-cell">
                    [<br/>&nbsp;&nbsp;&nbsp;&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// 需要指定 y 轴索引<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yAxisIndex: 0,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: [163, 129, 123, 198, 152, 152, 178]<br/>&nbsp;&nbsp;&nbsp;&nbsp;},<br/>&nbsp;&nbsp;&nbsp;&nbsp;{<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yAxisIndex: 1,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data: [81, 17, 30, 94, 45, 54, 60]<br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>]
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
                    ['统计金额', '开票金额']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    smooth
                </div>
                <div class="table-cell">
                    是否平滑
                </div>
                <div class="table-cell">
                    Boolean, Number
                </div>
                <div class="table-cell">
                    false
                </div>
                <div class="table-cell">
                    true
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    showLineArea
                </div>
                <div class="table-cell">
                    线条是否显示区域颜色
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
                    showSplitLine
                </div>
                <div class="table-cell">
                    是否显示辅助刻度线
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
                    grid
                </div>
                <div class="table-cell">
                    上下左右边距
                </div>
                <div class="table-cell">
                    Object
                </div>
                <div class="table-cell">
                    ({<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;top: 42,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;right: 50,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bottom: 32,<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;left: 50<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;})
                </div>
                <div class="table-cell">
                    { top: 84, right: 18, bottom: 56, left: 56 }
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    showCount
                </div>
                <div class="table-cell">
                    最多显示的数量（实际显示数量会根据输入值调整）
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
                    dataZoomType
                </div>
                <div class="table-cell">
                    何种方式拖动 inside 内容区域拖动，slider 滑块拖动
                </div>
                <div class="table-cell">
                    String
                </div>
                <div class="table-cell">
                    'inside'
                </div>
                <div class="table-cell">
                    'slider'
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    dataZoomBottom
                </div>
                <div class="table-cell">
                    当 dataZoomType 为 slider 时，拖动区域距离底部的距离
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    0
                </div>
                <div class="table-cell">
                    12
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    dataZoomStartAtEnd
                </div>
                <div class="table-cell">
                    从末尾开始显示图表
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
                    showLabel
                </div>
                <div class="table-cell">
                    是否显示 label
                </div>
                <div class="table-cell">
                    Boolean
                </div>
                <div class="table-cell">
                    false
                </div>
                <div class="table-cell">
                    true
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    tooltipTitle
                </div>
                <div class="table-cell">
                    tooltip 标题
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    null
                </div>
                <div class="table-cell">
                    ['标题A']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    zoomLock
                </div>
                <div class="table-cell">
                    是否锁定选择区域的大小
                </div>
                <div class="table-cell">
                    Boolean
                </div>
                <div class="table-cell">
                    false
                </div>
                <div class="table-cell">
                    true
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    shadowBlur
                </div>
                <div class="table-cell">
                    阴影模糊程度
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    3
                </div>
                <div class="table-cell">
                    10
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    shadowOffsetX
                </div>
                <div class="table-cell">
                    阴影 x 方向偏移量
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    0
                </div>
                <div class="table-cell">
                    10
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    shadowOffsetY
                </div>
                <div class="table-cell">
                    阴影 y 方向偏移量
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    12
                </div>
                <div class="table-cell">
                    20
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    tooltipConfine
                </div>
                <div class="table-cell">
                    是否将 tooltip 框限制在图表的区域内
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
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 3fr) minmax(0, 3fr);
}
</style>