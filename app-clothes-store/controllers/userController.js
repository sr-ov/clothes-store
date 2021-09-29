const chalk = require('chalk')
const { validationResult } = require('express-validator')
const { UniqueConstraintError } = require('sequelize')

const userService = require('../services/userService')

module.exports = {
	async reg(req, res) {
		try {
			validationResult(req).throw()

			const data = await userService.reg(req.body)

			res.json(data)
		} catch (error) {
			if (error instanceof UniqueConstraintError) {
				return res
					.status(400)
					.json({ msg: 'Пользователь с таким Email уже существует' })
			}

			console.error(chalk.red(error))
			res.status(400).json({ msg: error.errors })
		}
	},

	async login(req, res) {
		try {
			const data = await userService.login(req.body)

			res.json(data)
		} catch (error) {
			console.error(chalk.red(error))
			res.status(400).json({ msg: error.message })
		}
	},

	async auth(req, res) {
		try {
			const data = await userService.auth(req.user.id)

			res.json(data)
		} catch (error) {
			console.error(chalk.red(error))
			res.status(401).json({
				msg: 'ошибка при авторизации',
				error: error.message,
			})
		}
	},
}
