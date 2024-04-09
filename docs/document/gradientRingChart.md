## 1.基础用法
<demo5e2338eb972c />
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
<demodbb4e9613f12 />
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
<demo82ff97c7fa62 />
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
<demo8b3b8478b721 />
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
<demo2eb2886861e9 />
<script setup>
import demo5e2338eb972c from '../../document/gradientRingChart/1.基础用法.vue'
import demodbb4e9613f12 from '../../document/gradientRingChart/2.颜色半径设置.vue'
import demo82ff97c7fa62 from '../../document/gradientRingChart/3.角度范围控制.vue'
import demo8b3b8478b721 from '../../document/gradientRingChart/4.顺时针、逆时针.vue'
import demo2eb2886861e9 from '../../document/gradientRingChart/属性.vue'
</script>