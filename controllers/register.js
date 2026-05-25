const BadRequestError = require('../errors/BadRequest')
const UnauthenticatedError = require('../errors/unauthenticated')

const User = require('../models/user')

const register = async (req,res)=>{
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(200).json({name:user.username,token,role:user.role})
}

const login = async (req,res)=>{
    const {email,password} = req.body

    if(!email || !password){
        throw new BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError(`No E-mail ${email} found`)
    }
    const isMatch = await user.comparePasswords(password)
    if(!isMatch){
        throw new UnauthenticatedError("Wrong Password")
    }

    const token  = user.createJWT()
    res.status(200).json({username:user.username,token,role:user.role})
}

module.exports = {register,login}