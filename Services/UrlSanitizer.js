const logger = require('./logger');

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
				throw new Error("Empty URL.")
			} else {
				const url = new URL(input);

				if (url.protocol === 'http:' || url.protocol === 'https:') {
					return url.href;
				} else {
					throw new Error('Invalid Url protocol, must he http or https.');
				}
			}
		} catch (error) {
			logger.error(error);
			throw new Error('Invalid Url.');
		}
	}
}

module.exports = new UrlSanitizer();