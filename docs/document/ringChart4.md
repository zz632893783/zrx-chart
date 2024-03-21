## 1.基础用法
<demo82dbf4ed5999 />
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
<demo2ae00d9731b2 />
## 支持方法
<demobf9eecc21d4d />
<script setup>
import demo82dbf4ed5999 from '../../document/ringChart4/1.基础用法.vue'
import demo2ae00d9731b2 from '../../document/ringChart4/属性.vue'
import demobf9eecc21d4d from '../../document/ringChart4/支持方法.vue'
</script>