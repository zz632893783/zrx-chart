## 1.基础用法
<demo39554d06b1ab />
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
<democc9997540c33 />
## 支持方法
<demo7a842cb958b5 />
<script setup>
import demo39554d06b1ab from '../../document/ringChart4/1.基础用法.vue'
import democc9997540c33 from '../../document/ringChart4/属性.vue'
import demo7a842cb958b5 from '../../document/ringChart4/支持方法.vue'
</script>