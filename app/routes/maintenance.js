const express = require('express');
const heapdump = require('heapdump');
const fs = require('fs');

// eslint-disable-next-line no-undef
const logger = demand('middlewares/logger');

const router = express.Router();

router.get('/maintenance-heapdump', (req, res) => {
	logger.info('Generating heapdump');
	const path = './logs/heapdump/' + Date.now() + '.heapsnapshot';
	heapdump.writeSnapshot(path, (err, filename) => {
		logger.info('Heapdump file is ready to be sent to the caller', filename);
		fs.readFile(filename, 'utf-8', (err, data) => {
			res.end(data);
		});
	});
});

module.exports = router;