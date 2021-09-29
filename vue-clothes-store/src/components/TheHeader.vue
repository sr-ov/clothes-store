<template>
	<header class="header">
		<div class="container">
			<div class="header__wrapper">
				<button class="header__city-button">Ваш город?</button>
				<div class="header__right-block">
					<p class="header__delivery">Бесконтактная доставка</p>
					<p class="header__pay">Платите чем хотите</p>
					<div class="header__birthday">
						<span>нам </span>
						<img
							class="header__birthday-img"
							src="/image/35.svg"
							alt=""
						/>
						<span>лет!</span>
					</div>
				</div>
			</div>
		</div>
	</header>
	<section class="subheader">
		<div class="container">
			<div class="subheader__wrapper">
				<categories-nav></categories-nav>
				<router-link to="/" class="subheader__logo">
					<img src="/image/logo.svg" alt="Компания Lomoda" />
				</router-link>
				<div class="btns-wrapper">
					<router-link v-if="!isAuth" to="/login" class="subheader__login">
						<i class="el-icon-right"></i>
						Войти
					</router-link>

					<el-dropdown v-else trigger="click" class="dropdown">
						<span class="el-dropdown-link">
							<i class="el-icon-user"></i> {{ email }}
						</span>
						<template #dropdown>
							<el-dropdown-menu>
								<el-dropdown-item @click="logout">
									Выйти
								</el-dropdown-item>
							</el-dropdown-menu>
						</template>
					</el-dropdown>

					<router-link to="/cart">
						<el-badge
							:value="totalQuantity"
							:max="99"
							:class="['subheader__cart', { active }]"
						>
							<el-button size="small">Корзина</el-button>
						</el-badge>
					</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'the-header',
	methods: {
		logout() {
			this.$store.commit('user/setLogout')
			this.$store.commit('cart/clearCart')
			this.$router.replace('/goods')
		},
	},

	computed: {
		...mapState({
			isAuth: ({ user }) => user.isAuth,
			email: ({ user }) => user.email,
			totalQuantity: ({ cart }) =>
				cart.totalQuantity > 0 ? cart.totalQuantity : '',
		}),

		active() {
			return this.$route.path.includes('cart')
		},
	},
}
</script>

<style>
.btns-wrapper {
	display: flex;
	justify-content: flex-end;
}

.subheader__login {
	display: block;
	justify-self: end;
	align-self: center;
	background-color: transparent;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: left;
	padding-left: 30px;
	border: none;
	margin-right: 10px;
}

.subheader__cart > button {
	border: none;
	font-family: inherit;
	font-size: inherit;
	font-weight: inherit;
	padding-left: 0;
}

.subheader__cart > sup.is-fixed {
	top: 8px;
	right: 17px;
}

.subheader__cart > button:hover {
	background-color: #fff;
	color: inherit;
}

.subheader__cart > button:focus,
.subheader__cart > button:active {
	background-color: #fff;
	color: inherit;
}

.subheader__cart.active span {
	text-decoration: underline;
}

.dropdown {
	display: flex;
	align-items: center;
	font-size: 16px;
	margin-right: 10px;
	cursor: pointer;
}
</style>
