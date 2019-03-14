const express = require('express');
const requestId = require('express-request-id')();
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');
const path = require('path');

const minify = demand('middlewares/minify');
const secure = demand('middlewares/security');
const routers = demand('routes/bridge');

const app = express();

minify(app);
secure(app);

app
	.engine('html', es6Renderer)
	.set('views', path.join(__dirname, 'public', 'templates'))
	.set('view engine', 'html');

app
	.use(requestId)
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({ extended: false }))
	.use(routers)
	.use(express.static(path.join(__dirname, 'public')));

module.exports = app;