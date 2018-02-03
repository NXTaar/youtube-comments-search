const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = require('config')

const projectDir = process.cwd()

const HTMLSettings = {
    template: 'client/index.html',
    inject: 'body'
}

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(projectDir, 'client', 'app')
    ],
    output: {
        filename: 'bundle.js',
        path: '/',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin(HTMLSettings),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@constants':  path.resolve(projectDir, 'client/constants'),
            '@utils': path.resolve(projectDir, 'client/utils'),
            '@modules': path.resolve(projectDir, 'client/modules')
        }
    },
    devtool: 'source-map'
};