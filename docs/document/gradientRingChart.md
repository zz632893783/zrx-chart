## 1.基础用法
<demo916cdb4f654f />
```vue{4}
<template>
	<gradient-ring-chart ref="chartRef" :value="value" subTitle="风险指数" valueUnit="%"></gradient-ring-chart>
</template>
<script setup>
import { ref, onUnmounted } from 'vue';
const value = ref(50);
</script>
<style lang="scss" scoped>
.zrx-chart {
	background-color: #042a44;
	padding: 32px;
}
</style>
```
## 属性
<demof4183fd873ed />
<script setup>
import demo916cdb4f654f from '../../document/gradientRingChart/1.基础用法.vue'
import demof4183fd873ed from '../../document/gradientRingChart/属性.vue'
</script>