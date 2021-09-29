<template>
	<template v-if="!loading">
		<the-header></the-header>
		<transition-fade>
			<router-view style="min-height: 577px" />
		</transition-fade>
		<the-footer></the-footer>
	</template>

	<c-spinner v-else :loading="loading"></c-spinner>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		...mapActions('user', ['auth']),
		...mapActions('goods', ['get']),
	},

	async mounted() {
		try {
			this.loading = true

			await Promise.allSettled([
				this.get({
					mutationName: 'setCategories',
					path: 'categories',
				}),

				this.auth({ path: 'auth' }),
			])
		} catch (error) {
			console.error(error)
		} finally {
			this.loading = false
		}
	},

	watch: {
		$route(newValue) {
			const path = newValue.path.slice(1)

			if (path.includes('goods')) {
				this.get({
					path,
					mutationName: newValue.params.good ? 'setGood' : 'setGoods',
				})
			}
		},
	},
}
</script>

<style>
.router-link-exact-active {
	text-decoration: underline;
}
</style>
