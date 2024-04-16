## 1.基础用法
<demo40697727b9b4 />
```vue{4}
<template>
    <dashboard-chart ref="chartRef" :value="66" :max="100">
        <h4 style="font-size: 16px; color: red; font-weight: 600;">自定义中心</h4>
    </dashboard-chart>
    <dashboard-chart ref="chartRef2" :radius="48" :value="66" :startAngle="90" :endAngle="-270" color="#F0465A"></dashboard-chart>
    <dashboard-chart ref="chartRef3" :radius="48" :value="66" :startAngle="90" :endAngle="-270" color="#1BBE8C"></dashboard-chart>
    <dashboard-chart ref="chartRef4" :radius="48" :value="66" :startAngle="90" :endAngle="-270" color="#405FFE"></dashboard-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const chartRef2 = ref();
const chartRef3 = ref();
const chartRef4 = ref();

const value = 66;
const max = 100;
const chartOption = { value, max };

onMounted(() => {
    chartRef.value.renderChart();
    chartRef2.value.renderChart();
    chartRef3.value.renderChart();
    chartRef4.value.renderChart();
});
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 240px;
    width: 160px;
    display: inline-block;
    background-color: rgb(3, 43, 68);
    &:nth-child(2) {
        width: 240px;
    }
}
</style>

```
## 2.修改颜色
<demodee883790da7 />
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
<demo3056ba82165d />
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
<demod2b98e60432b />
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
## 属性
<demo0fad8d7f5539 />
## 支持方法
<demo8752caa8d267 />
<script setup>
import demo40697727b9b4 from '../../document/dashboardChart/1.基础用法.vue'
import demodee883790da7 from '../../document/dashboardChart/2.修改颜色.vue'
import demo3056ba82165d from '../../document/dashboardChart/3.设置角度.vue'
import demod2b98e60432b from '../../document/dashboardChart/4.宽度半径.vue'
import demo0fad8d7f5539 from '../../document/dashboardChart/属性.vue'
import demo8752caa8d267 from '../../document/dashboardChart/支持方法.vue'
</script>