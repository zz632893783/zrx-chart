## 1.基础用法
<demo291d779a9c33 />
```vue{4}
<template>
    <gradient-ring-chart :value="50" subTitle="风险指数" valueUnit="%"></gradient-ring-chart>
</template>
<script setup></script>
<style lang="scss" scoped>
.zrx-chart {
    background-color: #042a44;
    padding: 32px;
}
</style>
```
## 2.颜色半径设置
<demo5da05a57f28f />
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
<demo1812b5555e73 />
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
    startAngle: 120,
    angleRange: 240
};
const option3 = {
    value: 80,
    subTitle: '副标题',
    valueUnit: '人',
    startAngle: 120,
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
## 属性
<demofad11ffac59b />
<script setup>
import demo291d779a9c33 from '../../document/gradientRingChart/1.基础用法.vue'
import demo5da05a57f28f from '../../document/gradientRingChart/2.颜色半径设置.vue'
import demo1812b5555e73 from '../../document/gradientRingChart/3.角度范围控制.vue'
import demofad11ffac59b from '../../document/gradientRingChart/属性.vue'
</script>