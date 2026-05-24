const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')
const user = require('../models/user')

const auth = async (req,res,next)=>{
    const {authorization:auth} = req.headers
    if (!auth || !auth.startsWith('Bearer')){
        throw new UnauthenticatedError('Invalid Token')
    }

    const token = auth.split(' ')[1]

    try {
        const info = await jwt.verify(token,process.env.JWT_SECRET)
        req.user = {userId:info.userId,name:info.name,role:info.role}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Invalid Token') 
    }
}

module.exports = auth