## 1.基础用法
<demo2ff0b90f03d7 />
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
<demod1f4088677dd />
## 支持方法
<demoe58f703b714a />
<script setup>
import demo2ff0b90f03d7 from '../../document/ringChart4/1.基础用法.vue'
import demod1f4088677dd from '../../document/ringChart4/属性.vue'
import demoe58f703b714a from '../../document/ringChart4/支持方法.vue'
</script>