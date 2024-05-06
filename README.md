# 图表组件库

## [文档地址 Click me](https://zrx-chart.pages.dev/)

## 使用方法

### 安装
```bash{4}
npm install zrx-chart
```

#### 镜像源同步可能存在延迟，若要下载最新请从官方源下载
```bash{4}
npm install zrx-chart --save --registry=https://registry.npmjs.org
```

### 全局安装
```js{4}
import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router/index.js';
import zrxChart from 'zrx-chart';

const app = createApp(App);
app.use(router).use(zrxChart).mount('#app');
```

### 单个引入
```vue{4}
<template>
    <bar-chart style="height: 400px;" ref="chartRef"></bar-chart>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { barChart } from 'zrx-chart';

const chartRef = ref();
onMounted(() => chartRef.value.renderChart());
</script>        
```  


# 组件库维护（增、删、改）

### 增加组件
在 "根路径/components/" 目录下新增图表组件
然后在 "根路径/document/" 目录下，新建与组件同名的文件夹，文件夹中新建 .vue 用法案例
最后再次运行
```bash{4}
npm run doc
```

### 在线运行文档
```bash{4}
npm run doc
```  



# 组件库文档（基于 vitepress）


### 文档打包
```bash{4}
npm run docs:build
```

打包后文档位于 "根路径/docs/.vitepress/dist/" 目录下

按照正常 vue 项目类似方式部署



# 组件 npm 发布

运行根路径下 publish.js 脚本

### 公网发布
```bash{4}
node publish.js public updateVersion
```
其中参数 public 表示在公网发布，参数 updateVersion 表示读取当前版本后，自动将组建小版本 + 1，例如当前版本 1.0.2 会被自动更新为 1.0.3
之后会在跟路径下生成 publishDir 目录，然后 cd ./publishDir 进入发布目录后
```bash{4}
npm publish
```
发布

package.json 下已配置完成发布脚本，运行
```bash{4}
npm run publicPublish
```

### 私服发布（运行根目录下 publish.js 脚本）
```bash{4}
node publish.js private updateVersion
```
其中参数 private 表示在私服发布，参数 updateVersion 表示读取当前版本后，自动将组建小版本 + 1，例如当前版本 1.0.2 会被自动更新为 1.0.3
之后会在跟路径下生成 publishDir 目录，然后 cd ./publishDir 进入发布目录后
```bash{4}
npm publish
```
发布

package.json 下已配置完成发布脚本，运行
```bash{4}
npm run privatePublish
```

### 公网/私服一键发布
```bash{4}
npm run publish
```
会依次在公网/私服发布