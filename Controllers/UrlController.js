const express = require('express');

const app = express();
const UrlService = require('../Services/UrlService');
const logger = require('../Services/logger');

// Fetches code
app.get('/u/:code', async (request, response, next) => {
  try {
    const {code} = request.params;
    const url = await UrlService.getUrl(code);
    response.status(200).json({url});
  } catch (err) {
    logger.error(err);
    return next(err.message);
  }
});

// Creates code and returns url to /get
app.post('/new', async (request, response, next) => {
  try {
    const {url} = request.body;
    if (url == null || url === '') {
      response.status(400).send('You must send a valid URL.');
    } else {
      const code = await UrlService.createUrl(request.body.url);

      response.status(201).json({
        code,
        url: `http://${request.hostname}:${process.env.PORT}/u/${code}`,
      });
    }
  } catch (error) {
    logger.error(error);
    return next(error.message);
  }
});

module.exports = app;
