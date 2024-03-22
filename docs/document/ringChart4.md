## 1.基础用法
<demo0da5436c9f22 />
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
<demo15359c193d9e />
## 支持方法
<democ89a5f5a4eea />
<script setup>
import demo0da5436c9f22 from '../../document/ringChart4/1.基础用法.vue'
import demo15359c193d9e from '../../document/ringChart4/属性.vue'
import democ89a5f5a4eea from '../../document/ringChart4/支持方法.vue'
</script>