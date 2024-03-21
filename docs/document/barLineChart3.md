## 1.基础用法
<demod7a3e94ca23d />
```vue{4}
<template>
    <bar-line-chart-3 v-bind="chartOption" ref="chartRef"></bar-line-chart-3>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        // 需要指定 y 轴索引
        yAxisIndex: 0,
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [81, 17, 30, 94, 45, 54, 60, 1, 69]
    }
];
const yAxisName = ['亿元', '%'];
const legendData = ['销售额', '贸易额'];
const chartOption = {
    showCount: 3,
    xAxisData,
    seriesData,
    yAxisName,
    legendData
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
## 2.只有折线
<demo814fd6132691 />
```vue{4}
<template>
    <bar-line-chart-3 v-bind="chartOption" ref="chartRef"></bar-line-chart-3>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'line',
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'line',
        data: [81, 17, 30, 94, 45, 54, 60, 1, 69]
    }
];
const color = ['yellow', 'celeste'];
const yAxisName = ['亿元', '%'];
const legendData = ['销售额', '贸易额'];
const showLineArea = true;
const markLine = [
    {
        value: 77,
        yAxisIndex: 0,
        color: '#F74768'
    }
];
const beforeSetOption = option => {
    option.series.forEach(item => item.type === 'line' && (item.markLine.data[0].label.formatter = param => `目标增速：{value|${ param.value }}`));
};
const chartOption = {
    showCount: 3,
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color,
    showLineArea,
    markLine,
    beforeSetOption
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
## 3.只有折线
<demod88831b898fa />
```vue{4}
<template>
    <bar-line-chart-3 v-bind="chartOption" ref="chartRef"></bar-line-chart-3>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'line',
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'line',
        data: [81, 17, 30, 94, 45, 54, 60, 1, 69]
    },
    {
        type: 'line',
        data: [82, 85, 74, 70, 63, 85, 62, 50, 69, 65]
    },
    {
        type: 'line',
        data: [88, 53, 96, 80, 100, 93, 77, 84, 71, 80]
    },
    {
        type: 'line',
        data: [59, 94, 86, 70, 93, 80, 74, 93, 85, 90]
    }
];
const color = ['yellow', 'celeste', 'green', 'grey', 'pink'];
const yAxisName = ['亿元'];
const legendData = ['香洲区', '金湾区', '斗门区', '高新区', '鹤洲新区'];
const chartOption = {
    showCount: 3,
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color
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
## 4.混合
<demob4e829d1d538 />
```vue{4}
<template>
    <bar-line-chart-3 v-bind="chartOption" ref="chartRef"></bar-line-chart-3>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const chartRef = ref();

const xAxisData = ['1月', '1-2月', '1-3月', '1-4月', '1-5月', '1-6月', '1-7月', '1-8月', '1-9月'];
const seriesData = [
    {
        // 需要指定类型
        type: 'bar',
        data: [163, 129, 123, 198, 152, 152, 178, 133, 193]
    },
    {
        type: 'bar',
        data: [81, 17, 30, 94, 45, 54, 60, 1, 69]
    },
    {
        type: 'bar',
        data: [82, 85, 74, 70, 63, 85, 62, 50, 69, 65]
    },
    {
        type: 'bar',
        data: [88, 53, 96, 80, 100, 93, 77, 84, 71, 80]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [59, 94, 86, 70, 93, 80, 74, 93, 85, 90]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [83, 86, 62, 83, 70, 82, 97, 59, 74, 80]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [90, 67, 74, 76, 70, 93, 54, 97, 90, 68]
    },
    {
        type: 'line',
        yAxisIndex: 1,
        data: [66, 73, 58, 91, 95, 84, 51, 73, 91, 82]
    }
];
const beforeSetOption = option => {
	option.legend.show = false;
	option.series.forEach((n, i) => {
		n.label.show = n.showBackground = false;
		if (n.type === 'bar') {
			n.barWidth = 20 / 1080 * window.innerHeight;
			n.barGap = `${ 12 / 20 * 100 }%`;
		}
	})
};
const color = ['blue', 'green', 'celeste', 'grey', 'blue', 'green', 'celeste', 'grey'];
const yAxisName = ['亿元', '%'];
const legendData = ['柱状图0', '柱状图1', '柱状图2', '柱状图3', '折线图0', '折线图1', '折线图2', '折线图3'];
const chartOption = {
    showCount: 3,
    xAxisData,
    seriesData,
    yAxisName,
    legendData,
    color,
    beforeSetOption
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
<demoa41be0095684 />
## 支持方法
<demo483e87a0f840 />
<script setup>
import demod7a3e94ca23d from '../../document/barLineChart3/1.基础用法.vue'
import demo814fd6132691 from '../../document/barLineChart3/2.只有折线.vue'
import demod88831b898fa from '../../document/barLineChart3/3.只有折线.vue'
import demob4e829d1d538 from '../../document/barLineChart3/4.混合.vue'
import demoa41be0095684 from '../../document/barLineChart3/属性.vue'
import demo483e87a0f840 from '../../document/barLineChart3/支持方法.vue'
</script>