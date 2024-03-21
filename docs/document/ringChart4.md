## 1.基础用法
<demof03c8eca6736 />
```vue{4}
<template>
    <ring-chart-4 ref="chartRef" v-bind="chartOption"></ring-chart-4>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    { value: 1048, name: '正常' },
    { value: 735, name: '故障' },
    { value: 580, name: '告警' },
    { value: 484, name: '离线' }
];
// 组合配置项
const chartOption = {
    seriesData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<democ2ee0cc0746f />
## 支持方法
<demo302af59b4ce5 />
<script setup>
import demof03c8eca6736 from '../../document/ringChart4/1.基础用法.vue'
import democ2ee0cc0746f from '../../document/ringChart4/属性.vue'
import demo302af59b4ce5 from '../../document/ringChart4/支持方法.vue'
</script>