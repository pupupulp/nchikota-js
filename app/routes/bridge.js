const express = require('express');

// eslint-disable-next-line no-undef
const healthCheckRouter = demand('routes/health-check');
// eslint-disable-next-line no-undef
const securityViolationRouter = demand('routes/security-violation');
// eslint-disable-next-line no-undef
const maintenanceRouter = demand('routes/maintenance');

const router = express.Router();

router.use(healthCheckRouter);
router.use(securityViolationRouter);
router.use(maintenanceRouter);

module.exports = router;