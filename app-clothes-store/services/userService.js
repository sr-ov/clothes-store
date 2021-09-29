const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User, Cart } = require('../models')
const cartService = require('./cartService')

class UserService {
	generateToken(data) {
		return jwt.sign(data, process.env.SECRET, { expiresIn: '24h' })
	}

	async reg({ password, email }) {
		const hashPassword = await bcrypt.hash(password, 5)

		const user = await User.create({ email, password: hashPassword })
		const cart = await Cart.create({ userId: user.id })

		const cartItems = await cartService.getCart(cart.id)

		return {
			cartItems,
			msg: 'Пользователь зарегистрирован',
			token: this.generateToken({ id: user.id, cartId: cart.id }),
			email: user.email,
		}
	}

	async login({ email, password }) {
		const user = await User.findOne({ where: { email } })
		if (!user) {
			throw Error('Пользователь с таким Email не найден')
		}

		const validPass = await bcrypt.compare(password, user.password)
		if (!validPass) {
			throw Error('Введён неверный пароль')
		}

		const cart = await Cart.findOne({ where: { userId: user.id } })
		const cartItems = await cartService.getCart(cart.id)

		return {
			cartItems,
			token: this.generateToken({ id: user.id, cartId: cart.id }),
			email: user.email,
		}
	}

	async auth(id) {
		const user = await User.findByPk(id)
		if (!user) {
			throw Error('пользователь не найден')
		}

		const cart = await Cart.findOne({ where: { userId: user.id } })
		const cartItems = await cartService.getCart(cart.id)

		return {
			cartItems,
			token: this.generateToken({ id: user.id, cartId: cart.id }),
			email: user.email,
		}
	}
}

module.exports = new UserService()
