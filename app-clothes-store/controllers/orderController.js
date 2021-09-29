const orderService = require('../services/orderService')

module.exports = {
	async buy(req, res) {
		try {
			const { cartId, id } = req.user

			const data = await orderService.buy(id, cartId)

			res.json(data)
		} catch (error) {
			res.status(400).json({
				msg: 'ошибка при покупке',
				error: error.message,
			})
		}
	},
}
