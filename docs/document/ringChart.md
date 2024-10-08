## 1.只有圆环
<demo4d6ee702c0ad />
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
    // background-color: rgb(3, 43, 68);
}
</style>
```
## 2.中心部分总量
<demoedcea200852f />
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
<demo2421a8ad10ed />
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
<demo08a1607461b3 />
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
<demo1a9337e252ae />
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
## 6.插槽
<democ2a8cc26ec91 />
```vue{4}
<template>
    <ring-chart v-bind="chartOption" ref="chartRef">
        <div style="text-align: center;">
            <h4 style="font-size: 24px; color: red;">标题</h4>
            <span style="font-size: 16px; color: yellow;">{{ '12345678'.replace(/(?=(\d{3})+$)(?!^)/g, ',') }}</span>
        </div>
    </ring-chart>
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
<demo76501c770246 />
## 支持方法
<demo06043b947df4 />
<script setup>
import demo4d6ee702c0ad from '../../document/ringChart/1.只有圆环.vue'
import demoedcea200852f from '../../document/ringChart/2.中心部分总量.vue'
import demo2421a8ad10ed from '../../document/ringChart/3.中心部分单项.vue'
import demo08a1607461b3 from '../../document/ringChart/4.与图表联动.vue'
import demo1a9337e252ae from '../../document/ringChart/5.中心只显示值.vue'
import democ2a8cc26ec91 from '../../document/ringChart/6.插槽.vue'
import demo76501c770246 from '../../document/ringChart/属性.vue'
import demo06043b947df4 from '../../document/ringChart/支持方法.vue'
</script>