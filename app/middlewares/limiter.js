const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

const config = demand('configs');

const globalLimiter = rateLimit(config.limiter.global);

const speedLimiter = slowDown(config.limiter.slowDown);

module.exports.global = globalLimiter;
module.exports.slowDown = speedLimiter;