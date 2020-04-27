const router = require('express').Router()
const UserController = require('../controllers/UserController')
const todoRouter = require('./todoRouter')

//login and register
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//Todo routes
router.use('/todos', todoRouter)

module.exports = router