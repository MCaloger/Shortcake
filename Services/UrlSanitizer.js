const logger = require('./logger');
const UserError = require('../Models/UserError');

class UrlSanitizer {
	/**
	 * Sanitize a given string to ensure it's a
	 * proper URL and that it has an HTTP/HTTPS protocol.
	 *
	 * @param {string} input
	 * @returns {Url}
	 * @memberof UrlSanitizer
	 */
	sanitize(input) {

		try {
			if (input === null || input === '' || typeof (input) === 'undefined') {
				throw new UserError('MISSING_URL_ERR', 'URL is missing')
			} else {
				const url = new URL(input);

				if (url.protocol === 'http:' || url.protocol === 'https:') {
					return url.href;
				} else {
					throw new UserError('PROTOCOL_MISSING_ERR', 'Invalid URL protocol. URL must start with http or https');
				}
			}
		} catch(error) {
			logger.error("Error sanitizing url", error)
			throw new UserError(error.errorMessage || "INVALID_URL_ERR", error.humanMessage || "URL is invalid");
		}
	}
}

module.exports = new UrlSanitizer();