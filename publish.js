// 只将发布所需要的文件，存入一个临时的目录，减小发布模块的体积
import fs from 'fs';
const publishPath = './publishDir';
// 清空文档目录
fs.existsSync(publishPath) && fs.rmSync(publishPath, { recursive: true, force: true });
// 如果目录不存在，则创建目录
fs.mkdirSync(publishPath);
// 创建工具文件夹（与项目目录保持一致）
!fs.existsSync(`${ publishPath }/utils`) && fs.mkdirSync(`${ publishPath }/utils`);
// 复制工具函数
fs.copyFileSync('./utils/index.js', `${ publishPath }/utils/index.js`);
// 每次自动将版本最后一位 + 1
const packageJsonContent = fs.readFileSync('./package.json').toString().replace(/(?<="version": *"\d+\.\d+\.)\d+(?=")/, c => (Number(c) + 1).toString());
// 在发布目录下写入 package.json
fs.writeFileSync('./package.json', packageJsonContent);
// 发布包中的 packageJson
const publishPackageJson = JSON.parse(packageJsonContent);
// 删除无用 script
delete publishPackageJson.scripts;
// 匹配 vue 版本
const vueVersion = (publishPackageJson.dependencies.vue.match(/[^"]+/) || ['^3.3.4'])[0];
// 匹配 echarts 版本
const echartsVersion = (publishPackageJson.devDependencies.echarts.match(/[^"]+/) || ['^5.5.0'])[0];
// 重新指定 dependencies devDependencies 中 vue 与 echarts 版本
publishPackageJson.dependencies = { vue: vueVersion };
publishPackageJson.devDependencies = { echarts: echartsVersion };
// 生成打包所用的 package.json （只含有必要的 vue 与 echarts 这俩依赖）
fs.writeFileSync(`${ publishPath }/package.json`, JSON.stringify(publishPackageJson, null, 2));
// 将入口文件复制到发布目录
fs.copyFileSync('./index.js', `${ publishPath }/index.js`);
// 发布目录下，创建组件文件夹
fs.mkdirSync(`${ publishPath }/components`);
// 拿到 “根路径/components” 下的所有 .vue 组件
const components = fs.readdirSync('./components')
    .filter(path => !fs.statSync(`./components/${ path }`).isDirectory())
    .filter(path => path.match(/\.vue$/));
// 将组件复制到 “发布目录/components” 中
components.forEach(file => fs.copyFileSync(`./components/${ file }`, `${ publishPath }/components/${ file }`));
