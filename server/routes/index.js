const express = require('express');
const router = express.Router();

router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/docs', require('./docs'))

router.use('/', require('./error'))

module.exports = router;
