const UnauthorizedError = require('../errors/UnauthorizedError')

// const authorize = (req,res,next)=>{
//     const {role} = req.user
//     if (role === 'employee'){
//         throw new UnauthorizedError('You are not allowed to access this route')
//     } 
//     next()
// }

const authorize = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError(`${req.user.role}s are not allowed to access this route`)
        }
        next()
    }
}
module.exports = authorize

