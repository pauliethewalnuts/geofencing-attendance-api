const CustomAPIError = require('./customError')

class BadRequestError extends CustomAPIError{
    constructor(message,statuscode){
        super(message)
        this.statuscode = 400
    }
}

module.exports = BadRequestError