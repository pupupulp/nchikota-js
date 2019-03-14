const logger = demand('middlewares/logger');

module.exports = {
	global: {
		max: 10,
		windowMs: 1 * 60 * 1000,
		onLimitReached: (req, res, options) => {
			const limit = req.rateLimit.limit;
			const current = req.rateLimit.current;
			const remaining = req.rateLimit.remaining;
			logger.info('Denied ' + req.method + ' request from ' + req.ip + ' due rate limit reached');
			logger.info(`${req.ip} rate limit: ${limit}, current: ${current}, remaining: ${remaining}`);
		}
	},
	slowDown: {
		windowMs: 15 * 60 * 1000,
		delayAfter: 5,
		delayMs: 100
	}
};