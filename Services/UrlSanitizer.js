const logger = require('../Services/logger')
class UrlSanitizer {

    /**
     * Sanitize a given string to ensure it's a proper URL and that it has an HTTP/HTTPS protocol.
     *
     * @param {string} input
     * @return {Url} 
     * @memberof UrlSanitizer
     */
    sanitize(input) {
        try {
            let url = new URL(input)

            if(url.protocol === "http:" || url.protocol === "https:") {
                return url
            } else {
                throw new Error("Invalid Url protocol, must he http or https.")
            }
        } catch (err) {
            logger.error(err)
            throw new Error("Invalid Url.");
        }
    }
}

module.exports = new UrlSanitizer();