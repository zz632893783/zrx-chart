## 1.基础用法
<demo2515134f3856 />
```vue{4}
<template>
	<div class="page">
		<gradient-ring-chart v-for="n in 3" :value="66"></gradient-ring-chart>
		<blur-tip v-for="n in 4" :placement="['top', 'right', 'bottom', 'left'][n % 4]"><p>风险运营{{ n }}</p></blur-tip>
	</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
</script>
<style lang="scss" scoped>
.page {
	background-color: rgb(3, 43, 68);
	position: relative;
	white-space: nowrap;
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
			left: 310px;
			top: 110px;
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
<demobc0bcdf4ff71 />
<script setup>
import demo2515134f3856 from '../../document/blurTip/1.基础用法.vue'
import demobc0bcdf4ff71 from '../../document/blurTip/属性.vue'
</script>