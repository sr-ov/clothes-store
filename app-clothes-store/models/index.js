const { DataTypes } = require('sequelize')

const sequelize = require('../db')

const User = sequelize.define('user', {
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
})

const Cart = sequelize.define('cart', {})

const Category = sequelize.define('category', {
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	nameRu: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Product = sequelize.define('product', {
	categoryName: { type: DataTypes.STRING, allowNull: false },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	colors: { type: DataTypes.ARRAY(DataTypes.STRING) },
	sizes: { type: DataTypes.ARRAY(DataTypes.STRING) },
	photo: { type: DataTypes.STRING, unique: true, allowNull: false },
	preview: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const ProductCart = sequelize.define('productCart', {
	color: { type: DataTypes.STRING },
	size: { type: DataTypes.STRING },
})

const ProductOrder = sequelize.define('productOrder', {
	color: { type: DataTypes.STRING },
	size: { type: DataTypes.STRING },
	quantity: { type: DataTypes.INTEGER, allowNull: false },
})

const Order = sequelize.define('order', {})

User.hasOne(Cart)
Cart.belongsTo(User)

Cart.hasMany(ProductCart)
ProductCart.belongsTo(Cart)

Product.hasMany(ProductCart)
ProductCart.belongsTo(Product)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(ProductOrder)
ProductOrder.belongsTo(Order)

Product.hasMany(ProductOrder)
ProductOrder.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = {
	User,
	Cart,
	Category,
	Product,
	ProductCart,
	Order,
	ProductOrder,
}
