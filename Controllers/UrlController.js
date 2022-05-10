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
    } catch (err) {
        logger.error(err);
        return next("Error");
    }
});

// Creates code and returns url to /get
app.post('/api/v1/new', async (request, response, next) => {
    try {
        const url = new ValidatedUrl(request.body.url);

        if (url == null) {
            response.status(400).send('You must send a valid URL.');
        } else {
            const code = await UrlService.createUrl(url);

            response.status(201).json({
                code,
                url: `${process.env.BASE}/u/${code}`,
            });
        }
    } catch (error) {
        logger.error(error);
        return next(error.message);
    }
});

module.exports = app;