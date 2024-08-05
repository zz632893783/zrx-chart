<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2024-8-5 18:49:8 -->
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
                    range
                </div>
                <div class="table-cell">
                    值区间
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    [0, 100]
                </div>
                <div class="table-cell">
                    [100, 200]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    rangeColor
                </div>
                <div class="table-cell">
                    区间颜色
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    ['#0055FF', '#65F1B6', '#FFD655', '#FF9512']
                </div>
                <div class="table-cell">
                    ['red', 'green', 'blue']
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
                    [<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name:'黑龙江省', value: 50 },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name:'浙江省', value: 15 },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name:'四川省', value: 75 },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name:'江苏省', value: 100 },<br/>&nbsp;&nbsp;&nbsp;&nbsp;{ name:'安徽省', value: 0 }<br/>]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    centerLngLat
                </div>
                <div class="table-cell">
                    中心位置的经纬度
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    ([104, 35])
                </div>
                <div class="table-cell">
                    [104, 35]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    zoom
                </div>
                <div class="table-cell">
                    当前视角的缩放比例
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    1.5
                </div>
                <div class="table-cell">
                    1.4
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