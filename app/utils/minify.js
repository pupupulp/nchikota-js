const compression = require('compression');
const minify = require('express-minify');
const minifyHtml = require('express-minify-html');

module.exports = (app) => {
	app.use(compression());
	app.use(minify());
	app.use(minifyHtml({
		override: true,
		exception_url: false,
		htmlMinifier: {
			removeComments: true,
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true,
			minifyJS: true
		}
	}));
};