# 图表组件库

## 使用方法

### 安装
```bash{4}
npm install zrx-chart
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

### 发布
```bash{4}
npm publish --registry http://10.10.120.191:8081/repository/npm-group/
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