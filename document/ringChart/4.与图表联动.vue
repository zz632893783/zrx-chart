<template>
    <ring-chart v-bind="chartOption" ref="chartRef"></ring-chart>
    <div class="legend">
        <template v-for="(n, i) in seriesData">
            <i :class="activeNames.includes(n.name) && 'active'" :style="`background-color: ${ color[i] };`" @click="toggleFn(n.name)"></i>
            <label @click="toggleFn(n.name)">{{ n.name }}</label>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const title = '企业总数';
const color = ['#d0f1ff', '#1dd1ff', '#b5bfe2', '#0e8fff'];
const seriesData = [
    { value: 123, name: '住宿业营业额' },
    { value: 234, name: '餐饮业营业额' },
    { value: 456, name: '零售业营业额' },
    { value: 567, name: '批发业营业额' }
];
const unit = '元';

let chart = null;
// 回调函数获取 chart 对象
const afterSetOption = (option, c) => (chart = c);

const chartOption = {
    unit,
    title,
    color,
    seriesData,
    afterSetOption
};

// 所要展示的数据项名称
const activeNames = ref(seriesData.map(n => n.name));
// 显示/隐藏数据项
const toggleFn = name => {
    const index = activeNames.value.indexOf(name);
    index >= 0 ? activeNames.value.splice(index, 1) : activeNames.value.push(name);
    chart.dispatchAction({
        type: 'legendToggleSelect',
        name,
        dataIndex: 0
    });
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.chart {
    width: 256px;
    height: 256px;
    background-color: rgb(3, 43, 68);
}
.legend {
    display: grid;
    grid-template-columns: repeat(4, 12px min-content);
    grid-column-gap: 4px;
    margin: 12px 0;
    align-items: center;
    i {
        cursor: pointer;
        height: 12px;
        &:not(.active) {
            background-color: rgba(200, 200, 200, 1) !important;
        }
    }
    label {
        white-space: nowrap;
        cursor: pointer;
        font-size: 14px;
    }
}
</style>