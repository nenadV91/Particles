const path = require('path');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'source', 'index.js'),
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				loader: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		alias: {
			globals: path.resolve(__dirname, 'source', 'globals'),
			app: path.resolve(__dirname, 'source', 'app'),
			icons: path.resolve(__dirname, 'source', 'react', 'icons'),
			components: path.resolve(__dirname, 'source', 'react', 'components')
		}
	}
};
