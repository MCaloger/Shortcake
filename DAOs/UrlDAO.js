/* eslint-disable valid-jsdoc */
const dbConnection = require('../Services/data');
const logger = require('../Services/logger');

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
        // eslint-disable-next-line max-len
        this.connection.database.run('INSERT INTO urls (url_code, url_address) VALUES($code, $url);', {
          $code: code,
          $url: url,
        }, (error) => {
          if (error === null) {
            resolve(code);
          } else {
            logger.error(error);
            reject(new Error('Error creating Url.'));
          }
        });
		logger.info("addUrl", code, url);
      } catch (error) {
        logger.error(code, url, error);
        reject(new Error('System Error'));
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
                reject(new Error('Error fetching url.'));
              }
            });
		logger.info("getUrlFromCode", code);
      } catch (error) {
        logger.error(error);
        reject(new Error('System Error'));
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
				resolve(row.url_code);
				} else {
				resolve(null);
				}
		});

        logger.info("getCodeFromUrl", url);
      } catch (error) {
        logger.error(error);
        reject(new Error('System Error'));
      }
    });
  }
}

module.exports = new UrlDAO(dbConnection);
