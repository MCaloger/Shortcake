
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
                let sanitized = UrlSanitizer(url)
                let addToDb = await UrlDao.addUrl(sanitized);
    
                let err = addToDb.err
                let code = addToDb.code

                if (err === null) {
                    console.log(code);
                    return code
                } else {
                    throw new Error("System Error: Unable to add Url")
                }
            } else {
                throw new Error("System Error: Missing Url")
            }
        } catch (err) {
            console.log(err)
            throw new Error("System Error")
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
            let sanitizedUrl = UrlSanitizer(url.result)
            return url.result
        } catch(err) {
            throw new Error("System Error: Unable to get Url from code.")
        }
    }
}

module.exports = new UrlService();