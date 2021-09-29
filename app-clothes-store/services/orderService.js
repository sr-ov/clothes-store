const cartService = require('./cartService')
const { Order, ProductOrder } = require('../models')

class OrderService {
	transformCartToBuy(cart, orderId) {
		return cart.map(({ productId, color, size, cntSize }) => {
			return {
				orderId,
				productId,
				color,
				size,
				quantity: cntSize,
			}
		})
	}

	async buy(userId, cartId) {
		const order = await Order.create({ userId })
		const cart = await cartService.getCart(cartId)

		const transformedCart = this.transformCartToBuy(cart.cartItems, order.id)
		const orderData = await ProductOrder.bulkCreate(transformedCart)
		await cartService.clearCart(cartId)

		return orderData
	}
}

module.exports = new OrderService()
