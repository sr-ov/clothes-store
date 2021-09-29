const chalk = require('chalk')

const { Category } = require('../models')

module.exports = {
	async getCategories(_, res) {
		try {
			const categories = await Category.findAll({
				attributes: ['name', 'id', 'nameRu'],
			})

			res.json({ categories })
		} catch (error) {
			console.error(chalk.red(error))
			res.status(400).json({ msg: 'Ошибка при загрузке категорий' })
		}
	},
}
