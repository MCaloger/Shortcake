/* eslint-disable valid-jsdoc */
const dbConnection = require('../Services/data');
const logger = require('../Services/logger');
const ServerError = require("../Models/ServerError");

/**
 * @class UrlDAO
 */
class UrlDAO {
	/**
	 * Creates an instance of UrlDAO.
	 * @param {*} connection
	 * @memberof UrlDAO
	 */
	constructor(connection) {
		this.connection = connection;
	}

	/**
		 * Adds url to database
		 * @param {String} HTTP/HTTPS url
		 * @returns {code: String}
		 * @memberof UrlDAO
		 */
	addUrl(code, url) {
		return new Promise((resolve, reject) => {
			try {
				this.connection.database.run('INSERT INTO urls (url_code, url_address) VALUES($code, $url);', {
					$code: code,
					$url: url,
				}, (error) => {
					if (error === null) {
						resolve(code);
					} else {
						console.log(error);
						logger.error(error);
						reject(new ServerError('ADD_URL_DB_FAILURE_NULL', 'Failed to add URL'));
					}
				});
		logger.info("addUrl", code, url);
			} catch (error) {
				logger.error(code, url, error);
				reject(new ServerError('ADD_URL_DB_FAILURE', 'Failed to add URL'));
			}
		});
	}

	/**
		 *
		 *
		 * @param {String} url code
		 * @return {String} Url
		 * @memberof UrlDAO
		 */
	getUrlFromCode(code) {
		return new Promise((resolve, reject) => {
			try {
				this.connection.database.get(
						'SELECT url_address FROM urls WHERE url_code=$code;'
						, {
							$code: code,
						}, (error, row) => {
							if (row != undefined) {
								resolve(row.url_address);
							} else {
								logger.error(error);
								reject(new ServerError('GET_URL_DB_NOT_FOUND', 'Code does not exist, please use a valid code'));
							}
						});
		logger.info("getUrlFromCode", code);
			} catch (error) {
				logger.error(error);
				reject(new ServerError('GET_URL_DB_ERROR', 'Failed to find URL'));
			}
		});
	}

	getCodeFromUrl(url) {
		return new Promise((resolve, reject) => {
			try {
				this.connection.database.get(
			'SELECT url_code FROM urls WHERE url_address=$url;'
			, {
				$url: url,
			}, (error, row) => {
				if (row != undefined) {
					// code was found, re-use
					resolve(row.url_code);
				} else {
					//code not found
					resolve(null);
				}
		});

				logger.info("getCodeFromUrl", url);
			} catch (error) {
				logger.error(error);
				reject(new ServerError('GET_CODE_DB_ERROR', 'Failed to find code'));
			}
		});
	}
}

module.exports = new UrlDAO(dbConnection);
