const router = require('express').Router()

const cartController = require('../controllers/cartController')
const checkAuthMiddleware = require('../middlewares/checkAuthMiddleware')

module.exports = router
	.use(checkAuthMiddleware)
	.post('/', cartController.getCart)
	.post('/add', cartController.addToCart)
	.post('/del', cartController.delFromCart)
