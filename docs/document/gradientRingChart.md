## 1.基础用法
<demo488eee9cd409 />
```vue{4}
<template>
	<gradient-ring-chart ref="chartRef" :value="value" subTitle="风险指数" valueUnit="%"></gradient-ring-chart>
</template>
<script setup>
import { ref, onUnmounted } from 'vue';
const value = ref(50);

let timer = setInterval(() => (value.value = Math.round(Math.random() * 100)), 2000);

onUnmounted(() => timer && clearInterval(timer));
</script>
<style lang="scss" scoped>
.zrx-chart {
	background-color: #042a44;
	padding: 32px;
}
</style>
```
## 属性
<demodcb03084f55d />
<script setup>
import demo488eee9cd409 from '../../document/gradientRingChart/1.基础用法.vue'
import demodcb03084f55d from '../../document/gradientRingChart/属性.vue'
</script>