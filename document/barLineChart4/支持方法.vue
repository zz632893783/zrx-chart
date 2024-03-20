<template>
	<div class="table">
		<div class="table-header">
			<div class="table-row">
				<div class="table-cell">方法名</div>
				<div class="table-cell">说明</div>
				<div class="table-cell">例子</div>
			</div>
		</div>
		<div class="table-body">
			<div class="table-row">
				<div class="table-cell">renderChart</div>
				<div class="table-cell">渲染图表</div>
				<div class="table-cell">chartRef?.value?.renderChart()</div>
			</div>
			<div class="table-row">
				<div class="table-cell">clearChart</div>
				<div class="table-cell">清除图表</div>
				<div class="table-cell">chartRef?.value?.clearChart()</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.table-row {
	grid-template-columns: minmax(0, 2fr) minmax(0, 2fr) minmax(0, 3fr);
}
</style>
