// Bring in .env properties
require('dotenv').config();

const express = require('express');
const app = express();
const UrlController = require('./Controllers/UrlController');

app.use(express.json());

// Add Url routes
app.use(UrlController);

// Create server
app.listen(process.env.PORT, async () => {
  console.log(`Started on port ${process.env.PORT}`);
});

module.exports = app;
