const webpack = require('webpack');

const config = require('../../webpack.config');

config.devtool = 'sourcemap';
config.entry.app = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    config.entry.app
];
config.module.rules[0].options = {plugins: ['react-hot-loader/babel']};
config.module.rules[1].loaders[0] = 'style-loader';
config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
);

const compiler = webpack(config);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    stats: 'minimal'
});
const hotMiddleware = require('webpack-hot-middleware')(compiler);

module.exports = app => {
    app.use(devMiddleware);
    app.use(hotMiddleware);
};
