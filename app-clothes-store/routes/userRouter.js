const router = require('express').Router()
const { body } = require('express-validator')

const userController = require('../controllers/userController')
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware')

const errorChecks = [
	body('email', 'Некорректный Email').isEmail().notEmpty(),
	body('password', 'Пароль меньше 6 знаков').isLength({ min: 6 }),
]

module.exports = router
	.post('/reg', errorChecks, userController.reg)
	.post('/login', userController.login)
	.post('/auth', checkAuthMiddleware, userController.auth)
