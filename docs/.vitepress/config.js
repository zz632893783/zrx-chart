
import { SearchPlugin  } from 'vitepress-plugin-search'
import { defineConfig } from 'vitepress'
import path from 'path'

export default defineConfig({
    title: 'zrx-chart',
    description: 'A VitePress Site',
    // base: '/zrx-chart',
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
                    { text: 'barChart', link: '/document/barChart' },{ text: 'barChart2', link: '/document/barChart2' },{ text: 'barChart3', link: '/document/barChart3' },{ text: 'barChart4', link: '/document/barChart4' },{ text: 'barLineChart', link: '/document/barLineChart' },{ text: 'barLineChart2', link: '/document/barLineChart2' },{ text: 'barLineChart3', link: '/document/barLineChart3' },{ text: 'dashboardChart', link: '/document/dashboardChart' },{ text: 'lineChart', link: '/document/lineChart' },{ text: 'ringChart', link: '/document/ringChart' },{ text: 'ringChart2', link: '/document/ringChart2' },{ text: 'ringChart3', link: '/document/ringChart3' },{ text: 'ringChart4', link: '/document/ringChart4' },{ text: 'ringChart5', link: '/document/ringChart5' },{ text: 'ringChart6', link: '/document/ringChart6' },{ text: 'ringChart7', link: '/document/ringChart7' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/zz632893783/zrx-chart' }
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

