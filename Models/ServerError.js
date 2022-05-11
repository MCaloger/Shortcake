const BaseError = require("./BaseError");

class ServerError extends BaseError {
    constructor(errorMessage, humanMessage, httpStatus=500, isServer=true){
        super(errorMessage, humanMessage, httpStatus, isServer);
    }
}

module.exports = ServerError;