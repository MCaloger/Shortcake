class UrlSanitizer {

    /**
     * Sanitize a given string to ensue it's a proper URl and that it has an HTTP/HTTPS protocol.
     *
     * @param {string} input
     * @return {Url} 
     * @memberof UrlSanitizer
     */
    sanitize(input) {
        try {
            console.log('input', input)
            let url = new URL(input)

            if(url.protocol === "http:" || url.protocol === "https:") {
                return url
            } else {
                throw new Error("Invalid Url protocol, must he http or https.")
            }
        } catch (err) {
            console.log('err', err)
            throw new Error("Invalid Url.");
        }
    }
}

module.exports = new UrlSanitizer();