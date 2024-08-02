## 1.基础用法
<demod093246e7118 />
```vue{4}
<template>
    <gradient-ring-chart :value="v" subTitle="风险指数" valueUnit="%"></gradient-ring-chart>
    <el-button @click="randomValue">随机值</el-button>
</template>
<script setup>;
import { ref } from 'vue';

const v = ref(50);

const randomValue = () => (v.value = Math.round(Math.random() * 100));
</script>
<style lang="scss" scoped>
.zrx-chart {
    background-color: #042a44;
    padding: 32px;
}
</style>
```
## 2.颜色半径设置
<demo9f15f05db75d />
```vue{4}
<template>
    <gradient-ring-chart v-bind="option"></gradient-ring-chart>
</template>
<script setup>
const option = {
    value: 80,
    subTitle: '副标题',
    valueUnit: '人',
    radius: 200,
    barWidth: 60,
    layerColor: 'rgba(255, 100, 100, 0.2)',
    startColor: '#4da2cb',
    endColor: '#67b26f'
};
</script>
<style lang="scss" scoped>
.zrx-chart {
    background-color: rgb(27, 27, 31);
    padding: 32px;
}
</style>
```
## 3.角度范围控制
<demofabac6dbd3e8 />
```vue{4}
<template>
    <gradient-ring-chart v-bind="option"></gradient-ring-chart>
    <gradient-ring-chart v-bind="option2"></gradient-ring-chart>
    <gradient-ring-chart v-bind="option3"></gradient-ring-chart>
</template>
<script setup>
const option = {
    value: 60,
    subTitle: '副标题',
    valueUnit: '人',
    startAngle: 120,
    angleRange: 120
};
const option2 = {
    value: 80,
    subTitle: '副标题',
    valueUnit: '人',
    startAngle: 240,
    angleRange: 240
};
const option3 = {
    value: 80,
    subTitle: '副标题',
    valueUnit: '人',
    startAngle: 0,
    angleRange: 360
};
</script>
<style lang="scss" scoped>
.zrx-chart {
    background-color: #042a44;
    padding: 32px;
}
</style>
```
## 4.顺时针、逆时针
<demod6af3c305c86 />
```vue{4}
<template>
    <gradient-ring-chart v-bind="option"></gradient-ring-chart>
    <gradient-ring-chart v-bind="option2"></gradient-ring-chart>
</template>
<script setup>
const option = {
    value: 66,
    clockwise: true,
    startAngle: 140
};
const option2 = {
    value: 66,
    clockwise: false,
    startAngle: 40,
    angleRange: 260
};
</script>
<style lang="scss" scoped>
.zrx-chart {
    background-color: #042a44;
    padding: 32px;
}
</style>
```
## 属性
<demoe8f296028a1b />
<script setup>
import demod093246e7118 from '../../document/gradientRingChart/1.基础用法.vue'
import demo9f15f05db75d from '../../document/gradientRingChart/2.颜色半径设置.vue'
import demofabac6dbd3e8 from '../../document/gradientRingChart/3.角度范围控制.vue'
import demod6af3c305c86 from '../../document/gradientRingChart/4.顺时针、逆时针.vue'
import demoe8f296028a1b from '../../document/gradientRingChart/属性.vue'
</script>