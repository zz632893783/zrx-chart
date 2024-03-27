## 1.带线段标签
<demo8a1edc20506d />
```vue{4}
<template>
    <ring-chart-2 v-bind="chartOption" ref="chartRef"></ring-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const radius = [45, 82];
const color = ['#d6f0fd', '#396c87', '#60d2ec', '#b8bee0', '#408df7'];
const seriesData = [
    { value: 2, name: '文化、体育和娱乐业' },
    { value: 3, name: '居民服务、修理和其他' },
    { value: 5, name: '科学研究和技术服务业' },
    { value: 4, name: '租赁和商务服务业' },
    { value: 3, name: '物联网、软件和信息服务' }
];
const title = '企业总数';
const unit = '家';
const chartOption = {
    radius,
    color,
    seriesData,
    title,
    unit
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 440px;
    height: 296px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 2.中心自定义
<demo5e009574c380 />
```vue{4}
<template>
    <ring-chart-2 v-bind="chartOption" ref="chartRef">
        <h4 style="font-size: 16px; color: red; font-weight: 600;">自定义中心</h4>
    </ring-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const radius = [45, 82];
const color = ['#d6f0fd', '#396c87', '#60d2ec', '#b8bee0', '#408df7'];
const seriesData = [
    { value: 2, name: '文化、体育和娱乐业' },
    { value: 3, name: '居民服务、修理和其他' },
    { value: 5, name: '科学研究和技术服务业' },
    { value: 4, name: '租赁和商务服务业' },
    { value: 3, name: '物联网、软件和信息服务' }
];
const title = '企业总数';
const unit = '家';
const chartOption = {
    radius,
    color,
    seriesData,
    title,
    unit
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 440px;
    height: 296px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 3.自定义标签
<demoe600e207afe7 />
```vue{4}
<template>
    <ring-chart-2 v-bind="chartOption" ref="chartRef"></ring-chart-2>
    <p style="font-size: 14px; line-height: 1.5; padding: 12px 0;">
        自定义标签富文本对应名<br/>
        title: label标题<br/>
        split: 上下分割线<br/>
        value: 数值<br/>
        unit: 单位<br/>
        colGap: 左右间距<br/>
        flat: 持平的图标<br/>
        rise: 上升图标<br/>
        fall: 下降图标<br/>
    </p>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const radius = [62, 86];
const labelFormatter = param => {
    const rate = param.data.rate;
    const formatterArray = [
        `{title|${ param.name }}\n`,
        '{split|}\n',
        `{value|${ param.value }}`,
        `{unit|${ unit }}`,
        '{colGap|}',
        `{value|${ param.percent }}`,
        '{unit|%}',
        '{colGap|}',
        `{value|${ rate }}`,
        '{unit|%}',
        '{unit|同比增速}'
    ];
    formatterArray.push(rate === 0 ? '{flat|}' : (rate > 0 ? '{rise|}' : '{fall|}'));
    return formatterArray.join('');
};
const color = ['#d6f0fd', '#396c87', '#60d2ec', '#b8bee0', '#408df7'];
const seriesData = [
    { value: 2, name: '文化、体育和娱乐业', rate: 1.2 },
    { value: 3, name: '居民服务、修理和其他', rate: -2.3 },
    { value: 5, name: '科学研究和技术服务业', rate: 0 },
    { value: 4, name: '租赁和商务服务业', rate: 1.2 },
    { value: 3, name: '物联网、软件和信息服务', rate: -2.3 }
];
const title = '企业总数';
const unit = '家';
const edgeDistance = 80;
const chartOption = {
    radius,
    color,
    seriesData,
    title,
    unit,
    labelFormatter,
    edgeDistance
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 740px;
    height: 256px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 4.绑定原生html属性
<demo1691cd882656 />
```vue{4}
<template>
    <ring-chart-2 v-bind="chartOption" ref="chartRef"></ring-chart-2>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const seriesData = [
    { value: 2, name: '文化、体育和娱乐业' },
    { value: 3, name: '居民服务、修理和其他' },
    { value: 5, name: '科学研究和技术服务业' }
];

const chartOption = {
    seriesData,
    afterSetOption: (option, chart) => {
        chart.on('mouseover', param => chartRef.value.$refs.chartRef.title = param.name);
        chart.on('mouseout', param => chartRef.value.$refs.chartRef.title = '');
    }
};

onMounted(() => chartRef.value.renderChart());
</script>
<style lang="scss" scoped>
.zrx-chart {
    width: 440px;
    height: 256px;
    background-color: rgb(3, 43, 68);
}
</style>
```
## 属性
<demo14f8781f2c97 />
## 支持方法
<demo79d64daf4189 />
<script setup>
import demo8a1edc20506d from '../../document/ringChart2/1.带线段标签.vue'
import demo5e009574c380 from '../../document/ringChart2/2.中心自定义.vue'
import demoe600e207afe7 from '../../document/ringChart2/3.自定义标签.vue'
import demo1691cd882656 from '../../document/ringChart2/4.绑定原生html属性.vue'
import demo14f8781f2c97 from '../../document/ringChart2/属性.vue'
import demo79d64daf4189 from '../../document/ringChart2/支持方法.vue'
</script>