// 运行 handleExport.js 会重新生成 index.js
import barChart from './components/barChart.vue';
import barChart2 from './components/barChart2.vue';
import barChart3 from './components/barChart3.vue';
import barChart4 from './components/barChart4.vue';
import barLineChart from './components/barLineChart.vue';
import barLineChart2 from './components/barLineChart2.vue';
import barLineChart3 from './components/barLineChart3.vue';
import barLineChart4 from './components/barLineChart4.vue';
import dashboardChart from './components/dashboardChart.vue';
import gradientRingChart from './components/gradientRingChart.vue';
import lineChart from './components/lineChart.vue';
import radarChart from './components/radarChart.vue';
import ringChart from './components/ringChart.vue';
import ringChart2 from './components/ringChart2.vue';
import ringChart3 from './components/ringChart3.vue';
import ringChart4 from './components/ringChart4.vue';
import ringChart5 from './components/ringChart5.vue';
import ringChart6 from './components/ringChart6.vue';

export { barChart, barChart2, barChart3, barChart4, barLineChart, barLineChart2, barLineChart3, barLineChart4, dashboardChart, gradientRingChart, lineChart, radarChart, ringChart, ringChart2, ringChart3, ringChart4, ringChart5, ringChart6 };

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, opts = {}) {
    // 判断是否可以安装
    if (install.installed) {
        return;
    }
    // 注册组件（此段代码由 handleExport.js 自动生成，运行 handleExport.js 会重新生成 index.js）
    Vue.component('barChart', barChart);
    Vue.component('bar-chart', barChart);
    Vue.component('barChart2', barChart2);
    Vue.component('bar-chart2', barChart2);
    Vue.component('bar-chart-2', barChart2);
    Vue.component('barChart3', barChart3);
    Vue.component('bar-chart3', barChart3);
    Vue.component('bar-chart-3', barChart3);
    Vue.component('barChart4', barChart4);
    Vue.component('bar-chart4', barChart4);
    Vue.component('bar-chart-4', barChart4);
    Vue.component('barLineChart', barLineChart);
    Vue.component('bar-line-chart', barLineChart);
    Vue.component('barLineChart2', barLineChart2);
    Vue.component('bar-line-chart2', barLineChart2);
    Vue.component('bar-line-chart-2', barLineChart2);
    Vue.component('barLineChart3', barLineChart3);
    Vue.component('bar-line-chart3', barLineChart3);
    Vue.component('bar-line-chart-3', barLineChart3);
    Vue.component('barLineChart4', barLineChart4);
    Vue.component('bar-line-chart4', barLineChart4);
    Vue.component('bar-line-chart-4', barLineChart4);
    Vue.component('dashboardChart', dashboardChart);
    Vue.component('dashboard-chart', dashboardChart);
    Vue.component('gradientRingChart', gradientRingChart);
    Vue.component('gradient-ring-chart', gradientRingChart);
    Vue.component('lineChart', lineChart);
    Vue.component('line-chart', lineChart);
    Vue.component('radarChart', radarChart);
    Vue.component('radar-chart', radarChart);
    Vue.component('ringChart', ringChart);
    Vue.component('ring-chart', ringChart);
    Vue.component('ringChart2', ringChart2);
    Vue.component('ring-chart2', ringChart2);
    Vue.component('ring-chart-2', ringChart2);
    Vue.component('ringChart3', ringChart3);
    Vue.component('ring-chart3', ringChart3);
    Vue.component('ring-chart-3', ringChart3);
    Vue.component('ringChart4', ringChart4);
    Vue.component('ring-chart4', ringChart4);
    Vue.component('ring-chart-4', ringChart4);
    Vue.component('ringChart5', ringChart5);
    Vue.component('ring-chart5', ringChart5);
    Vue.component('ring-chart-5', ringChart5);
    Vue.component('ringChart6', ringChart6);
    Vue.component('ring-chart6', ringChart6);
    Vue.component('ring-chart-6', ringChart6);
};

export default { install, barChart, barChart2, barChart3, barChart4, barLineChart, barLineChart2, barLineChart3, barLineChart4, dashboardChart, gradientRingChart, lineChart, radarChart, ringChart, ringChart2, ringChart3, ringChart4, ringChart5, ringChart6 };