const User = require('../models/User')
const { hashingPassword, decryptPassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class UserController {

    static async register (req, res, next) {
        const { username, email, password } = req.body
        try {
            const findEmail = await User.findOne({ email })
            if (findEmail) {
                throw ({status:400, message: 'Email already registered'})
            }

            const storedPassword = hashingPassword(password)
            const newRegistration = await User.create({ username, email, password: storedPassword })
            const token = createToken({id: newRegistration._id, username: newRegistration.username, email: newRegistration.email, role: newRegistration.role})
            res.status(201).json({
                token,
                username
            })
        } catch (err) {
            next(err)
        }
    }

    static async login (req, res, next) {
        const { email, password } = req.body
        try {
            const findEmail = await User.findOne({ email })
            if (!findEmail) {
                throw ({status:404, message:'Invalid Email / Password'})
            }

            const verifyPassword = decryptPassword(password, findEmail.password)
            if (!verifyPassword){
                throw ({status:404, message:'Invalid Email / Password'})
            }

            const token = createToken({id: findEmail._id, username: findEmail.username, email: findEmail.email, role: findEmail.role})
            res.status(200).json({
                token,
                username: findEmail.username
            })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = UserController