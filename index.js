import barChart from './components/barChart.vue';
import barChart2 from './components/barChart2.vue';
import barLineChart from './components/barLineChart.vue';
import barLineChart2 from './components/barLineChart2.vue';
import dashboardChart from './components/dashboardChart.vue';
import elderlyBarLineChart from './components/elderlyBarLineChart.vue';
import elderlyHorizontalBarChart from './components/elderlyHorizontalBarChart.vue';
import elderlyRingBarChart from './components/elderlyRingBarChart.vue';
import elderlyRingChart from './components/elderlyRingChart.vue';
import elderlyRingChart2 from './components/elderlyRingChart2.vue';
import horizontalBarChart from './components/horizontalBarChart.vue';
import ringBarChart from './components/ringBarChart.vue';
import lineChart from './components/lineChart.vue';
import ringChart from './components/ringChart.vue';
import ringChart2 from './components/ringChart2.vue';
import ringChart3 from './components/ringChart3.vue';
import ringProgressChart from './components/ringProgressChart.vue';

const charts = {
    barChart, barChart2, barLineChart, barLineChart2, dashboardChart, elderlyBarLineChart, elderlyHorizontalBarChart, elderlyRingBarChart,
    elderlyRingChart, elderlyRingChart2, horizontalBarChart, lineChart, ringBarChart, ringChart, ringChart2, ringChart3, ringProgressChart
}

export {
    barChart, barChart2, barLineChart, barLineChart2, dashboardChart, elderlyBarLineChart, elderlyHorizontalBarChart, elderlyRingBarChart,
    elderlyRingChart, elderlyRingChart2, horizontalBarChart, lineChart, ringBarChart, ringChart, ringChart2, ringChart3, ringProgressChart
};

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, opts = {}) {
    // 判断是否可以安装
    if (install.installed) {
        return
    }
    for (const name in charts) {
        Vue.component(name, charts[name]);
        // 计算出 bar-chart 这样的组件名
        if (name.match(/(?<=[a-z\d])[A-Z]/)) {
            let alias = name.replace(/(?<=[a-z\d])[A-Z]/, c => `-${ c.toLowerCase() }`);
            Vue.component(alias, charts[name]);
            // 计算出 ring-chart-2-canvas-3 这样的别名
            const splitAlias = alias.replace(/(?<=[a-z\d])\d+/g, (c) => `-${ c }`).replace(/\d+(?=[a-z\d])/g, (c) => `${ c }-`)
            alias !== splitAlias && Vue.component(splitAlias, charts[name]);
        }
    }
}

export default {
    install,
    barChart, barChart2, barLineChart, barLineChart2, dashboardChart, elderlyBarLineChart, elderlyHorizontalBarChart, elderlyRingBarChart,
    elderlyRingChart, elderlyRingChart2, horizontalBarChart, lineChart, ringBarChart, ringChart, ringChart2, ringChart3, ringProgressChart
}
