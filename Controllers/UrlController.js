
const express = require('express');
const app = express();
const UrlService = require("../Services/UrlService")

app.get('/u/:code', async (req, res, next) => {
    try {
        const code = req.params.code
        let url = await UrlService.getUrl(code)
        res.json({url})
    } catch(err) {
        return next(err.message)
    }
})

app.post('/new', async (req, res, next) => {
    try {
        let code = await UrlService.createUrl(req.body.url) 

        res.json({url: `http://${req.hostname}:${process.env.PORT}/u/${code}`})
    } catch (err) {
        return next(err.message)
    }
})

module.exports = app