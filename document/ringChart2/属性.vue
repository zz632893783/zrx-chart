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
                <div class="table-cell">title</div>
                <div class="table-cell">标题</div>
                <div class="table-cell">String</div>
                <div class="table-cell">''</div>
                <div class="table-cell">'标题'</div>
            </div>
            <div class="table-row">
                <div class="table-cell">radius</div>
                <div class="table-cell">半径</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[60, 70]</div>
                <div class="table-cell">[60, 70]</div>
            </div>
            <div class="table-row">
                <div class="table-cell">itemGap</div>
                <div class="table-cell">间距</div>
                <div class="table-cell">Number</div>
                <div class="table-cell">2</div>
                <div class="table-cell">2</div>
            </div>
            <div class="table-row">
                <div class="table-cell">seriesData</div>
                <div class="table-cell">数据项</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">[]</div>
                <div class="table-cell" v-html="seriesDataContent"></div>
            </div>
            <div class="table-row">
                <div class="table-cell">color</div>
                <div class="table-cell">颜色</div>
                <div class="table-cell">Array</div>
                <div class="table-cell">['#ae7efd', '#7670d7', '#709ad7', '#72dde0', '#d0f1ff', '#b5bfe2', '#206e8a', '#1dd1ff', '#d2abea', '#0e8fff']</div>
                <div class="table-cell">['#ae7efd', '#7670d7', '#709ad7', '#72dde0', '#d0f1ff', '#b5bfe2', '#206e8a', '#1dd1ff', '#d2abea', '#0e8fff']</div>
            </div>
            <div class="table-row">
                <div class="table-cell">unit</div>
                <div class="table-cell">单位</div>
                <div class="table-cell">String</div>
                <div class="table-cell">''</div>
                <div class="table-cell">'元'</div>
            </div>
            <div class="table-row">
                <div class="table-cell">labelFormatter</div>
                <div class="table-cell">自定义 label 函数</div>
                <div class="table-cell">Function</div>
                <div class="table-cell">null</div>
                <div class="table-cell">
                    function (...param) {<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;return '自定义 label 内容';<br/>
                    }
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">edgeDistance</div>
                <div class="table-cell">文字与边缘之间的距离</div>
                <div class="table-cell">Number</div>
                <div class="table-cell">10</div>
                <div class="table-cell">20</div>
            </div>
            <div class="table-row">
                <div class="table-cell">minAngle</div>
                <div class="table-cell">单项的最小角度</div>
                <div class="table-cell">Number</div>
                <div class="table-cell">0</div>
                <div class="table-cell">4</div>
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
    { value: 61, name: '第1项' },
    { value: 52, name: '第2项' },
    { value: 97, name: '第3项' },
    { value: 99, name: '第4项' },
    { value: 80, name: '第5项' },
    { value: 77, name: '第6项' },
    { value: 80, name: '第7项' },
    { value: 67, name: '第8项' },
    { value: 83, name: '第9项' }
]
`.trim().replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');;
</script>
<style lang="scss" scoped>
.table-row {
    grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 2fr) minmax(0, 3fr);
}
</style>
