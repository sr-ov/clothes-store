const sequelize = require('../db')
const { ProductCart, Product } = require('../models')

class CartService {
	totalCount(arr) {
		let totalQuantity = 0
		let totalPrice = 0

		arr.forEach((el) => {
			totalQuantity += el.cntSize = Number(el.cntSize)
			totalPrice += el.totalPrice = Number(el.totalPrice)
		})

		return { totalQuantity, totalPrice }
	}

	async getCart(cartId) {
		const cartItems = await ProductCart.findAll({
			where: { cartId },
			attributes: [
				'color',
				[sequelize.fn('count', sequelize.col('color')), 'cntColor'],
				'size',
				[sequelize.fn('count', sequelize.col('size')), 'cntSize'],
				[sequelize.fn('sum', sequelize.col('product.price')), 'totalPrice'],
				[sequelize.col('product.name'), 'productName'],
				[sequelize.col('product.price'), 'productPrice'],
				[sequelize.col('product.preview'), 'productPreview'],
				[sequelize.col('product.id'), 'productId'],
			],
			group: ['size', 'product.id', 'productCart.color'],
			include: {
				model: Product,
				attributes: [],
			},
			raw: true,
		})

		const { totalQuantity, totalPrice } = this.totalCount(cartItems)

		return { cartItems, totalQuantity, totalPrice }
	}

	async addToCart({ cartId, productId, color, size, quantity }) {
		try {
			for (let index = 0; index < quantity; index += 1) {
				await ProductCart.create({ cartId, productId, color, size })
			}

			return this.getCart(cartId)
		} catch (error) {
			console.error(error)
			return Promise.reject(error)
		}
	}

	async delFromCart({ cartId, productId, size, color, quantity }) {
		const items = await ProductCart.findAll({
			where: { productId, cartId, size, color },
		})

		for (let index = 0; index < quantity; index += 1) {
			await items[index].destroy()
		}

		return this.getCart(cartId)
	}

	async clearCart(cartId) {
		await ProductCart.destroy({ where: { cartId } })
	}
}

module.exports = new CartService()
