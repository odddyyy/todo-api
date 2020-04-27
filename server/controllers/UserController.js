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

    static async getProfile (req, res, next) {
        try {
            const getUser = await User.findById({ _id: req.userData.id })
            const userProfile = { username: getUser.username, email: getUser.email }
            res.status(200).json(userProfile)
        } catch (err) {
            next(err)
        }
    }

    static async updateProfile (req, res, next) {
        const { username, email } = req.body
        try {
            await User.updateOne({_id: req.userData.id}, { username, email })
            res.status(200).json('Profile updated')
        } catch (err) {
            next(err)
        }
    }

    static async changePassword (req, res, next) {
        const { password, newPassword } = req.body
        try {
            if (!newPassword || newPassword === '') throw ({status:400, message: 'Please insert new password'})
            const user = await User.findById({_id: req.userData.id})
            const matchedPassword = decryptPassword(password, user.password)
            if (!matchedPassword) throw ({status:400, message: 'Invalid password'})
            const newHashedPassword = await hashingPassword(newPassword)
            await User.updateOne({_id: req.userData.id}, {password: newHashedPassword})
            res.status(200).json('Password updated')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController