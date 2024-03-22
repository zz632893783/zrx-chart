## 1.基础用法
<demo1a25fc79d701 />
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
<demoe55a91dacf95 />
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
<democe4279f7f85f />
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
<democ45852f7b00a />
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
<demoa986d451a2c6 />
## 支持方法
<demoea4c857b46fd />
<script setup>
import demo1a25fc79d701 from '../../document/dashboardChart/1.基础用法.vue'
import demoe55a91dacf95 from '../../document/dashboardChart/2.修改颜色.vue'
import democe4279f7f85f from '../../document/dashboardChart/3.设置角度.vue'
import democ45852f7b00a from '../../document/dashboardChart/4.宽度半径.vue'
import demoa986d451a2c6 from '../../document/dashboardChart/属性.vue'
import demoea4c857b46fd from '../../document/dashboardChart/支持方法.vue'
</script>