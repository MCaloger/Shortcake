// Bring in .env properties
require('dotenv').config();

const express = require('express');
const app = express();
const UrlController = require('./Controllers/UrlController');
const path = require('path');
const logger = require('./Services/logger');
const cors = require('cors')

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:4200']
}));

// Add Url routes
app.use(UrlController);
app.use(express.static('./shortcake-web-client/dist/shortcake-web-client'))
app.use('*', express.static(path.resolve(`${__dirname}/shortcake-web-client/dist/shortcake-web-client`)));

app.use((err, req, res, next) => {
  logger.error(err.errorMessage, err.stack);
  const status = err.statusCode || 500;
  const humanMessage = err.humanMessage || 'Internal server error';
  res.status(status).send(humanMessage);
})

// Create server
app.listen(process.env.PORT, async () => {
  logger.info(`Started on port ${process.env.PORT}`);
});

module.exports = app;
