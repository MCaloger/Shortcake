require('dotenv').config();
const UrlService = require('../Services/UrlService');
const logger = require('../Services/logger');
const ValidatedUrl = require('../Models/ValidatedUrl');

describe('Url services createUrl', () => {
    it('should return a string on valid url', async () => {
        try {
            const url = new ValidatedUrl('https://caloger.com/');
            const result = await UrlService.createUrl(url);
            expect(typeof result).toBe("string");
        } catch(error) {
            logger.error(error);
        }
    })

    it('should return an error on missing url', async () => {
        try {
            const url = new ValidatedUrl('');
            expect(() => {
                UrlService.createUrl(url);
              }).toThrow('System Error: Missing Url');
        } catch(error) {
            logger.error(error);
        }
    })

    it('should return an error on invalid url', async () => {
        try {
            const url = new ValidatedUrl('abcd');
            expect(() => {
                UrlService.createUrl(url);
              }).toThrow('System Error, unable to create Url.');
        } catch(error) {
            logger.error(error);
        }
    })
})

describe('Url services getUrl', () => {
    it('should return a string on valid code', async () => {
        try {
            logger.info("start geturl test");
            const url = 'https://google.com/'
            const code = await UrlService.createUrl(url);
            const result = await UrlService.getUrl(code);
            expect(typeof result).toBe('string');
        } catch(error) {
            logger.error("validstring err " + error);
        }
    })

    it('should return an error on missing code', async () => {
        try {
            const url =  new ValidatedUrl('');
            const action = async () => {
                await UrlService.createUrl(url);
            }
            
            await expect(action()).rejects.toThrow('System Error: Missing Url')

            
        } catch(error) {
            logger.error(error);
        }
    })

    it('should return an error on invalid url', async () => {
        try {
            const url =  new ValidatedUrl('abcd');
            const action = async () => {
                await UrlService.createUrl(url);
            }
            
            await expect(action()).rejects.toThrow('System Error, unable to create Url.')

            
        } catch(error) {
            logger.error(error);
        }
    })
})