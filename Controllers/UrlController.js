const express = require('express');
const app = express();
const UrlService = require('../Services/UrlService');
const logger = require('../Services/logger');

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
    } catch (error) {
        logger.error(error);
        return next(error);
    }
});

// Creates code and returns url to /get
app.post('/api/v1/new', async (request, response, next) => {
    try {
        const url = request.body.url

        const code = await UrlService.createUrl(url);

        response.status(201).json({
            code,
            url: `${process.env.BASE}/${code}`,
        });
        
        logger.info('Creates code and returns url to /get', url);
    } catch (error) {
        logger.error('/api/v1/new', error);
        return next(error);
    }
});

module.exports = app;