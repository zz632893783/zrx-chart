## 1.基础用法
<demo13b76f5f90ba />
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
<democ341f130d82c />
## 支持方法
<demoe5031b868d79 />
<script setup>
import demo13b76f5f90ba from '../../document/ringChart4/1.基础用法.vue'
import democ341f130d82c from '../../document/ringChart4/属性.vue'
import demoe5031b868d79 from '../../document/ringChart4/支持方法.vue'
</script>