## 1.基础用法
<demoe612026ccf86 />
```vue{4}
<template>
    <bar-chart-6 ref="chartRef" v-bind="chartOption"></bar-chart-6>
    <div class="line"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const seriesData = [
    {
        yAxisIndex: 0,
        data: [50, 130, 150, 182, 173, 184, 150, 18, 130, 150, 182, 173]
    },
    {
        yAxisIndex: 1,
        data: [52, 94, 61, 11, 52, 68, 58, 94, 61, 11, 52, 68]
    },
    {
        yAxisIndex: 0,
        data: [61, 11, 52, 68, 58, 94, 61, 11, 52, 68, 52, 94]
    }
];
const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月', '1-10月', '1-11月', '1-12月'];
const unit = ['万元', '%'];
const yAxisName = ['万元', '%'];
const legendData = ['申请', '审批', '完成'];

const chartOption = {
    unit,
    scale: 2,
    showCount: 6,
    xAxisData,
    yAxisName,
    seriesData,
    legendData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 180px;
    height: 380px;
    // width: 420px;
    // background-image: url('./bg.png');
    background-color: black;
}
</style>

```
## 属性
<demoe4ef4410955d />
<script setup>
import demoe612026ccf86 from '../../document/barChart6/1.基础用法.vue'
import demoe4ef4410955d from '../../document/barChart6/属性.vue'
</script>