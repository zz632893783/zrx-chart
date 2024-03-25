## 1.基础用法
<demo8a7fd358078f />
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
<demo782a16250aeb />
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
<demo12695a78df5c />
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
<demo69ab8f057a17 />
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
<demoac62d74077d3 />
<script setup>
import demo8a7fd358078f from '../../document/gradientRingChart/1.基础用法.vue'
import demo782a16250aeb from '../../document/gradientRingChart/2.颜色半径设置.vue'
import demo12695a78df5c from '../../document/gradientRingChart/3.角度范围控制.vue'
import demo69ab8f057a17 from '../../document/gradientRingChart/4.顺时针、逆时针.vue'
import demoac62d74077d3 from '../../document/gradientRingChart/属性.vue'
</script>