const moment = require('moment');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const logFormat = printf(({ level, message, label, timestamp }) => {
	return `[${timestamp}] [${label}] [${level.toUpperCase()}]: ${message}`;
});

const date = moment().format('YYYYMMDD');

const logger = createLogger({
	format: combine(
		label({ label: 'SERVER' }),
		timestamp(),
		logFormat
	),
	transports: [
		new transports.Console(),
		new transports.File({
			filename: `logs/${date}/log.txt`,
			level: 'info'
		}),
		new transports.File({
			filename: `logs/${date}/output.txt`,
			level: 'verbose'
		}),
		new transports.File({
			filename: `logs/${date}/error.txt`,
			level: 'error'
		}),
	]
});

module.exports = logger;