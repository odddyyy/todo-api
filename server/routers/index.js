const router = require('express').Router()
const UserController = require('../controllers/UserController')
const todoRouter = require('./todoRouter')
const userRouter = require('./userRouter')

//login and register
router.post('/register', UserController.register)
router.post('/login', UserController.login)

//User routes
router.use('/profile', userRouter)

//Todo routes
router.use('/todos', todoRouter)

module.exports = router