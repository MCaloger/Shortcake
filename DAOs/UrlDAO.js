/* eslint-disable valid-jsdoc */
const dbConnection = require('../Services/data');
const logger = require('../Services/logger');
const Utils = require('../Services/Utils');

/**
 * @class UrlDao
 */
class UrlDao {
  /**
   * Creates an instance of UrlDao.
   * @param {*} connection
   * @memberof UrlDao
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
     * Adds url to database
     * @param {String} HTTP/HTTPS url
     * @returns {code: String}
     * @memberof UrlDao
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
      } catch (error) {
        logger.error(error);
        reject(new Error('System Error'));
      }
    });
  }

  /**
     *
     *
     * @param {String} url code
     * @return {String} Url
     * @memberof UrlDao
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
      } catch (error) {
        logger.error(error);
        reject(new Error('System Error'));
      }
    });
  }
}

module.exports = new UrlDao(dbConnection);
