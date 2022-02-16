const dbConnection = require('../Services/data')
const Utils = require("../Services/Utils")

class UrlDao {

    addUrl(url) {
        return new Promise((resolve, reject) => {
            let code = Utils.pickCode(process.env.CODELENGTH)
            dbConnection.database.run("INSERT INTO urls (url_code, url_address) VALUES($code, $url);", {
                $code: code,
                $url: url
            }, (err) => {
                if (err === null) {
                    resolve(code)
                } else {
                    reject("Error creating Url.")
                }
            })
        })
    }

    getUrlFromCode(code) {
        return new Promise((resolve, reject) => {
            dbConnection.database.get(`SELECT url_address FROM urls WHERE url_code=$code;`, {
                $code: code,
            }, (err, row) => {
                console.log('row', row)
                if (row != undefined) {
                    resolve(row.url_address)
                } else {

                    reject(new Error("Error fetching url."))
                }
            })
        })
    }
}

module.exports = new UrlDao();