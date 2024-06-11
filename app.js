// Bring in .env properties
require('dotenv').config();

const express = require('express');
const app = express();
const UrlController = require('./Controllers/UrlController');
const path = require('path');
const logger = require('./Services/logger');
const cors = require('cors');
const UrlService = require('./Services/UrlService');

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3001']
}));

// Add Url routes
app.use(UrlController);
app.use(express.static(path.join(__dirname, 'public')));

app.use((err, req, res, next) => {
  logger.error(err.errorMessage, err.stack);
  const status = err.statusCode || 500;
  const humanMessage = err.humanMessage || 'Internal server error';
  res.status(status).send(humanMessage);
})


app.get("/u/:code", async (request, response) => {
  console.log("get")
  const {
      code
  } = request.params;

  const url = await UrlService.getUrl(code)

  console.log(url)
  
  response.redirect(url)
})

// app.get(["/index.html"], (req, res) => {
//   console.log("get")
//   res.sendFile(path.join(__dirname, '/shortcake-web-client/dist/shortcake-web-client/index.html'));
// })

// Create server
app.listen(process.env.PORT, async () => {
  console.log(`Started on port ${process.env.PORT}`);
  logger.info(`Started on port ${process.env.PORT}`);
});

module.exports = app;
