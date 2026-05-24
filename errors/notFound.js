const CustomAPIError = require('./customError')

class NotFoundError extends Error {
    constructor(message,statusCode){
        super(message)
        this.statusCode = 404
    }
}
module.exports = NotFoundError