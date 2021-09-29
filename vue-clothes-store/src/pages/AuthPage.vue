<template>
	<div class="container">
		<el-form :model="formModel" ref="formRef" label-width="100px">
			<h1 class="title">{{ isReg ? 'Зарегистрируйтесь' : 'Войдите' }}</h1>
			<el-form-item
				label="Email"
				prop="email"
				:rules="[
					{ required: true, message: 'Email обязателен', trigger: 'blur' },
					isReg
						? {
								type: 'email',
								message: 'Некорректный Email',
								trigger: 'blur',
						  }
						: {},
				]"
			>
				<el-input
					v-model="formModel.email"
					:placeholder="data.emailPlaceholder"
					:disabled="isLoading"
					autocomplete="off"
					type="email"
				></el-input>
			</el-form-item>

			<el-form-item
				label="Пароль"
				prop="password"
				:rules="[
					{ required: true, message: 'Пароль обязателен' },
					isReg
						? {
								message: 'Пароль меньше 6 знаков',
								min: 6,
								trigger: 'blur',
						  }
						: {},
				]"
			>
				<el-input
					v-model="formModel.password"
					:placeholder="data.passwordPlaceholder"
					:disabled="isLoading"
					autocomplete="off"
					type="password"
					show-password
				></el-input>
			</el-form-item>
			<el-form-item>
				<span>{{
					isReg ? 'Уже зарегистрированы?' : 'Не зарегистрированы?'
				}}</span
				>&nbsp;
				<el-link
					@click.prevent="$router.push(isReg ? '/login' : '/registration')"
					:href="isReg ? '/login' : '/registration'"
					:underline="false"
					type="success"
				>
					{{ isReg ? 'войти' : 'зарегистрироваться' }}
					.
				</el-link>
			</el-form-item>
			<el-form-item>
				<el-button
					@click="submit"
					:loading="isLoading"
					type="primary"
					plain
				>
					{{ isLoading ? 'подождите...' : data.btnText }}</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useReq } from '@/hooks'

export default {
	name: 'auth-page',
	setup() {
		const store = useStore()
		const route = useRoute()
		const formModel = reactive({ password: '', email: '' })
		const isReg = computed(() => route.path === '/registration')
		const { elRef, request } = useReq()

		const data = computed(() => ({
			emailPlaceholder: isReg.value
				? 'Используйте как логин для входа в личный кабинет'
				: 'Введите Email который указывали при регистрации',
			passwordPlaceholder: isReg.value
				? 'Пароль должен быть минимум из 6 знаков'
				: 'Введите пароль который указывали при регистрации',
			btnText: isReg.value ? 'Зарегистрироваться' : 'Войти',
		}))

		const path = computed(() => (isReg.value ? 'reg' : 'login'))
		const msg = computed(() =>
			isReg.value ? 'Вы успешно зарегистрировались' : 'Вы вошли',
		)

		const submit = () =>
			request({
				name: 'user/auth',
				payload: { path: path.value, json: formModel },
				msg: msg.value,
			})

		return {
			isReg,
			data,
			formModel,
			formRef: elRef,
			submit: computed(() => submit),
			isAuth: computed(() => store.state.user.isAuth),
			isLoading: computed(() => store.state.isLoading),
		}
	},
}
</script>

<style lang="scss" scoped>
.container {
	display: block;
	max-width: 600px;
	margin: 0 auto;
	padding: 100px 15px 150px 15px;
}

.title {
	padding-bottom: 50px;
}
</style>
