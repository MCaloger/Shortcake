const dbConnection = require('../Services/data')
const logger = require('../Services/logger')
const Utils = require("../Services/Utils")

class UrlDao {

    constructor(connection) {
        this.connection = connection
    }

    /**
     *
     *
     * @param {String} HTTP/HTTPS url
     * @return {code: String} 
     * @memberof UrlDao
     */
    addUrl(url) {
        return new Promise((resolve, reject) => {
            try {
                let code = Utils.pickCode(process.env.CODELENGTH)
                this.connection.database.run("INSERT INTO urls (url_code, url_address) VALUES($code, $url);", {
                    $code: code,
                    $url: url
                }, (err) => {
                    if (err === null) {
                        resolve(code)
                    } else {
                        logger.error(err)
                        reject("Error creating Url.")
                    }
                })
            } catch(error) {
                logger.error(err)
                reject(new Error("System Error"))
            }
        })
    }
    
    /**
     *
     *
     * @param {String} url code
     * @return {String} Url 
     * @memberof UrlDao
     */
    getUrlFromCode(code) {
            return new Promise((resolve, reject) => {
                try {
                    this.connection.database.get(`SELECT url_address FROM urls WHERE url_code=$code;`, {
                        $code: code,
                    }, (err, row) => {

                        if (row != undefined) {
                            resolve(row.url_address)
                        } else {
                            logger.error(err)
                            reject(new Error("Error fetching url."))
                        }
                    })
                } catch(error){
                    logger.error(err)
                    reject(new Error("System Error"))
                }
            })
        }
}

module.exports = new UrlDao(dbConnection);