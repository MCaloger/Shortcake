
const express = require('express');
const app = express();
const UrlService = require("../Services/UrlService")

app.get('/:url', async (req, res) => {
    let retrieveUrl = await UrlService.getURL(req.params.url)
    let sanitizedUrl = UrlService.sanitize(retrieveUrl.result)

    if (retrieveUrl.err === null) {
        res.send(`<a href="${sanitizedUrl}">Go to ${sanitizedUrl}</a>`)
    } else {
        res.send(sanitizedUrl.err)
    }
})

app.post('/new', async (req, res, next) => {
    try {
        let baseUrl = req.body.url
        if (baseUrl != "") {
            let sanitized = UrlService.sanitize(baseUrl)
            let addToDb = await UrlService.addURL(sanitized);

            let err = addToDb.err
            let code = addToDb.code

            if (err === null) {
                res.send(`http://${req.hostname}:${process.env.PORT}/${code}`)
            } else {
                res.send(err)
            }
        } else {
            res.send("System Error")
        }
    } catch (err) {
        return next(err)
    }
})

module.exports = app