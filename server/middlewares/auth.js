const { verifyToken } = require('../helpers/jwt')
const Todo = require('../models/Todo')

const authentication = (req, res, next) => {
    const { token } = req.headers
    try {
        const verified = verifyToken(token)
        req.userData = verified
        next()
    } catch (err) {
        next(err)
    }
}

const authorization = async (req, res, next) => {
    const id = req.params.todoId
    try {
        const findTodo = await Todo.findById({_id:id})
        if (findTodo.userId !== req.userData.id) {
            throw({status:404, message:'You are not authorized'})
        }
        next()
        
    } catch (err) {
        next(err)
    }
}


module.exports = {
    authentication,
    authorization
}