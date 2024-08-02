## 1.基本用法(画像app)
<demo0003cf0227f7 />
```vue{4}
<template>
    <radar-chart-2 ref="radarChartRef" v-bind="option"></radar-chart-2>
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
    background-color: #fff;
    width: 375px;
    height: 375px;
}
</style>
```
## 属性
<demo4f58e8657533 />
<script setup>
import demo0003cf0227f7 from '../../document/radarChart2/1.基本用法(画像app).vue'
import demo4f58e8657533 from '../../document/radarChart2/属性.vue'
</script>