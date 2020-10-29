const express = require('express');
const router = express.Router();

router.use('/products', require('./products'))
router.use('/orders', require('./orders'))
router.use('/docs', require('./docs'))
router.get('/shutdown', (request, response) => {
    const { exec } = require('child_process');
    exec('sudo shutdown now', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        };
    });
})
router.use('/', require('./error'))

module.exports = router;
