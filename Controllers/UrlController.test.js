/* eslint-disable max-len */
require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const UrlService = require('../Services/UrlService');
const logger = require('../Services/logger');

describe('Url controller', () => {
  it('should return 200 on /u/:code', async () => {
    try {
      const code = await UrlService.createUrl('https://caloger.com');

      const response = await request(app).get(`/u/${code}`);
      expect(response.status).toEqual(200);
      expect(response.body.url).objectContaining({
        url: expect.any(String),
      });
    } catch (error) {
      logger.error(error);
    }
  });

  it('should return a URL on submitting a Post to /new', async () => {
    try {
      const response = await request(app)
          .post('/new')
          .send({url: 'https://caloger.com/'});

      expect(response.status).toEqual(201);
      expect(response.body.url).objectContaining({
        code: expect.any(String),
        url: expect.any(String),
      });
      logger.info(response.body);
    } catch (error) {
      logger.error(error);
    }
  });

  it('should return an error on submitting an improper url /new', async () => {
    try {
      const response = await request(app)
          .post('/new')
          .send({url: 'example bad url'});

      expect(response.status).toEqual(500);

      logger.info(response.body);
    } catch (error) {
      logger.error(error);
    }
  });

  it('should return a message on submitting an undefined url to /new', async () => {
    try {
      const response = await request(app)
          .post('/new')
          .send();

      expect(response.status).toEqual(400);
      logger.info(response.body);
    } catch (error) {
      logger.error(error);
    }
  });

  it('should return a message on submitting an empty url to /new', async () => {
    try {
      const response = await request(app)
          .post('/new')
          .send({url: ''});

      expect(response.status).toEqual(400);

      logger.info(response.body);
    } catch (error) {
      logger.error(error);
    }
  });
});
