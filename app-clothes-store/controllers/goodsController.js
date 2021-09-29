const chalk = require('chalk')

const { Product } = require('../models')

module.exports = {
	async byCategory(req, res) {
		try {
			const { category } = req.params

			if (!category) {
				const goods = await Product.findAll()

				return res.json({ goods })
			}

			const goods = await Product.findAll({
				where: { categoryName: category },
			})

			res.json({ goods })
		} catch (error) {
			console.error(chalk.red(error))
			res.status(404).json({ msg: 'Ошибка при загрузке товаров' })
		}
	},

	async one(req, res) {
		try {
			const good = await Product.findByPk(req.params.id)

			res.json({ good })
		} catch (error) {
			console.error(chalk.red(error))
			res.status(404).json({ msg: 'Ошибка при загрузке товара' })
		}
	},
}
