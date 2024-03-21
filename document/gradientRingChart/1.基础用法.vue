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