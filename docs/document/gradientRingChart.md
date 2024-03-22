## 1.基础用法
<demoe12a41ed3d2d />
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
<demofd97922a180e />
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
<demoea6039c23c26 />
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
<demoef3c77f6bd9d />
```vue{4}
<template>
    <gradient-ring-chart v-bind="option"></gradient-ring-chart>
    <gradient-ring-chart v-bind="option2"></gradient-ring-chart>
</template>
<script setup>
const option = {
    value: 60,
    clockwise: true
};
const option2 = {
    value: 80,
    clockwise: false
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
<demoa6c7ee03b590 />
<script setup>
import demoe12a41ed3d2d from '../../document/gradientRingChart/1.基础用法.vue'
import demofd97922a180e from '../../document/gradientRingChart/2.颜色半径设置.vue'
import demoea6039c23c26 from '../../document/gradientRingChart/3.角度范围控制.vue'
import demoef3c77f6bd9d from '../../document/gradientRingChart/4.顺时针、逆时针.vue'
import demoa6c7ee03b590 from '../../document/gradientRingChart/属性.vue'
</script>