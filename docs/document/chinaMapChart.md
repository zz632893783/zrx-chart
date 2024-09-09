## 1.基础用法(画像app)
<demodb132858abcb />
```vue{4}
<template>
    <china-map-chart ref="chartRef" v-bind="chartOption"></china-map-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const chartOption = {
    range: [0, 200],
    seriesData: [
        { name: '黑龙江省', 'value': 1 },
        { name: '浙江省', 'value': 44 },
        { name: '四川省', 'value': 40 },
        { name: '江苏省', 'value': 8 },
        { name: '安徽省', 'value': 93 },
        { name: '海南省', 'value': 140 },
        { name: '河南省', 'value': 178 }
    ]
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    // width: 375px;
    // height: 300px;
    width: 750px;
    height: 600px;
    background-color: white;
}
</style>

```
## 属性
<demo6d7a57386106 />
<script setup>
import demodb132858abcb from '../../document/chinaMapChart/1.基础用法(画像app).vue'
import demo6d7a57386106 from '../../document/chinaMapChart/属性.vue'
</script>