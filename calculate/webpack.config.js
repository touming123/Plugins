var path = require('path');
var webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: __dirname + '/src/app.js', //入口文件
    output: {
        path: __dirname + '/dist', //打包后的文件存放地方
        filename: 'bundle.js' //打包后输出文件的文件名
    },
    devServer: {
        contentBase: __dirname, //本地服务器所加载的页面所在的目录
        historyApiFallback: true,
        inline: true,
        port: 3030
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ]
            }
        ]
    }


}