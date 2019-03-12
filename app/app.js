const express = require('express');
const requestId = require('express-request-id')();
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');
const path = require('path');

// eslint-disable-next-line no-undef
const secure = demand('middlewares/security');
// eslint-disable-next-line no-undef
const monitor = demand('middlewares/status-monitor');
// eslint-disable-next-line no-undef
const routers = demand('routes/bridge');

const app = express();

secure(app);
monitor(app);

app
	.engine('html', es6Renderer)
	.set('views', path.join(__dirname, 'public', 'templates'))
	.set('view engine', 'html');

app
	.use(requestId)
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: false
	}))
	.use(routers)
	.use(express.static(path.join(__dirname, 'public')));

module.exports = app;