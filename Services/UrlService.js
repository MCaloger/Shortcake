
const UrlDao = require("../DAOs/UrlDao")
const UrlSanitizer = require('./UrlSanitizer')
class UrlService {

    

    /**
     * 
     * @param {string} url 
     * @returns {string} code to url
     */
    async createUrl(url) {
        try {
            if (url != "") {
                const sanitized = UrlSanitizer.sanitize(url)
                
                const addedUrl = await UrlDao.addUrl(sanitized.href);

                return addedUrl
            } else {
                throw new Error("System Error: Missing Url")
            }
        } catch (err) {
            console.log('err', err)
            throw new Error("System Error, unable to create Url.")
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
            let url = await UrlDao.getUrlFromCode(code)

            let sanitizedUrl = UrlSanitizer.sanitize(url)
            return url
        } catch(err) {
            throw new Error("System Error: Unable to get Url from code.")
        }
    }
}

module.exports = new UrlService();