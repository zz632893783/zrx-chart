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
                <div class="table-cell">xAxisData</div>
                <div class="table-cell">x 轴坐标</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell">['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">grid</div>
                <div class="table-cell">上下左右边距</div>
                <div class="table-cell">Object</div>
                <div class="table-cell">{ top: 109, right: 70, bottom: 80, left: 90 }</div>
                <div class="table-cell">{ top: 109, right: 70, bottom: 80, left: 90 }</div>
            </div>
            <div class="table-row">
                <div class="table-cell">seriesData</div>
                <div class="table-cell">数据数组</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell" v-html="seriesDataContent"></div>
            </div>
            <div class="table-row">
                <div class="table-cell">yAxisName</div>
                <div class="table-cell">y轴单位</div>
                <div class="table-cell">String, Array</div>
                <div class="table-cell">['']</div>
                <div class="table-cell">['亿元', '%']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">showCount</div>
                <div class="table-cell">最多显示的数量（实际显示数量会根据输入值调整）</div>
                <div class="table-cell">Number</div>
                <div class="table-cell">5</div>
                <div class="table-cell">3</div>
            </div>
            <div class="table-row">
                <div class="table-cell">dataZoomType</div>
                <div class="table-cell">何种方式拖动 inside 内容区域拖动，slider 滑块拖动</div>
                <div class="table-cell">String</div>
                <div class="table-cell">'inside'</div>
                <div class="table-cell">'slider'</div>
            </div>
            <div class="table-row">
                <div class="table-cell">dataZoomBottom</div>
                <div class="table-cell">当 dataZoomType 为 slider 时，拖动区域距离底部的距离</div>
                <div class="table-cell">Number</div>
                <div class="table-cell">0</div>
                <div class="table-cell">12</div>
            </div>
            <div class="table-row">
                <div class="table-cell">dataZoomStartAtEnd</div>
                <div class="table-cell">从末尾开始显示图表</div>
                <div class="table-cell">Boolean</div>
                <div class="table-cell">true</div>
                <div class="table-cell">false</div>
            </div>
            <div class="table-row">
                <div class="table-cell">showLegend</div>
                <div class="table-cell">是否显示 legend</div>
                <div class="table-cell">Boolean</div>
                <div class="table-cell">true</div>
                <div class="table-cell">false</div>
            </div>
            <div class="table-row">
                <div class="table-cell">legendData</div>
                <div class="table-cell">legend 数据</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell">['统计金额', '开票金额']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">markLine</div>
                <div class="table-cell">标记线</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell" v-html="markLineContent"></div>
            </div>
            <div class="table-row">
                <div class="table-cell">color</div>
                <div class="table-cell">图表项颜色</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">['blue', 'yellow', 'grey']</div>
                <div class="table-cell">['blue', 'yellow', 'grey']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">showLineArea</div>
                <div class="table-cell">线条是否显示区域颜色</div>
                <div class="table-cell">Boolean</div>
                <div class="table-cell">false</div>
                <div class="table-cell">true</div>
            </div>
            <div class="table-row">
                <div class="table-cell">tooltipTitle</div>
                <div class="table-cell">tooltip 标题</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">null</div>
                <div class="table-cell">['标题A', '标题B']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">xAxisHighlightArea</div>
                <div class="table-cell">高亮区域的索引</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell">[2, 4]</div>
            </div>
            <div class="table-row">
                <div class="table-cell">scale</div>
                <div class="table-cell">图表缩放比例</div>
                <div class="table-cell">Number</div>
                <div class="table-cell">1</div>
                <div class="table-cell">1</div>
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
<script setup>
const seriesDataContent = `
[
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [81, 17, 30, 94, 45, 54, 60, 1, 69]
    }
]
`.trim().replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
const markLineContent = `
[
    {
        value: 134,
        yAxisIndex: 0,
        color: '#33FFBB'
    },
    {
        value: 166,
        yAxisIndex: 0,
        color: '#F74768'
    }
]
`.trim().replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
</script>
<style lang="scss" scoped>
.table-row {
    grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 2fr) minmax(0, 3fr);
}
</style>
