const UrlDAO = require('../DAOs/UrlDAO');
const logger = require('./logger');
const UrlSanitizer = require('./UrlSanitizer');
const Utils = require('./Utils');

class UrlService {
	/**
	 *
	 * @param {ValidatedUrl} url
	 * @return {string} code to url
	 */
	async createUrl(url) {
		try {
			const validatedUrl = await UrlSanitizer.sanitize(url);

			const checkIfCodeExists = await this.getCode(validatedUrl);

			if(checkIfCodeExists === null) {
				const code = Utils.pickCode(process.env.CODELENGTH);

				const addedUrl = await UrlDAO.addUrl(code, validatedUrl);

				return addedUrl;
			} else {
				return checkIfCodeExists;
			}
		} catch (error) {
			logger.error("createUrl --- Error " + url + " " + error)
			throw new Error(error);
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
			throw new Error('Unable to get Url from code.');
		}
	}

	async getCode(url) {
		try {
			const code = await UrlDAO.getCodeFromUrl(url);
			return code;
		} catch(error) {
			logger.error("Error getting code from URL", error)
			
			throw new Error('Unable to get Code from Url.');
		}
		
	}
}

module.exports = new UrlService();