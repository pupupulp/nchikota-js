const express = require('express');
const endpoints = require('express-list-endpoints');

const appRouter = demand('routes/app');
const monitorRouter = demand('routes/monitor');
const securityViolationRouter = demand('routes/security-violation');
const maintenanceRouter = demand('routes/maintenance');

const router = express.Router();

router.use(appRouter);
router.use(monitorRouter);
router.use(securityViolationRouter);
router.use(maintenanceRouter);

router.get('/endpoints', (req, res) => {
	res.send(endpoints(router));
});

module.exports = router;