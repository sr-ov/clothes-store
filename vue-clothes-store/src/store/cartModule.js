import { apiWithToken } from '@/api'

export default {
	state: () => ({
		cartItems: [],
		totalPrice: 0,
		totalQuantity: 0,
	}),
	mutations: {
		setCart(state, { totalPrice, cartItems, totalQuantity }) {
			state.cartItems = cartItems
			state.totalPrice = totalPrice
			state.totalQuantity = totalQuantity
		},
		clearCart(state) {
			state.cartItems = []
			state.totalPrice = 0
			state.totalQuantity = 0
		},
	},
	actions: {
		async getCart({ commit }, { path, json }) {
			try {
				const res = await apiWithToken.post(`cart/${path}`, { json }).json()

				commit('setCart', res)

				return Promise.resolve()
			} catch (error) {
				console.error(await error.response.json())
				return Promise.reject(error)
			}
		},
	},
	namespaced: true,
}
