## 1.基础用法
<demo373a14995153 />
```vue{4}
<template>
    <dashboard-chart ref="chartRef" v-bind="chartOption">
        <h4 style="font-size: 16px; color: red; font-weight: 600;">自定义中心</h4>
    </dashboard-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const value = 66;
const max = 100;
const chartOption = { value, max };

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 440px;
    height: 240px;
    background-color: rgb(3, 43, 68);
}
</style>

```
## 2.修改颜色
<demo2ed255708e8d />
```vue{4}
<template>
    <dashboard-chart ref="chartRef" v-bind="chartOption">
        <h4 style="font-size: 16px; color: red; font-weight: 600;">自定义中心</h4>
    </dashboard-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const value = 66;
const chartOption = {
	value,
	layerColor: 'rgba(255, 0, 0, 0.3)',
	color: 'green'
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 440px;
    height: 240px;
    background-color: rgb(3, 43, 68);
}
</style>

```
## 3.设置角度
<demodabeb0be50ec />
```vue{4}
<template>
    <dashboard-chart ref="chartRef" v-bind="chartOption">
        <h4 style="font-size: 16px; color: red; font-weight: 600;">自定义中心</h4>
    </dashboard-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const value = 66;
const chartOption = {
    value,
    startAngle: 120,
    endAngle: -120
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 440px;
    height: 240px;
    background-color: rgb(3, 43, 68);
}
</style>

```
## 4.宽度半径
<demoa128f1331e4c />
```vue{4}
<template>
    <dashboard-chart ref="chartRef" v-bind="chartOption">
        <h4 style="font-size: 16px; color: red; font-weight: 600;">自定义中心</h4>
    </dashboard-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const value = 66;
const chartOption = {
    value,
    barWidth: 30,
    radius: 100
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 440px;
    height: 240px;
    background-color: rgb(3, 43, 68);
}
</style>

```
<script setup>
import demo373a14995153 from '../../document/dashboardChart/1.基础用法.vue'
import demo2ed255708e8d from '../../document/dashboardChart/2.修改颜色.vue'
import demodabeb0be50ec from '../../document/dashboardChart/3.设置角度.vue'
import demoa128f1331e4c from '../../document/dashboardChart/4.宽度半径.vue'
</script>