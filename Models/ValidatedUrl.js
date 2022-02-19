const UrlSanitizer = require('../Services/UrlSanitizer')

class ValidatedUrl {
    constructor(url) {
        try {
            const sanitizedUrl = UrlSanitizer.sanitize(url)
            this.url = sanitizedUrl; 
        } catch(error) {
            this.url = null;
            throw new Error("Invalid Url.");
        }
    }
}

module.exports = ValidatedUrl