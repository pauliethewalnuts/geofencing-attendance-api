const errorHandlerMiddleware = (err,req,res,next) =>{
    let customError = {
        msg: err.message || 'Something Went Wrong, Please try again Later',
        statusCode: err.statusCode || 500
    }
    res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandlerMiddleware