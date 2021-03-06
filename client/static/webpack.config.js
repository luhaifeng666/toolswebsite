var assetsViews = require('./assets-views');
var pathTool = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var css_path = '../build/style.css';

module.exports = {
	entry: {
		app: ['babel-polyfill', './modules/app.js']
	}, //打包的js
	resolve: {
		modules: [pathTool.resolve(__dirname, 'common'), pathTool.resolve(__dirname, 'util'), 'node_modules'],
		extensions: ['.js', '.json', '.jsx'],
		mainFiles: ['index']
	},
	output: {
		//输出信息
		path: pathTool.resolve(__dirname, './build'), //线上路径'./build/'
		filename: 'qianmi-[name]-[chunkhash].js',
		chunkFilename: 'qianmi-[name]-[id].[chunkhash:8].bundle.js',
		publicPath: '../build/'
	},
	module: {
		//处理jsx的编译
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [pathTool.resolve(__dirname, 'node_modules')],
				enforce: 'pre',
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.(css|scss)$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader'
						}
					],
					fallback: 'style-loader',
					publicPath: '../build/'
				})
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({}),
		assetsViews({
			gloabal: {
				cssPath: css_path
			},
			from: './views/',
			to: '../WEB-INF/'
		}),
		new ExtractTextPlugin({
			filename: 'style.css',
			disable: false,
			allChunks: true
		})
	]
};
