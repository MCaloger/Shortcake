const sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl
const UrlDAO = require("../DAOs/UrlDAO")

class UrlService {

    sanitize(input) {
        return sanitizeUrl(input.toString());
    }

    /**
     * 
     * @param {string} url 
     * @returns {string} code to url
     */
    async createUrl(url) {
        try {
            if (url != "") {
                let sanitized = this.sanitize(url)
                let addToDb = await UrlDAO.addUrl(sanitized);
    
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
            let url = await UrlDAO.getUrlFromCode(code)
            let sanitizedUrl = this.sanitize(url.result)
            return url.result
        } catch(err) {
            throw new Error("System Error: Unable to get Url from code.")
        }
    }
}

module.exports = new UrlService();