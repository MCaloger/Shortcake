const dbConnection = require("./data")
const Utils = require("./Utils")
const sanitizeUrl = require("@braintree/sanitize-url").sanitizeUrl

class UrlService {

    addURL(url) {
        return new Promise(resolve => {
            let code = Utils.pickCode(process.env.CODELENGTH)

            dbConnection.database.run("INSERT INTO urls (url_code, url_address) VALUES($code, $url);", {
                $code: code,
                $url: url
            }, (err) => {
                if (err === null) {
                    resolve({
                        err: null,
                        code: code
                    });
                } else {
                    resolve({
                        err: "Unable to add URL",
                        code: null
                    })
                }
            })
        })
    }

    getURL(code) {
        return new Promise(resolve => {
            dbConnection.database.get(`SELECT url_address FROM urls WHERE url_code=$code;`, {
                $code: code,
            }, (err, row) => {
                if (row === undefined) {
                    resolve({
                        err: "Unable to find url.",
                        result: ""
                    });
                } else {
                    resolve({
                        err: null,
                        result: row.url_address
                    })
                }
            })
        })
    }

    sanitize(input) {
        return sanitizeUrl(input.toString());
    }
}

module.exports = new UrlService();