class UrlSanitizer {


    sanitize(input) {
        try {
            let url = new URL(input)

            if(url.protocol === "http:" || url.protocol === "https:") {
                return url
            } else {
                throw new Error("Invalid Url protocol, must he http or https.")
            }
        } catch (err) {
            throw new Error("Invalid Url.");
        }
    }
}

module.exports = new UrlSanitizer();