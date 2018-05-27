const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const {getAbsolutePath} = require('./src/utils/path');

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
                    {
                        loader: 'css-loader',
                        options: {
                            localIdentName: '[local][name]-[hash:base64:5]',
                            minimize: true,
                            modules: true
                        }
                    },
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
