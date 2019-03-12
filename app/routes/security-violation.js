const express = require('express');

const logger = demand('middlewares/logger');

const router = express.Router();

router.get('/violation-csp', async (req, res) => {
	let message = 'Empty data';

	if (req.body) {
		message = req.body;
	}

	await logger.info('CSP Violation: ' + message);

	res.status(204).end();
});

router.get('/violation-xss', async (req, res) => {
	let message = 'Empty data';

	if (req.body) {
		message = req.body;
	}

	await logger.info('XSS Violation: ' + message);

	res.status(204).end();
});

module.exports = router;