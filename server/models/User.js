const moongose = require('mongoose')
const Schema = moongose.Schema

const UserSchema = new Schema({
    username: { type: String, required: [true, 'please insert username'] },
    email: { type: String, required: [true, 'please insert email'] },
    password: { type: String, required: [true, 'please insert password'] },
    role: { type: String, default: 'user' }
})

module.exports = moongose.model('Users', UserSchema)