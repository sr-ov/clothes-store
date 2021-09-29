<template>
	<section class="card-good">
		<transition-fade>
			<div v-if="!isLoading" class="container card-good__wrapper">
				<div class="card-good__image-wrapper">
					<img
						class="card-good__image"
						:src="`/goods-image/${good.photo}`"
						:alt="good.name"
					/>
				</div>
				<div class="card-good__description">
					<h2 class="card-good__title-wrapper">
						<p class="card-good__brand">{{ good.brand }}</p>
						<p class="card-good__title">{{ good.name }}</p>
					</h2>
					<p class="card-good__price">{{ good.price }} ₽</p>

					<c-select
						v-if="good.sizes"
						v-model="size"
						:data="good.sizes"
						placeholder="размер"
						v-model:error="errorSize"
					></c-select>
					<c-select
						v-if="good.colors"
						v-model="color"
						:data="good.colors"
						placeholder="цвет"
						v-model:error="errorColor"
					></c-select>

					<el-button
						@click="clickHandler"
						:loading="loading"
						type="primary"
						class="card-good__buy"
					>
						Добавить в корзину
					</el-button>
				</div>
			</div>
		</transition-fade>

		<c-spinner :loading="isLoading" bg="transparent"></c-spinner>
	</section>
</template>

<script>
import { mapState } from 'vuex'
import { useShowMsg } from '@/hooks'

export default {
	name: 'good-page',
	data() {
		return {
			loading: false,
			errorSize: false,
			errorColor: false,
			productData: {
				color: '',
				size: '',
				productId: undefined,
			},
		}
	},
	methods: {
		async addToCart() {
			if (this.good.sizes && !this.size) {
				this.errorSize = true
			}

			if (this.good.colors && !this.color) {
				this.errorColor = true
			}

			if (!this.errorSize && !this.errorColor) {
				this.toggleLoading(true)

				await this.$store.dispatch('cart/getCart', {
					path: 'add',
					json: this.productData,
				})

				this.showMsg()
				this.toggleLoading(false)
			}
		},

		clickHandler() {
			if (this.isAuth) {
				this.addToCart()
			} else {
				this.$router.push('/login')
			}
		},

		showMsg() {
			useShowMsg()('Товар добавлен в корзину')
		},

		toggleLoading(payload) {
			this.loading = payload
		},
	},
	computed: mapState({
		good: ({ goods }) => goods.good,
		isLoading: ({ goods }) => goods.loading,
		isAuth: ({ user }) => user.isAuth,
	}),
	mounted() {
		this.productData.productId = this.$route.params.good
	},
}
</script>

<style scoped>
.card-good__buy {
	font-weight: 700;
	font-size: 16px;
}
</style>
