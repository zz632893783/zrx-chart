## 1.基本用法
<demo925143478ced />
```vue{4}
<template>
    <radar-chart ref="radarChartRef" v-bind="option"></radar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const radarChartRef = ref();

const indicator = [
    { name: '经营情况', max: 10 },
    { name: '发展潜力', max: 10 },
    { name: '管理能力', max: 10 },
    { name: '贡献能力', max: 10 },
    { name: '能效水平', max: 10 }
];

const seriesData = [
    [6, 8, 7, 5, 8]
];

const option = {
    indicator,
    seriesData
};

onMounted(() => radarChartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    background-color: #042a44;
    padding: 32px;
    width: 450px;
    height: 350px;
}
</style>
```
## 2.其他样式配置
<demo6df6373802f4 />
```vue{4}
<template>
    <radar-chart ref="radarChartRef" v-bind="option"></radar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const radarChartRef = ref();

const indicator = [
    { name: '经营情况', max: 10 },
    { name: '发展潜力', max: 10 },
    { name: '管理能力', max: 10 },
    { name: '贡献能力', max: 10 },
    { name: '能效水平', max: 10 },
    { name: '其他', max: 10 }
];

const seriesData = [
    [6, 8, 7, 5, 8, 8],
    [5, 3, 6, 6, 7, 7]
];

const radius = 140;

const splitNumber = 3;

const option = {
    indicator,
    seriesData,
    radius,
    splitNumber
};

onMounted(() => radarChartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    background-color: #042a44;
    padding: 32px;
    width: 450px;
    height: 450px;
}
</style>
```
## 属性
<demo66b34b23dc2c />
<script setup>
import demo925143478ced from '../../document/radarChart/1.基本用法.vue'
import demo6df6373802f4 from '../../document/radarChart/2.其他样式配置.vue'
import demo66b34b23dc2c from '../../document/radarChart/属性.vue'
</script>