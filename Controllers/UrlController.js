
const express = require('express');
const app = express();
const UrlService = require("../Services/UrlService")
const logger = require('../Services/logger')


app.get('/u/:code', async (req, res, next) => {
    try {
        const code = req.params.code
        let url = await UrlService.getUrl(code)
        res.status(200).json({url})
    } catch(err) {
        logger.error(err)
        return next(err.message)
    }
})

app.post('/new', async (req, res, next) => {
    try {
        const url = req.body.url
        if(url == null || url === ""){
            res.status(400).send("You must send a valid URL.")
        } else {
            let code = await UrlService.createUrl(req.body.url) 

            res.status(201).json({
                code,
                url: `http://${req.hostname}:${process.env.PORT}/u/${code}`
            })
        }
        
    } catch (err) {
        logger.error(err)
        return next(err.message)
    }
})

module.exports = app