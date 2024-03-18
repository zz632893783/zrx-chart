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
				<div class="table-cell">['农业', '工业', '建筑业', '批发和零售业', '交通运输', '住宿和餐饮业', '金融业', '房地产业', '其他服务业']</div>
			</div>
			<div class="table-row">
				<div class="table-cell">seriesData</div>
				<div class="table-cell">数据数组</div>
				<div class="table-cell">Array(二维数组)</div>
				<div class="table-cell">[]</div>
				<div class="table-cell">[[54, 89, 86, 65, 54, 53, 72, 65, 60], [95, 97, 75, 72, 90, 88, 54, 77, 98]]</div>
			</div>
			<div class="table-row">
				<div class="table-cell">grid</div>
				<div class="table-cell">上下左右边距</div>
				<div class="table-cell">Object</div>
				<div class="table-cell">{ top: 84, right: 18, bottom: 56, left: 56 }</div>
				<div class="table-cell">{ top: 84, right: 18, bottom: 56, left: 56 }</div>
			</div>
			<div class="table-row">
				<div class="table-cell">legendData</div>
				<div class="table-cell">legend 数据</div>
				<div class="table-cell">Array</div>
				<div class="table-cell">[]</div>
				<div class="table-cell">['统计金额', '开票金额']</div>
			</div>
			<div class="table-row">
				<div class="table-cell">yAxisName</div>
				<div class="table-cell">y轴单位</div>
				<div class="table-cell">String</div>
				<div class="table-cell">''</div>
				<div class="table-cell">元</div>
			</div>
			<div class="table-row">
				<div class="table-cell">showCount</div>
				<div class="table-cell">最多显示的数量（实际显示数量会根据输入值调整）</div>
				<div class="table-cell">Number</div>
				<div class="table-cell">7</div>
				<div class="table-cell">4</div>
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
				<div class="table-cell">showLegend</div>
				<div class="table-cell">是否显示 legend</div>
				<div class="table-cell">Boolean</div>
				<div class="table-cell">true</div>
				<div class="table-cell">false</div>
			</div>
			<div class="table-row">
				<div class="table-cell">tooltipFormatter</div>
				<div class="table-cell">自定义 tooltip 的格式，支持模板字符串或函数</div>
				<div class="table-cell">Function, String</div>
				<div class="table-cell">''</div>
				<div class="table-cell">
					function (param) {<br/>
						&nbsp;&nbsp;&nbsp;&nbsp;return '自定义字符串'<br/>
					}
				</div>
			</div>
			<div class="table-row">
				<div class="table-cell">legendIcon</div>
				<div class="table-cell">legend 图标，支持字符串或数组</div>
				<div class="table-cell">String, Array</div>
				<div class="table-cell">['rect']</div>
				<div class="table-cell">['rect']</div>
			</div>
			<div class="table-row">
				<div class="table-cell">color</div>
				<div class="table-cell">图表项颜色</div>
				<div class="table-cell">String, Array</div>
				<div class="table-cell">['blue', 'grey']</div>
				<div class="table-cell">['blue']</div>
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
				<div class="table-cell">dataZoomStartAtEnd</div>
				<div class="table-cell">从末尾开始显示图表</div>
				<div class="table-cell">Boolean</div>
				<div class="table-cell">true</div>
				<div class="table-cell">false</div>
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
<style lang="scss" scoped>
.table-row {
	// grid-template-columns: repeat(5, minmax(0, 1fr));
	grid-template-columns: repeat(3, minmax(0, 1fr)) minmax(0, 2fr) minmax(0, 3fr);
}
</style>
