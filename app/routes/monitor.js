const express = require('express');

const vitals = demand('utils/vitals');
const statusMonitor = demand('utils/status-monitor');

const router = express.Router();

router.get('/monitor-health', vitals.express);

router.use(statusMonitor.middleware);
router.get('/monitor-status', statusMonitor.pageRoute);

module.exports = router;