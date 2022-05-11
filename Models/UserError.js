const BaseError = require("./BaseError");

class UserError extends BaseError {
    constructor(errorMessage, humanMessage, httpStatus=400, isServer=false){
        super(errorMessage, humanMessage, httpStatus, isServer);
    }
}

module.exports = UserError;