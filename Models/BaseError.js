class BaseError extends Error {
    constructor(errorMessage, humanMessage, httpStatus, isServer){
        super(errorMessage);
        Object.setPrototypeOf(this, new.target.prototype);
        this.errorMessage = errorMessage;
        this.humanMessage = humanMessage;
        this.httpStatus = httpStatus;
        this.isServer = isServer;
    }
}

module.exports = BaseError;