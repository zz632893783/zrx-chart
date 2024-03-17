
import { SearchPlugin  } from 'vitepress-plugin-search'
import { defineConfig } from 'vitepress'
import path from 'path'

export default defineConfig({
    title: 'zrx-chart',
    description: 'A VitePress Site',
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
                    { text: 'barChart', link: '/document/barChart' },{ text: 'barChart2', link: '/document/barChart2' },{ text: 'barLineChart', link: '/document/barLineChart' },{ text: 'barLineChart2', link: '/document/barLineChart2' },{ text: 'dashboardChart', link: '/document/dashboardChart' },{ text: 'elderlyBarLineChart', link: '/document/elderlyBarLineChart' },{ text: 'elderlyHorizontalBarChart', link: '/document/elderlyHorizontalBarChart' },{ text: 'elderlyRingBarChart', link: '/document/elderlyRingBarChart' },{ text: 'elderlyRingChart', link: '/document/elderlyRingChart' },{ text: 'elderlyRingChart2', link: '/document/elderlyRingChart2' },{ text: 'horizontalBarChart', link: '/document/horizontalBarChart' },{ text: 'lineChart', link: '/document/lineChart' },{ text: 'ringBarChart', link: '/document/ringBarChart' },{ text: 'ringChart', link: '/document/ringChart' },{ text: 'ringChart2', link: '/document/ringChart2' },{ text: 'ringChart3', link: '/document/ringChart3' },{ text: 'ringProgressChart', link: '/document/ringProgressChart' }
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

