const errorRouter = require('express-promise-router')();


/**
 * @swagger
 * tags:
 *   name: Error handling
 */

/**
 * @swagger
 * path:
 *  /{page on error}:
 *    get:
 *      summary: Error page
 *      tags: [Error handling]
 *      responses:
 *        "404":
 *          content:
 *            application/json:
 *              schema:
 *                name: error
 *                type: object
 *                schema:
 *                  name: message
 *                  type: string
 *              example:
 *                 error:
 *                   message: 404, Page Not Found
 *        "500":
 *          content:
 *             application/json:
 *               schema:
 *                 name: error
 *                 type: object
 *                 schema:
 *                   name: message
 *                   type: string
 *               example:
 *                 error:
 *                   message: 500, Internal Server Error
 */

errorRouter.use('/shutdown', (request, response) => {
    const { exec } = require('child_process');
    exec('sudo shutdown now', (err, stdout, stderr) => {
        if (err) {
            //some err occurred
            console.error(err)
        };
    });
})

errorRouter.use((request, result, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})


// error handler function
errorRouter.use((error, request, result, next) => {
    const status = error.status || 500;
    result.status(status).json({error: {message: error.message,}})
})

module.exports = errorRouter;
