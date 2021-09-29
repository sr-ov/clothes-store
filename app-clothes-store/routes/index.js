const router = require('express').Router()

const categoriesRouter = require('./categoriesRouter')
const goodsRouter = require('./goodsRouter')
const userRouter = require('./userRouter')
const cartRouter = require('./cartRouter')
const orderRouter = require('./orderRouter')

module.exports = router
	.use('/categories', categoriesRouter)
	.use('/goods', goodsRouter)
	.use('/user', userRouter)
	.use('/cart', cartRouter)
	.use('/order', orderRouter)
