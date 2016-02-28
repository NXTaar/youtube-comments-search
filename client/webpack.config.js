'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');


module.exports = {
    context: __dirname,
    entry: ['babel-polyfill', './App'],
    output: {
        path: path.resolve(process.cwd() + "/_dist"),
        filename: "[name].js",
        publicPath: '/',
        library: "[name]"
    },
    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: 'development' ? "cheap-inline-module-source-map" : null,

    plugins: [
        new webpack.NoErrorsPlugin(),

        new webpack.DefinePlugin({

        }),
        new StatsPlugin('./stats.json', {
            chunkModules: false,
            timings: true,
            exclude: [/node_modules[\\\/](core-js|babel-runtime)/]
        }),
    ],
    devServer: {
        contentBase: './_dist',
        port: 3000
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                include: [path.resolve(__dirname)],
                test: /\.jsx?$/,
                query: {
                    plugins: ['transform-runtime', 'react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
                    presets: ['es2015', 'stage-0', 'react'],
                }
            },
        ]
    }
}

if (NODE_ENV == 'production') {
    module.exports.output.path = path.resolve(process.cwd() + "/production");
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    )
}