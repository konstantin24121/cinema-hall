'use strict';
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack           = require('webpack');
const config            = require('nconf');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss            = require('precss');
const autoprefixer      = require('autoprefixer');
const path              = require('path');
const merge             = require('merge');

config.argv().env().file({ file: './polarvargen.json' });


module.exports = {
	context: path.join(__dirname, config.get('sourceFolder')),

	entry: merge(config.get('entryCss'),config.get('entryJs')),

	output: {
		path: path.join(__dirname , config.get('distFolder'), config.get('jsPath')),
		publicPath: config.get('publicPath'),
		filename: '/[name].js',
		library: '[name]',
	},

	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.css', '.js', '.coffee', '.scss', '.less', '.styl',  '.json']
	},

	resolveLoader: {
		modulesDirectories: [path.join(__dirname, 'node_modules')],
		moduleTemplates: ['*-loader'],
		extensions: ['', '.js']
	},

	module: {
		loaders: [
			{
				loaders: ['babel'],
				test: /\.js$/,
				plugins: ['transform-runtime'],
				exclude: /node_modules/,
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{ 
				test: /\.coffee$/,
				loader: 'coffee' 
			},
			{
				test: /\.(coffee\.md|litcoffee)$/, 
				loader: 'coffee-loader?literate'
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('css!postcss?browsers=last 2 versions?!less')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css!postcss?browsers=last 2 versions?!sass')
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('css!postcss?browsers=last 2 versions?!stylus')
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: 'url?limit=100000'
			}
		],
		noParse: [
		],
	},

	postcss: function () {
		return [precss, autoprefixer];
	},

	plugins:[
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(NODE_ENV)
		}),
		new ExtractTextPlugin(`${config.get('cssPath')}/[name].css`, {allChunks: true}),
		new webpack.ProvidePlugin({
		}),
		new webpack.NoErrorsPlugin(),
		// new webpack.ContextReplacementPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: 2
		})
	],

	devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,
}