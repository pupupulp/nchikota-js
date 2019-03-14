const compression = require('compression');
const minify = require('express-minify');
const minifyHtml = require('express-minify-html');

const config = demand('configs');

module.exports = (app) => {
	app.use(compression());
	app.use(minify());
	app.use(minifyHtml(config.minify.html));
};