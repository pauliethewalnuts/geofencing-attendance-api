const CustomAPIError = require('./customError')

class UnauthorizedError extends CustomAPIError{
    constructor(message,statusCode){
        super(message)
        this.statusCode = 403
    }
}

module.exports = UnauthorizedError