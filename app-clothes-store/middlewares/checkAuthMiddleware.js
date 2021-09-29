const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}

	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) {
			return res.status(401).json({ msg: 'Нет токена' })
		}

		req.user = jwt.verify(token, process.env.SECRET)
		next()
	} catch (error) {
		res.status(401).json({ msg: 'Пользователь не авторизован' })
		console.error(error)
	}
}
