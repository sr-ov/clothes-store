const router = require('express').Router()

const categoriesController = require('../controllers/categoriesController')

module.exports = router.get('', categoriesController.getCategories)
