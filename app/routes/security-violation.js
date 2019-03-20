const express = require('express');

const logger = demand('middlewares/logger');

const router = express.Router();

router.post('/violation-csp', async (req, res) => {
	const content = req.body;
	let message = content['csp-report']['violated-directive'] || 'Empty data';

	await logger.info('CSP Violation: ' + message);

	res.status(204).end();
});

router.post('/violation-xss', async (req, res) => {
	const content = req.body;
	let message = content || 'Empty data';

	await logger.info('XSS Violation: ' + message);

	res.status(204).end();
});

module.exports = router;