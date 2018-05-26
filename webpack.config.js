const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const {getAbsolutePath} = require('./src/utils/path');

const cssLoader = {
    loader: 'css-loader',
    options: {minimize: true}
};

module.exports = {
    entry: {app: getAbsolutePath('src/client/index.js')},
    mode: 'production',
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.js$/
            },
            {
                loaders: [
                    MiniCSSExtractPlugin.loader,
                    cssLoader,
                    'sass-loader'
                ],
                test: /\.s?[ac]ss$/
            },
            {
                loader: 'file-loader',
                options: {name: 'assets/images/[name].[ext]'},
                test: /\.(png|jpe?g|gif)/
            },
            {
                include: /src/,
                loader: 'file-loader',
                options: {name: '[name].[ext]'},
                test: /(manifest\.json|worker\.js)$/,
                type: 'javascript/auto'
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'all',
                    name: 'vendor',
                    priority: -1,
                    test: /node_modules/
                },
                default: false
            }
        }
    },
    output: {
        filename: 'assets/js/[name].js',
        path: getAbsolutePath('public'),
        publicPath: '/'
    },
    performance: {hints: false},
    plugins: [
        new MiniCSSExtractPlugin({filename: 'assets/css/index.css'}),
        new HTMLWebpackPlugin({
            favicon: getAbsolutePath('src/static/favicon.ico'),
            filename: getAbsolutePath('public/index.html'),
            template: getAbsolutePath('src/client/index.html')
        })
    ]
};
