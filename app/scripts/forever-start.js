global.demand = path => require(`${__dirname}/../${path}`);

const forever = require('forever-monitor');
const fs = require('fs');
const moment = require('moment');

const logger = demand('utils/logger');
const handler = demand('helpers/handler');
const config = demand('configs');

const date = moment().format('YYYYMMDD');
const logsDirectory = `logs/${date}`;

if (!fs.existsSync(logsDirectory)) {
	fs.mkdirSync(logsDirectory);
}

const child = new(forever.Monitor)(config.server.script, config.server.forever);

child.on('start', (process, data) => {
	logger.info('Server started with pid: ' + data.pid);
});

child.on('restart', () => {
	logger.info('Server restarted: ' + child.times + ' time(s)');
});

child.on('exit:code', (code) => {
	logger.error('Server exited with code: ' + code);
});

child.on('watch:restart', (info) => {
	logger.info('Server restarted due to: ' + info.file + ' changed');
});

const gracefulShutdown = () => {
	logger.info('Gracefully shutting down');
	process.exit(0);
};

process.on('SIGTERM', () => {
	logger.info('Server received SIGTERM');
	setTimeout(gracefulShutdown, 1000);
});

process.on('SIGINT', () => {
	logger.info('Server received SIGINT');
	setTimeout(gracefulShutdown, 1000);
});

process.on('unhandledRejection', (reason, p) => {
	throw reason;
});

process.on('uncaughtException', (error) => {
	handler.error.handleError(error);
	if (!handler.error.isTrustedError(error)) {
		process.exit(1);
	}
});

child.start();