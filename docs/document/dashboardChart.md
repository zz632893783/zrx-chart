## 1.基础用法
<demo94155e6785af />
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
<demoff2a923c98c1 />
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
<demo82b84dfc7c87 />
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
<demoed9922823879 />
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
import demo94155e6785af from '../../document/dashboardChart/1.基础用法.vue'
import demoff2a923c98c1 from '../../document/dashboardChart/2.修改颜色.vue'
import demo82b84dfc7c87 from '../../document/dashboardChart/3.设置角度.vue'
import demoed9922823879 from '../../document/dashboardChart/4.宽度半径.vue'
</script>