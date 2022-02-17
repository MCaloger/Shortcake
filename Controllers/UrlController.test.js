require('dotenv').config()
const request = require("supertest");
const express = require('express');
//const app = express();
const app = require('../app')
const UrlController = require('./UrlController.js');
const UrlService = require('../Services/UrlService');
const DataConnector = require("../Services/data");
const logger = require('../Services/logger.js');


describe('Url controller', () => {
    it('should return 200 on /u/:code', async () => {
        try {
            const code = await UrlService.createUrl("https://caloger.com")

            const response = await request(app)
                .get('/u/' + code)
            expect(response.status).toEqual(200);
            expect(response.body.url).objectContaining({
                url: expect.any(String)
            })

        } catch(error) {
            logger.error(error)
        }
    })

    it('should return a URL on submitting a Post to /new', async () => {
        try {
            const response = await request(app)
                .post("/new")
                .send({url: "https://caloger.com/"})
        
            expect(response.status).toEqual(201);
            expect(response.body.url).objectContaining({
                code: expect.any(String),
                url: expect.any(String)
            })
            logger.info(response.body)
        } catch(error) {
            logger.error(error)
        }
        
        
    })

    it('should return an error on submitting a an improper url /new', async () => {
        try {
            const response = await request(app)
                .post("/new")
                .send({url: "example bad url"})
        
            expect(response.status).toEqual(500);

            logger.info(response.body)
        } catch(error) {
            logger.error(error)
        }
        
        
    })
})