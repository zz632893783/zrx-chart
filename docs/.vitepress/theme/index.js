import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
export default {
    ...DefaultTheme,
    NotFound: () => '404',
    enhanceApp: async ctx => {
        const { app } = ctx;
        DefaultTheme.enhanceApp(ctx);
        app.use(ElementPlus);
        app.mixin({
            mounted: () => {
                import('../../../index.js').then(zrxChart => {
                    app.use(zrxChart.default);
                });
            }
        });
    }
};
