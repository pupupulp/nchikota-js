const VitalSigns = require('vitalsigns');

const logger = demand('middlewares/logger');
const config = demand('configs');

const vitals = new VitalSigns(config.server.vitals);

vitals.monitor('cpu');
vitals.unhealthyWhen('cpu', 'usage').greaterThan(config.server.cpuThreshold);

vitals.monitor('mem', {
	units: 'MB'
});

vitals.monitor('tick');
vitals.unhealthyWhen('tick', 'maxMs').greaterThan(config.server.tickThreshold);

vitals.monitor('uptime');
vitals.unhealthyWhen('uptime', 'sys').equals(0);

vitals.on('healthChange', (healthy, checks) => {
	logger.info('Server is ' + (healthy ? 'healthy' : 'unhealthy'));
	logger.info('CPU usage: ' + checks.cpu.usage + '%');
	logger.info('Memory free: ' + checks.mem.free + 'MB');
	logger.info('Memory process: ' + checks.mem.process + 'MB');
	logger.info('Tick average ms: ' + checks.tick.avgMs + 'ms');
	logger.info('Tick max ms: ' + checks.tick.maxMs + 'ms');
	logger.info('Tick per second: ' + checks.tick.perSec + 's');
	logger.info('Uptime sys: ' + checks.uptime.sys + 's');
	logger.info('Uptime proc: ' + checks.uptime.proc + 's');
});

module.exports = vitals;