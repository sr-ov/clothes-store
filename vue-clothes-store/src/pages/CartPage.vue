<template>
	<div v-if="items.length" class="container">
		<cart-list :items="items" @change-quantity="changeQuantity"></cart-list>

		<el-form :model="formModel" ref="formRef" class="form">
			<el-col :span="14">
				<el-form-item
					:label-width="160"
					prop="name"
					label="Имя"
					:rules="{
						required: true,
						message: 'Обязательное поле',
						trigger: 'blur',
					}"
				>
					<el-input v-model="formModel.name"></el-input>
				</el-form-item>

				<el-form-item
					:label-width="160"
					prop="phone"
					label="Контактный телефон"
					:rules="[
						{
							required: true,
							message: 'Обязательное поле',
							trigger: 'blur',
						},
						{
							type: 'string',
							pattern: /^\+7\s\(\d{3}\)\s\d{2}-\d{2}-\d{2}$/,
							required: true,
							message: 'некорректный номер',
							trigger: 'blur',
						},
					]"
				>
					<el-input
						@input="phoneHandler"
						:model-value="formModel.phone"
						placeholder="+7 (###) ##-##-##"
					></el-input>
				</el-form-item>

				<el-form-item
					:label-width="160"
					prop="address"
					label="Адрес доставки"
					:rules="{
						required: true,
						message: 'Обязательное поле',
						trigger: 'blur',
					}"
				>
					<el-input v-model="formModel.address"></el-input>
				</el-form-item>
			</el-col>

			<el-col :span="8" :push="1">
				<el-form-item>
					<div class="total">
						<span>Общая стоимость:</span>
						<span>{{ totalPrice }} ₽</span>
					</div>
				</el-form-item>

				<el-form-item>
					<el-button @click="buy" type="primary" plain class="width-100">
						Заказать
					</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
	<el-empty v-else description="В корзине пусто" class="empty"></el-empty>
</template>

<script>
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import { mask } from 'maska'

import { useReq } from '@/hooks'

export default {
	name: 'cart-page',
	setup() {
		const { dispatch, state } = useStore()
		const formModel = reactive({ name: '', phone: '', address: '' })
		const { elRef, request } = useReq()

		const changeQuantity = (size, color, productId, newValue, oldValue) => {
			const check = newValue > oldValue
			const quantity = check ? newValue - oldValue : oldValue - newValue

			dispatch('cart/getCart', {
				path: check ? 'add' : 'del',
				json: { quantity, size, color, productId },
			})
		}

		const phoneHandler = (value) => {
			formModel.phone = mask(value, '+7 (###) ##-##-##')
		}

		const buy = () => request({ name: 'order/buy', msg: 'Вы заказали' })

		return {
			buy,
			phoneHandler,
			changeQuantity,
			formModel,
			formRef: elRef,
			items: computed(() => state.cart.cartItems),
			totalPrice: computed(() => state.cart.totalPrice),
		}
	},
}
</script>

<style lang="scss" scoped>
.container {
	display: block;
	max-width: 1000px;
	margin: 0 auto;
	padding: 50px 15px;
}

.row + .row {
	margin-top: 20px;
}

.form {
	display: flex;
	margin-top: 50px;
}

.total {
	display: flex;
	justify-content: space-between;
	font-size: 20px;
	font-weight: 400;
}

.width-100 {
	width: 100%;
}

.empty {
	padding: 200px 0;
}
</style>
