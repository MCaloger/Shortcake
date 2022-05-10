// Bring in .env properties
require('dotenv').config();

const express = require('express');
const app = express();
const UrlController = require('./Controllers/UrlController');
const logger = require('./Services/logger');
const cors = require('cors')

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:4200']
}));

// Add Url routes
app.use(UrlController);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send({ error: err });
})

// Create server
app.listen(process.env.PORT, async () => {
  logger.info(`Started on port ${process.env.PORT}`);
});

module.exports = app;
