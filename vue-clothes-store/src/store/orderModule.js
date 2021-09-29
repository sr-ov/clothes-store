import { apiWithToken } from '@/api'

export default {
	actions: {
		async buy({ commit }) {
			try {
				await apiWithToken.post('order/buy').json()
				commit('cart/clearCart', null, { root: true })
			} catch (error) {
				console.error(await error.response.json())

				return Promise.reject(error)
			}
		},
	},
	namespaced: true,
}
