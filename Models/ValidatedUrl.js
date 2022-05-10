const logger = require('../Services/logger');
const UrlSanitizer = require('../Services/UrlSanitizer')

class ValidatedUrl {
    constructor(url) {
        try {
            const sanitizedUrl = UrlSanitizer.sanitize(url)
            this.url = sanitizedUrl; 
        } catch(error) {
            this.url = null;
            logger.error('ValidatedUrl error:', error, url);
            throw new Error("Invalid Url.", url);
        }
    }
}

module.exports = ValidatedUrl