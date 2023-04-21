const { Router } = require('express');
const authRoutes = require('./auth');
const eventRoutes = require('./events');

const router = Router();
router.use('/auth', authRoutes);
router.use('/events', eventRoutes);

module.exports = router;