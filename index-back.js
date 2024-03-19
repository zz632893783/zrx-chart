import barChart from './components/barChart.vue';
import barChart2 from './components/barChart2.vue';
import barChart3 from './components/barChart3.vue';
import barChart4 from './components/barChart4.vue';
import lineChart from './components/lineChart.vue';
import barLineChart from './components/barLineChart.vue';
import barLineChart2 from './components/barLineChart2.vue';
import barLineChart3 from './components/barLineChart3.vue';
import dashboardChart from './components/dashboardChart.vue';
import ringChart from './components/ringChart.vue';
import ringChart2 from './components/ringChart2.vue';
import ringChart3 from './components/ringChart3.vue';
import ringChart4 from './components/ringChart4.vue';
import ringChart5 from './components/ringChart5.vue';
import ringChart6 from './components/ringChart6.vue';

const charts = {
    barChart, barChart2, barLineChart, barLineChart2, dashboardChart, barLineChart3, barChart3, ringChart4,
    ringChart5, ringChart6, barChart4, lineChart, ringChart, ringChart2, ringChart3
}

export {
    barChart, barChart2, barLineChart, barLineChart2, dashboardChart, barLineChart3, barChart3, ringChart4,
    ringChart5, ringChart6, barChart4, lineChart, ringChart, ringChart2, ringChart3
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
            const splitAlias = alias.replace(/(?<=[a-z\d])\d+/g, (c) => `-${ c }`).replace(/\d+(?=[a-z\d])/g, (c) => `${ c }-`);
            alias !== splitAlias && Vue.component(splitAlias, charts[name]);
        }
    }
}

export default {
    install,
    barChart, barChart2, barLineChart, barLineChart2, dashboardChart, barLineChart3, barChart3, ringChart4,
    ringChart5, ringChart6, barChart4, lineChart, ringChart, ringChart2, ringChart3
}
