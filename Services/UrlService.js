const UrlDAO = require('../DAOs/UrlDAO');
const logger = require('./logger');
const UrlSanitizer = require('./UrlSanitizer');
const Utils = require('./Utils');
const UserError = require('../Models/UserError');

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

				const addedUrl = "u/" + await UrlDAO.addUrl(code, validatedUrl);

				console.log("createUrl", checkIfCodeExists, addedUrl, code)

				return addedUrl;
			} else {
				return checkIfCodeExists;
			}
		} catch (error) {
			logger.error("createUrl" + url + " " + error)
			throw error;
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
			logger.error("GetUrl", code, "err", error)
			throw new UserError(error.errorMessage || "INVALID_CODE_ERR", error.humanMessage || "Code does not exist");
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