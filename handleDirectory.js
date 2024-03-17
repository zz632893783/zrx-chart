import fs from 'fs';

const documentDir = './document';
// 读取 根路径/document 目录下的文件夹
const paths = fs.readdirSync(documentDir);
//过滤出其中的文件夹
const folders = paths.filter(path => fs.statSync(`${ documentDir }/${ path }`).isDirectory());
// 根据文件夹-示例文件名生成文档目录
const directory = [];
folders.forEach(folder => {
    // 某种图表目录下，示例文件的路径
    const examples = fs.readdirSync(`${ documentDir }/${ folder }`);
    if (!examples.length) {
        return false;
    }
    directory.push({
        name: folder,
        children: examples.map(n => ({ name: n }))
    });
});

const docsConfigStr = `
import { SearchPlugin  } from 'vitepress-plugin-search'
import { defineConfig } from 'vitepress'
import path from 'path'

export default defineConfig({
    title: 'zrx-chart',
    description: 'A VitePress Site',
    base: '/zrx-chart',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '快速开始', link: '/install' }
        ],
        sidebar: [
            {
                text: '快速开始',
                items: [
                    { text: '安装', link: '/install' }
                ]
            },
            {
                text: '组件',
                items: [
                    ${ directory.map(n => `{ text: '${ n.name }', link: '/document/${ n.name }' }`).join(',') }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    },
    vite: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        server: {
            host: '0.0.0.0',
            port: 9999
        },
        plugins: [
            SearchPlugin({
                encode: false,
                tokenize: 'full',
                previewLength: 62,
                buttonLabel: 'Search',
                placeholder: 'Search docs',
                allow: [],
                ignore: ['demo'],
            })
        ]
    }
})

`;
fs.writeFileSync(`./docs/.vitepress/config.js`, docsConfigStr);
// 如果目录不存在，则创建目录
!fs.existsSync('./docs/document') && fs.mkdirSync('./docs/document');
// !fs.existsSync(outputPath) && fs.mkdirSync(outputPath);
directory.forEach(item => {
    const contents = item.children.map(n => {
        // 随机计算一个组件名，确保不重复
        const demoName = `demo${ new Array(12).fill().map(() => Math.floor(Math.random() * 16).toString(16)).join('') }`;
        return {
            demoName,
            path: `../../document/${ item.name }/${ n.name }`,
            content: [
                // 锚点标题
                `## ${ n.name.replace(/\.[a-zA-Z\d]+$/, '') }`,
                // 引入组件
                `<${ demoName } />`,
                // 代码起始标志
                '```vue{4}',
                // 例子代码
                fs.readFileSync(`./document/${ item.name }/${ n.name }`).toString(),
                // 代码结束标志
                '```'
            ].join('\n')
        };
    });
    const readmeContent = [
        ...contents.map(n => n.content),
        '<script setup>',
        ...contents.map(n => `import ${ n.demoName } from '${ n.path }'`),
        '</script>'
    ].join('\n');
    fs.writeFileSync(`./docs/document/${ item.name }.md`, readmeContent);
});