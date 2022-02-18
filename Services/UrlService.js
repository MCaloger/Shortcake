const UrlDao = require('../DAOs/UrlDao');
const UrlSanitizer = require('./UrlSanitizer');
const Utils = require('./Utils');

class UrlService {
  /**
     *
     * @param {string} url
     * @return {string} code to url
     */
  async createUrl(url) {
    try {
      if (url != '') {
        const sanitized = UrlSanitizer.sanitize(url);

        const code = Utils.pickCode(process.env.CODELENGTH);

        const addedUrl = await UrlDao.addUrl(code, sanitized.href);

        return addedUrl;
      }
      throw new Error('System Error: Missing Url');
    } catch (err) {
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
      const url = await UrlDao.getUrlFromCode(code);

      const sanitizedUrl = UrlSanitizer.sanitize(url);
      return sanitizedUrl;
    } catch (err) {
      throw new Error('System Error: Unable to get Url from code.');
    }
  }
}

module.exports = new UrlService();
