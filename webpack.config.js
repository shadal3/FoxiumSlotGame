// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isProduction = process.env.NODE_ENV == 'production';
const stylesHandler = 'style-loader';

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
};

const config = {
    entry: {
        app: PATHS.src,
    },
    output: {
        path: PATHS.dist,
        filename: '[name].js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebPackPlugin({
            template: `./index.html`,
            filename: "./index.html",
            inject: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: `${PATHS.assets}img`, to: `${PATHS.assets}img`},
                { from: `./css`, to: `./css`},
                { from: `./results.json`, to: `./results.json`}
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        hot: false,
        liveReload: false,
        compress: true,
        port: 9000,
      },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
