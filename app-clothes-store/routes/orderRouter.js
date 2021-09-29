const router = require('express').Router()

const orderController = require('../controllers/orderController')
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware')

module.exports = router
	.use(checkAuthMiddleware)
	.post('/buy', orderController.buy)
