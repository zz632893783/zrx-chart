// 用于处理自动生成包的导出模块即入口文件 '/index.js';
import fs from 'fs';
// 导出 index.js 存放的字符串数组
const exportContent = ['// 运行 handleExport.js 会重新生成 index.js'];
// 读取 根路径/components 目录下的所有 .vue 组件
const names = fs.readdirSync('./components')
    .filter(path => !fs.statSync(`./components/${ path }`).isDirectory())
    .filter(path => path.match(/\.vue$/))
    .map(path => path.replace(/\.vue$/, ''));
// 存入导出内容数组中
exportContent.push(...names.map(n => `import ${ n } from './components/${ n }.vue';`));
exportContent.push(`\nexport { ${ names.join(', ') } };`);
exportContent.push(`
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, opts = {}) {
    // 判断是否可以安装
    if (install.installed) {
        return;
    }
    // 注册组件（此段代码由 handleExport.js 自动生成，运行 handleExport.js 会重新生成 index.js）
    ${
        names.reduce((x, y, i) => {
            x.push(`${ i === 0 ? '' : '    ' }Vue.component('${ y }', ${ y });`);
            if (y.match(/(?<=[a-z\d])[A-Z]/)) {
                // 计算出 bar-chart 这样的组件名
                const alias = y.replace(/(?<=[a-z\d])[A-Z]/, c => `-${ c.toLowerCase() }`);
                x.push(`    Vue.component('${ alias }', ${ y });`);
                // 计算出 ring-chart-2-canvas-3 这样的别名
                const splitAlias = alias.replace(/(?<=[a-z\d])\d+/g, c => `-${ c }`).replace(/\d+(?=[a-z\d])/g, (c) => `${ c }-`);
                alias !== splitAlias && x.push(`    Vue.component('${ splitAlias }', ${ y });`);
            }
            return x;
        }, []).join('\n')
    }
};`);
// 设置 export default 增加 install 方法
exportContent.push(`\nexport default { install, ${ names.join(', ') } };`);
// 将文本作为 js 写入 ./index.js 中
fs.writeFileSync(`./index.js`, exportContent.join('\n'));
