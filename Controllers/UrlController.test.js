require('dotenv').config()
const request = require("supertest");
const express = require('express');
const app = express();
const UrlController = require('./UrlController.js');
const UrlService = require('../Services/UrlService');
const DataConnector = require("../Services/data");
const logger = require('../Services/logger.js');


describe('Url controller', () => {
    it('should return 200 on /u/:code', async () => {

            const code = await UrlService.createUrl("https://caloger.com")

            request(app)
                .get("/u/" + code)
                .expect(200)
                .then((err, res) => {
                    if (err) {
                        logger.error("testerr", err)
                        reject(err);
                    }
                    resolve()
                });
        })
    })

    it('should return a URL on submitting a Post to /new', () => {
            request(app)
                .post("/new")
                .send({url: "https://caloger.com/"})
                .then(res => {
                    expect(res.status).toEqual(200)
                })
    })

