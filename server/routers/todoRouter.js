const router = require('express').Router()
const TodoController = require('../controllers/TodoController')
const { authentication, authorization } = require('../middlewares/auth')

router.get('/', authentication, TodoController.getAllTodo)
router.post('/', authentication, TodoController.postTodo)
router.get('/:todoId', authentication, authorization, TodoController.getOneTodo)
router.patch('/:todoId', authentication, authorization, TodoController.updateTodo)
router.delete('/:todoId', authentication, authorization, TodoController.deleteTodo)

module.exports = router