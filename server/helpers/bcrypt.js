const bcrypt = require('bcrypt')
const salt = 10

const hashingPassword = (password) => {
    return bcrypt.hashSync(password, salt)
}

const decryptPassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    hashingPassword,
    decryptPassword
}