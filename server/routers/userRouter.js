const router = require('express').Router()
const { authentication } = require('../middlewares/auth')
const UserController = require('../controllers/UserController')

router.get('/', authentication, UserController.getProfile)
router.patch('/', authentication, UserController.updateProfile)
router.patch('/password', authentication, UserController.changePassword)

module.exports = router