require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const UrlService = require('../Services/UrlService');
const logger = require('../Services/logger');

describe('Url controller', () => {
  it('should return 200 on /u/:code', async () => {

    const testUrl = 'https://caloger.com/'
    const code = await UrlService.createUrl(testUrl);

    const response = await request(app).get(`/api/v1/u/${code}`);
    expect(response.status).toEqual(200);
    expect(response.body.url).toEqual(
      testUrl
    );
    
    logger.info('should return 200 on /u/:code', testUrl, response);

  });

  it('should return a URL on submitting a Post to /new', async () => {

    const testingUrl = 'https://caloger.com/';

    const response = await request(app)
        .post('/api/v1/new')
        .send({url: testingUrl});

    expect(response.status).toEqual(201);
      expect(response.body.url).toEqual(
        expect.any(String)
    );
    logger.info('should return a URL on submitting a Post to /new', response.body);

  });

  it('should return an error on submitting an improper url /new', async () => {

    const response = await request(app)
        .post('/api/v1/new')
        .send({url: 'example bad url'});

    expect(response.status).toEqual(500);

    logger.info('should return an error on submitting an improper url /new', response.body);

  });

  it('should return a message on submitting an undefined url to /new', async () => {

    const response = await request(app)
        .post('/api/v1/new')
        .send();

    expect(response.status).toEqual(500);
    logger.info('should return a message on submitting an undefined url to /new', response.body);

  });

  it('should return a message on submitting an empty url to /new', async () => {

    const response = await request(app)
        .post('/api/v1/new')
        .send({url: ''});

    expect(response.status).toEqual(500);

    logger.info('should return a message on submitting an empty url to /new', response.body);

  });
});
