import ky from 'ky'

const URL = (process.env.VUE_APP_URl ?? 'http://localhost:4321') + '/api'

export const api = ky.create({ prefixUrl: URL })
export const apiWithToken = api.extend({
	hooks: {
		beforeRequest: [
			(request) => {
				request.headers.set(
					'Authorization',
					`Bearer ${localStorage.getItem('token')}`,
				)
			},
		],
	},
})
