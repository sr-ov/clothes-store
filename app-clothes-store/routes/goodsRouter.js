const router = require('express').Router()

const goodsController = require('../controllers/goodsController')

module.exports = router
	.get('/:category?', goodsController.byCategory)
	.get('/:category/:id', goodsController.one)
