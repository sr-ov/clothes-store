require('dotenv').config()

const express = require('express')
const chalk = require('chalk')
const cors = require('cors')

const sequelize = require('./db')
const router = require('./routes')

const app = express()
const PORT = process.env.PORT ?? 4321

app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => {
			console.log(chalk.magenta.bold('START ==>', PORT))
		})
	} catch (error) {
		console.error(chalk.red.italic(error))
	}
}
start()
