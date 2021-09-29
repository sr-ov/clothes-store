import { apiWithToken } from '@/api'

export default {
	state: () => ({
		isAuth: false,
		email: '',
	}),
	mutations: {
		setLogin(state, { email, token }) {
			state.isAuth = true
			state.email = email
			localStorage.setItem('token', token)
		},
		setLogout(state) {
			state.email = ''
			state.isAuth = false
			localStorage.removeItem('token')
		},
	},
	actions: {
		auth({ commit }, { path, json }) {
			return new Promise((resolve, reject) => {
				apiWithToken
					.post(`user/${path}`, { json })
					.json()
					.then((res) => {
						commit('setLogin', res)
						commit('cart/setCart', res.cartItems, { root: true })

						resolve()
					})
					.catch(reject)
			})
		},
	},
	namespaced: true,
}
