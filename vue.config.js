const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
        if (process.env.NODE_ENV === 'production') {
            return {
                plugin: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/,
                    threshold: 10240,
                    deleteOriginalAssets: false
                })]
            }
        }
    },
    publicPath: '/boss/',
    devServer: {
        port: 8085, // 端口号
        host: 'localhost',
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
        proxy: {
            '/watter': {
                target: '106.54.44.66:8080',
                ws: true,
                changeOrigin: true
            }
        },  // 配置多个代理
    }
}
