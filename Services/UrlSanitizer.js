const sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl

class UrlSanitizer {

    sanitize(input) {
        console.log(sanitizeUrl)
        return sanitizeUrl(input.toString());
    }
}

module.exports = new UrlSanitizer();