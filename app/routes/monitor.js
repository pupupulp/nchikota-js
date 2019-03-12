const express = require('express');

const vitals = demand('middlewares/vitals');
const statusMonitor = demand('middlewares/status-monitor');

const router = express.Router();

router.get('/monitor-health', vitals.express);

router.use(statusMonitor.middleware);
router.get('/monitor-status', statusMonitor.pageRoute);

module.exports = router;