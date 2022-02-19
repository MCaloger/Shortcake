const UrlDAO = require('../DAOs/UrlDAO');
const logger = require('./logger');
const UrlSanitizer = require('./UrlSanitizer');
const Utils = require('./Utils');
const ValidatedUrl = require('../Models/ValidatedUrl')

class UrlService {
	/**
	 *
	 * @param {ValidatedUrl} url
	 * @return {string} code to url
	 */
	async createUrl(url) {
		try {
			const validatedUrl = new ValidatedUrl(url.url);

			const code = Utils.pickCode(process.env.CODELENGTH);

			const addedUrl = await UrlDAO.addUrl(code, validatedUrl.url);

			return addedUrl;	
			
		} catch (error) {
			logger.error("createUrl --- Error " + url + " " + error)
			throw new Error('System Error, unable to create Url.');
		}
	}

	/**
	 * Get url from given code
	 *
	 * @param {string} code
	 * @return {string} url
	 * @memberof UrlService
	 */
	async getUrl(code) {
		try {

			const url = await UrlDAO.getUrlFromCode(code);
			const sanitizedUrl = UrlSanitizer.sanitize(url);
			return sanitizedUrl;
		} catch (error) {
			logger.error("codeis", code, "err", error)
			throw new Error('System Error: Unable to get Url from code.');
		}
	}
}

module.exports = new UrlService();