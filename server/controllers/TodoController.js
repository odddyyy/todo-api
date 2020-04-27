const Todo = require('../models/Todo')

class TodoController {

    static async getAllTodo (req, res, next) {
        try {
            const allTodos = await Todo.find({ userId : req.userData.id })
            res.status(200).json(allTodos)
        } catch (err) {
            next(err)
        }
    }

    static async getOneTodo (req, res, next) {
        try {
            const find = await Todo.findById({_id:req.params.todoId})
            res.status(200).json(find)
        } catch (err) {
            next(err)
        }
    }

    static async postTodo (req, res, next) {
        const { title, description } = req.body
        try {
            const newTodo = await Todo.create({ title, description, userId: req.userData.id })
            res.status(201).json('successfully created new todo')
        } catch (err) {
            next(err)
        }
    }

    static async deleteTodo (req, res, next) {
        try {
            await Todo.remove({ _id: req.params.todoId })
            res.status(200).json('Todo deleted')
        } catch (err) {
            next(err)
        }
    }

    static async updateTodo (req, res, next) {
        const { title, description, status } = req.body
        const updatedDate = Date.now()
        try {
            await Todo.updateOne({_id: req.params.todoId}, { title, description, status, date:updatedDate })
            res.status(201).json('Todo updated')
        } catch (err) {
            next(err)
        }
    }

}

module.exports = TodoController