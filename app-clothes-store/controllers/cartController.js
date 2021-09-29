const chalk = require('chalk')

const cartService = require('../services/cartService')

module.exports = {
	async getCart(req, res) {
		try {
			const data = await cartService.getCart(req.user.cartId)

			res.json(data)
		} catch (error) {
			console.error(chalk.red(error))
			res.status(400).json({ msg: 'Ошибка при получении корзины' })
		}
	},

	async addToCart(req, res) {
		try {
			const { productId, color, size, quantity = 1 } = req.body
			const { cartId } = req.user

			const data = await cartService.addToCart({
				cartId,
				productId,
				color,
				size,
				quantity,
			})

			res.json(data)
		} catch (error) {
			console.error(chalk.red(error))
			res.status(400).json({ msg: 'Ошибка при добавлении в корзину' })
		}
	},

	async delFromCart(req, res) {
		try {
			const { cartId } = req.user
			const data = await cartService.delFromCart({ cartId, ...req.body })

			res.json(data)
		} catch (error) {
			console.error(chalk.red(error))
			res.status(400).json({ msg: 'Ошибка при удалении из корзины' })
		}
	},
}
