import { api } from '@/api'

export default {
	state() {
		return {
			goods: [],
			good: {},
			categories: [],
			loading: false,
		}
	},
	mutations: {
		setGoods(state, { goods }) {
			state.goods = goods
		},
		setCategories(state, { categories }) {
			state.categories = categories
		},
		setGood(state, { good }) {
			state.good = good
		},
		setLoading(state, payload) {
			state.loading = payload
		},
	},
	actions: {
		async get({ commit }, { path, mutationName }) {
			try {
				commit('setLoading', true)

				const res = await api.get(path).json()
				commit(mutationName, res)
			} catch (error) {
				console.error(await error.response.json())
			} finally {
				commit('setLoading', false)
			}
		},
	},
	namespaced: true,
}
