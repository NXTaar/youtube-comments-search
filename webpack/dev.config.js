const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const config = require('config')

const projectDir = process.cwd()

const HTMLSettings = {
    title: 'Comments search',
    inject: 'body'
}

module.exports = {
    entry: path.join(projectDir, 'client', 'index'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(projectDir, 'dist'),
        publicPath: '/dist/'
    },
    plugins: [
        new HtmlWebpackPlugin(HTMLSettings)
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
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(projectDir, "dist"),
        port: config.get('app.port')
    }
};