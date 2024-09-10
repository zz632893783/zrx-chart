## 1.基本用法
<democ526dc679055 />
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
## 2.半径设置
<demo41e17b83d12c />
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

const radius = 130;

const splitNumber = 8;

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
## 3.颜色设置
<demoedc0c5fbfc68 />
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
    { name: '其他', max: 10 },
    { name: '额外项', max: 10 }
];
const seriesData = [
    [8, 8, 7, 5, 8, 8, 9],
    [5, 3, 6, 6, 7, 7, 2],
    [3, 6, 6, 7, 7, 2, 3]
];
const color = ['green', 'blue', 'orange'];
const option = {
    indicator,
    seriesData,
    color,
    indicatorColor: 'red'
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
<demo1527dac7009f />
<script setup>
import democ526dc679055 from '../../document/radarChart/1.基本用法.vue'
import demo41e17b83d12c from '../../document/radarChart/2.半径设置.vue'
import demoedc0c5fbfc68 from '../../document/radarChart/3.颜色设置.vue'
import demo1527dac7009f from '../../document/radarChart/属性.vue'
</script>