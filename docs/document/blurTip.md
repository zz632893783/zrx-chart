## 1.基础用法
<demoa41c9fab666e />
```vue{4}
<template>
	<div class="page">
		<!-- <template v-for="n in 4">
			<gradient-ring-chart :value="66" :radius="100"></gradient-ring-chart>
			<blur-tip :placement="['top', 'right', 'bottom', 'left'][n]"><p>运营风险</p></blur-tip>
		</template> -->
		<gradient-ring-chart v-for="n in 3" :value="66"></gradient-ring-chart>
		<blur-tip v-for="n in 4" :placement="['top', 'right', 'bottom', 'left'][n % 4]"><p>运营风险</p></blur-tip>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
</script>
<style lang="scss" scoped>
.page {
	background-color: rgb(3, 43, 68);
	position: relative;
	.zrx-tip {
		z-index: 1;
		position: absolute;
		&:deep(p) {
			color: white;
			font-size: 24px;
			white-space: nowrap;
			padding: 4px 12px;
		}
		&:nth-child(4) {
			left: 100px;
			top: 110px;
		}
		&:nth-child(5) {
			left: 300px;
			top: 100px;
		}
		&:nth-child(6) {
			left: 540px;
			top: 50px;
		}
		&:nth-child(7) {
			left: 530px;
			top: 180px;
		}
	}
}
</style>
```
## 属性
<demo1500435704d3 />
<script setup>
import demoa41c9fab666e from '../../document/blurTip/1.基础用法.vue'
import demo1500435704d3 from '../../document/blurTip/属性.vue'
</script>