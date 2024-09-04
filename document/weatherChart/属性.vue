<!-- 该文件由 commentCreateAttrTable.js 自动生成 -->
<!-- 创建时间 2024-8-30 15:0:34 -->
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
                    icons
                </div>
                <div class="table-cell">
                    天气 icon 数组
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    ['icon0', 'icon1', 'icon2']
                </div>
                <div class="table-cell">
                    ['icon0', 'icon1', 'icon2']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    iconSize
                </div>
                <div class="table-cell">
                    图表尺寸
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    [40, 40]
                </div>
                <div class="table-cell">
                    [40, 40]
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    dates
                </div>
                <div class="table-cell">
                    日期数组
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    ['今天\n03/25', '明天\n03/26', '周三\n03/27', '周四\n03/28', '周五\n03/29', '周六\n03/30', '周日\n03/31']
                </div>
                <div class="table-cell">
                    ['今天\n03/25', '明天\n03/26', '周三\n03/27', '周四\n03/28', '周五\n03/29', '周六\n03/30', '周日\n03/31']
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    temperature
                </div>
                <div class="table-cell">
                    每一天的温度，二维数组
                </div>
                <div class="table-cell">
                    Array
                </div>
                <div class="table-cell">
                    [<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[7, 18],<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[12, 24],<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[15, 26],<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[13, 22],<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[15, 24],<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[11, 27],<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[13, 25]<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]
                </div>
                <div class="table-cell">
                    [[7, 18], [12, 24], [15, 26], [13, 22], [15, 24], [11, 27], [13, 25]]
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
                    7
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
                    barWidth
                </div>
                <div class="table-cell">
                    柱子的宽度
                </div>
                <div class="table-cell">
                    Number
                </div>
                <div class="table-cell">
                    90
                </div>
                <div class="table-cell">
                    46
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