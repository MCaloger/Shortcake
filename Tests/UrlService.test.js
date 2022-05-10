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
            logger.info(`UrlService.createUrl: ${result}`);
        } catch(error) {
            logger.error('should return a string on valid url', error);
            throw new Error(error)
        }
    })

    it('should return an error on missing url', async () => {
        try {
            expect(() => {
                const url = new ValidatedUrl('');
                UrlService.createUrl(url);
              }).toThrow('Invalid Url.');
        } catch(error) {
            logger.error('should return an error on missing url', error);
            throw new Error(error)
        }
    })

    it('should return an error on invalid url', async () => {
        try {
            
            expect(() => {
                const url = new ValidatedUrl('abcd');
                UrlService.createUrl(url);
              }).toThrow('Invalid Url.');
        } catch(error) {
            logger.error('should return an error on invalid url', error);
            throw new Error(error)
        }
    })
})

describe('Url services getUrl', () => {
    it('should return a string on valid code', async () => {
        try {
            const url = 'https://google.com/'
            const validatedUrl = new ValidatedUrl(url);
            const code = await UrlService.createUrl(validatedUrl);
            const result = await UrlService.getUrl(code);
            expect(typeof result).toBe('string');
            logger.info(`UrlService.getUrl: ${result}`);
        } catch(error) {
            logger.error('Url services getUrl', error);
            throw new Error(error)
        }
    })

    it('should return an error on missing code', async () => {
        try {
            
            const action = async () => {
                const url =  new ValidatedUrl('');
                await UrlService.createUrl(url);
            }
            
            await expect(action()).rejects.toThrow('Invalid Url.')
            
        } catch(error) {
            logger.error('should return an error on missing code', error);
            throw new Error(error)
        }
    })

    it('should return an error on invalid url', async () => {
        try {
            
            const action = async () => {
                const url =  new ValidatedUrl('abcd');
                await UrlService.createUrl(url);
            }
            
            await expect(action()).rejects.toThrow('Invalid Url.')

            
        } catch(error) {
            logger.error('should return an error on invalid url', error);
            throw new Error(error)
        }
    })

    it('should return the same code on re-entered urls', async () => {
        try {
            const url =  new ValidatedUrl('https://caloger.com/');

            const actionOne = await UrlService.createUrl(url);
            
            const actionTwo = await UrlService.createUrl(url);

            expect(actionOne).toEqual(actionTwo);
            
            const resultOne = await UrlService.getUrl(actionOne);

            const resultTwo = await UrlService.getUrl(actionTwo);

            expect(resultOne).toEqual(resultTwo);

            logger.info(`UrlService.getUrl: ${resultOne} ${resultTwo} ${actionOne} ${actionTwo}`);
            
        } catch(error) {
            logger.error('should return the same code on re-entered urls', error);
            throw new Error(error)
        }
    })
})