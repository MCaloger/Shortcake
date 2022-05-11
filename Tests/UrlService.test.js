require('dotenv').config();
const UrlService = require('../Services/UrlService');
const logger = require('../Services/logger');

describe('Url services createUrl', () => {
    it('should return a string on valid url', async () => {

        const url = 'https://caloger.com/';
        const result = await UrlService.createUrl(url);
        expect(typeof result).toBe("string");
        logger.info(`UrlService.createUrl: ${result}`);

    })

    it('should return an error on missing url', async () => {

        try {
            const url = '';
            await UrlService.createUrl(url);
        } catch(error) {
            expect(error.message).toMatch("MISSING_URL_ERR");
        }

    })

    it('should return an error on invalid url', async () => {
        try {
            const url = 'abcd';
            await UrlService.createUrl(url);
        } catch (error) {
            expect(error.message).toMatch("INVALID_URL_ERR")
        }
    })
})

describe('Url services getUrl', () => {
    it('should return a string on valid code', async () => {

        const url = 'https://google.com/'
        const code = await UrlService.createUrl(url);
        const result = await UrlService.getUrl(code);
        console.log('res', result, typeof(result));
        expect(typeof result).toBe('string');
        logger.info(`UrlService.getUrl: ${result}`);

    })

    it('should return an error on missing code', async () => {
            
        const action = async () => {
            const url =  '';
            await UrlService.createUrl(url);
        }
        
        await expect(action()).rejects.toThrow('MISSING_URL_ERR')

    })

    it('should return an error on invalid url', async () => {    
        const action = async () => {
            const url = 'abcd';
            await UrlService.createUrl(url);
        }
        
        await expect(action()).rejects.toThrow('INVALID_URL_ERR')
    })

    it('should return the same code on re-entered urls', async () => {

        const url = 'https://caloger.com/';

        const actionOne = await UrlService.createUrl(url);
        
        const actionTwo = await UrlService.createUrl(url);

        expect(actionOne).toEqual(actionTwo);
        
        const resultOne = await UrlService.getUrl(actionOne);

        const resultTwo = await UrlService.getUrl(actionTwo);

        expect(resultOne).toEqual(resultTwo);

        logger.info(`UrlService.getUrl: ${resultOne} ${resultTwo} ${actionOne} ${actionTwo}`);

    })
})