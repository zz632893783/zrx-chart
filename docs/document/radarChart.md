## 1.基本用法
<demoaba4a580c6ee />
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
## 属性
<demo7e6348caf158 />
<script setup>
import demoaba4a580c6ee from '../../document/radarChart/1.基本用法.vue'
import demo7e6348caf158 from '../../document/radarChart/属性.vue'
</script>