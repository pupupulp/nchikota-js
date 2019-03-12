const monitor = require('express-status-monitor');

const config = demand('configs');

const appMonitor = monitor({
	title: 'Credit and Risk Portal Status',
	path: '',
	healthChecks: [{
		protocol: config.server.protocol,
		host: 'localhost',
		path: '/monitor/health',
		port: config.server.port
	}, ]

});

module.exports = appMonitor;