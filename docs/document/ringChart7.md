## 1.基础用法(画像app)
<demo6154ab0935f3 />
```vue{4}
<template>
    <ring-chart-7 ref="chartRef" v-bind="chartOption"></ring-chart-7>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
const unit = '单位';

const seriesData = [
    { value: 1048, name: '专利' },
    { value: 735, name: '作品著作权' },
    { value: 580, name: '软件著作权' },
    { value: 484, name: '网站' },
    { value: 484, name: '资质证书' },
    { value: 484, name: '商标' }
];
// 组合配置项
const chartOption = {
    unit: '个',
    title: '累计知识产权数',
    centerDisplay: 'sum',
    seriesData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 340px;
    background-color: white;
}
</style>

```
## 属性
<demo6323441fafba />
<script setup>
import demo6154ab0935f3 from '../../document/ringChart7/1.基础用法(画像app).vue'
import demo6323441fafba from '../../document/ringChart7/属性.vue'
</script>