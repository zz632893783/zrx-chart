## 1.只有圆环
<demo1c217b002268 />
```vue{4}
<template>
    <ring-chart v-bind="chartOption" ref="chartRef"></ring-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const radius = [80, 90];
const seriesData = [
    { value: 2, name: '住宿业营业额' },
    { value: 3, name: '餐饮业营业额' },
    { value: 5, name: '零售业营业额' },
    { value: 4, name: '批发业营业额' }
];
const chartOption = {
    radius,
    seriesData
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 256px;
    height: 256px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.中心部分总量
<demo5016f0beac62 />
```vue{4}
<template>
    <ring-chart v-bind="chartOption" ref="chartRef"></ring-chart>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const centerDisplay = 'sum';
const title = '企业总数';
const unit = '家';
const seriesData = [
    { value: 123, name: '住宿业营业额' },
    { value: 234, name: '餐饮业营业额' },
    { value: 456, name: '零售业营业额' },
    { value: 567, name: '批发业营业额' }
];
const chartOption = {
    title,
    unit,
    seriesData,
    centerDisplay
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 256px;
    height: 256px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 3.中心部分单项
<demo3df900cf0468 />
```vue{4}
<template>
    <ring-chart v-bind="chartOption" ref="chartRef"></ring-chart>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const chartRef = ref();

const color = ['#d0f1ff', '#1dd1ff', '#b5bfe2', '#0e8fff'];
const seriesData = [
    { value: 2, name: '住宿业营业额' },
    { value: 3, name: '餐饮业营业额' },
    { value: 5, name: '零售业营业额' },
    { value: 4, name: '批发业营业额' }
];
// 单项显示
const centerDisplay = 'item';
const unit = '万元';

let timer = null;
const afterSetOption = (option, chart) => {
    let dataIndex = 0;
    // 自动轮播函数
    const autoPlay = () => {
        chart.dispatchAction({ type: 'downplay', dataIndex });
        dataIndex = (dataIndex + 1) % seriesData.length;
        chart.dispatchAction({ type: 'highlight', dataIndex });
    };
    timer = setInterval(autoPlay, 1000);
    // 鼠标移动暂停轮播
    chart.on('mousemove', e => {
        chart.dispatchAction({ type: 'downplay', dataIndex });
        dataIndex = e.dataIndex
        chart.dispatchAction({ type: 'highlight', dataIndex });
        clearInterval(timer);
    });
    // 鼠标离开重新开始轮播
    chart.on('mouseout', () => (timer = setInterval(autoPlay, 1000)));
};
const chartOption = {
    unit,
    color,
    seriesData,
    centerDisplay,
    afterSetOption
};

onMounted(() => chartRef.value.renderChart());

onBeforeUnmount(() => {
    timer && clearInterval(timer);
    timer = null;
});
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 200px;
    height: 200px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 4.与图表联动
<demo4186a6cb8d56 />
```vue{4}
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
.zrx-chart {
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
```
## 5.中心只显示值
<demo4e63b78c6fad />
```vue{4}
<template>
    <ring-chart v-bind="chartOption" ref="chartRef"></ring-chart>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const chartRef = ref();

const color = ['#d0f1ff', '#1dd1ff', '#b5bfe2', '#0e8fff'];
const seriesData = [
    { value: 2, name: '住宿业营业额' },
    { value: 3, name: '餐饮业营业额' },
    { value: 5, name: '零售业营业额' },
    { value: 4, name: '批发业营业额' }
];
// 单项显示
const centerDisplay = 'itemValue';
const unit = '%';

const chartOption = {
    unit,
    color,
    seriesData,
    centerDisplay
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 200px;
    height: 200px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<demo3f244c436cd1 />
## 支持方法
<demo80c11d8ef7e3 />
<script setup>
import demo1c217b002268 from '../../document/ringChart/1.只有圆环.vue'
import demo5016f0beac62 from '../../document/ringChart/2.中心部分总量.vue'
import demo3df900cf0468 from '../../document/ringChart/3.中心部分单项.vue'
import demo4186a6cb8d56 from '../../document/ringChart/4.与图表联动.vue'
import demo4e63b78c6fad from '../../document/ringChart/5.中心只显示值.vue'
import demo3f244c436cd1 from '../../document/ringChart/属性.vue'
import demo80c11d8ef7e3 from '../../document/ringChart/支持方法.vue'
</script>