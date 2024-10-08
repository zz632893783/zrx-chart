
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
                    { text: 'barChart', link: '/document/barChart' },{ text: 'barChart2', link: '/document/barChart2' },{ text: 'barChart3', link: '/document/barChart3' },{ text: 'barChart4', link: '/document/barChart4' },{ text: 'barChart5', link: '/document/barChart5' },{ text: 'barChart6', link: '/document/barChart6' },{ text: 'barChart7', link: '/document/barChart7' },{ text: 'barChart8', link: '/document/barChart8' },{ text: 'barLineChart', link: '/document/barLineChart' },{ text: 'barLineChart2', link: '/document/barLineChart2' },{ text: 'barLineChart3', link: '/document/barLineChart3' },{ text: 'barLineChart4', link: '/document/barLineChart4' },{ text: 'barLineChart5', link: '/document/barLineChart5' },{ text: 'barLineChart6', link: '/document/barLineChart6' },{ text: 'blurTip', link: '/document/blurTip' },{ text: 'chinaMapChart', link: '/document/chinaMapChart' },{ text: 'dashboardChart', link: '/document/dashboardChart' },{ text: 'gradientRingChart', link: '/document/gradientRingChart' },{ text: 'gradientRingChart2', link: '/document/gradientRingChart2' },{ text: 'lineChart', link: '/document/lineChart' },{ text: 'lineChart2', link: '/document/lineChart2' },{ text: 'lineChart3', link: '/document/lineChart3' },{ text: 'lineChart4', link: '/document/lineChart4' },{ text: 'radarChart', link: '/document/radarChart' },{ text: 'radarChart2', link: '/document/radarChart2' },{ text: 'ringChart', link: '/document/ringChart' },{ text: 'ringChart2', link: '/document/ringChart2' },{ text: 'ringChart3', link: '/document/ringChart3' },{ text: 'ringChart4', link: '/document/ringChart4' },{ text: 'ringChart5', link: '/document/ringChart5' },{ text: 'ringChart6', link: '/document/ringChart6' },{ text: 'ringChart7', link: '/document/ringChart7' },{ text: 'weatherChart', link: '/document/weatherChart' }
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

