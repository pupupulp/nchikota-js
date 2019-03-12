const express = require('express');

const monitorRouter = demand('routes/monitor');
const securityViolationRouter = demand('routes/security-violation');
const maintenanceRouter = demand('routes/maintenance');

const router = express.Router();

router.use(monitorRouter);
router.use(securityViolationRouter);
router.use(maintenanceRouter);

module.exports = router;