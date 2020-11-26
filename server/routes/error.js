const errorRouter = require('express-promise-router')();
const shell = require('shelljs');
const Order = require('../models/Order');


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

errorRouter.use('/shutdown', async (request, response) => {
    if (shell.exec('sudo shutdown now').code !== 0) {
        shell.echo('Error: cannot shutdown');
        shell.exit(1);
    }
})

errorRouter.use('/checkupdates', async (request, response) => {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }

    const gitPull = shell.exec('cd ../ && git pull');

    if (gitPull.code !== 0) {
        shell.echo('Error: Git pull failed');
        response.status(500).json({ error: { message: "Error: could not update repository" } });
    }

    if (gitPull.stdout.includes('up to date')) {
        console.log('gitPull', gitPull.code)
        response.status(200).json({ message: gitPull.stdout });
    }
    response.status(201).json({ message: "Updating... Don't shut down the system!" });

})

errorRouter.use((request, response, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})


// error handler function
errorRouter.use((error, request, response, next) => {
    const status = error.status || 500;
    response.status(status).json({ error: { message: error.message, } })
})

module.exports = errorRouter;
