const express = require('express');
const app = express();
const UrlService = require('../Services/UrlService');
const logger = require('../Services/logger');
const ValidatedUrl = require('../Models/ValidatedUrl')

// Fetches code
app.get('/api/v1/u/:code', async (request, response, next) => {
    try {
        const {
            code
        } = request.params;
        const url = await UrlService.getUrl(code);
        response.status(200).json({
            code,
            url
        });
        logger.info('Fetches code', url);
    } catch (err) {
        logger.error(err);
        return next("Error, invalid URL");
    }
});

// Creates code and returns url to /get
app.post('/api/v1/new', async (request, response, next) => {
    try {
        const url = request.body.url

        if (request.body == null || request.body == undefined || url == null || url == '' || url == undefined) {
            response.status(400).send('You must send a valid URL.');
        } else {
            const validatedUrl = new ValidatedUrl(request.body.url);
            const code = await UrlService.createUrl(validatedUrl);

            response.status(201).json({
                code,
                url: `${process.env.BASE}/${code}`,
            });
        }
        logger.info('Creates code and returns url to /get', url);
    } catch (error) {
        logger.error('/api/v1/new', error);
        return next(error.message);
    }
});

module.exports = app;