require('dotenv').config()

const express = require('express')
const app = express()
const db = require('./Services/data.js')
const UrlController = require("./Controllers/UrlController")

app.use(express.json());

app.use(UrlController)

app.listen(process.env.PORT, async () => {
	console.log(`Started on port ${process.env.PORT}`)
})

module.exports = app 