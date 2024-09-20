## 1.基础用法
<demobefa8e316755 />
```vue{4}
<template>
    <bar-chart-8 ref="chartRef" v-bind="option"></bar-chart-8>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();
// 组合配置项
const option = {
    scale: .5,
    showLegend: false,
    unit: '亿元',
    yAxisData: [
        ['农副食品加工业可比价产值', '酒、饮料和精制茶制造业可比价产值', '纺织服装、服饰业可比价产值', '造纸和纸制品业可比价产值', '化学原料和化学制品制造业可比价产值', '医药制造业可比价产值']
    ],
    seriesData: [
        [54, -89, -86, 65, 54, 53],
        [95, -97, 75, 72, 90, -88]
    ],
    legendData: ['统计金额', '开票金额'],
    beforeSetOption: option => option.yAxis.forEach(yAxis => yAxis.axisLabel.formatter = name => name.replace(/(?<=^(.{6})+)(?!$)/g, '\n'))
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    height: 664px;
    background-color: white;
}
</style>
```
## 属性
<demo2b825248a229 />
<script setup>
import demobefa8e316755 from '../../document/barChart8/1.基础用法.vue'
import demo2b825248a229 from '../../document/barChart8/属性.vue'
</script>