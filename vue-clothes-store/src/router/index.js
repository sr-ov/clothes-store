import { createRouter, createWebHistory } from 'vue-router'

import {
	HomePage,
	GoodsPage,
	GoodPage,
	CartPage,
	AuthPage,
	NotFound,
} from '@/pages'

export default createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: HomePage },
		{ path: '/goods/:category?', component: GoodsPage },
		{ path: '/goods/:category/:good', component: GoodPage },
		{ path: '/cart', component: CartPage },
		{ path: '/login', component: AuthPage },
		{ path: '/registration', component: AuthPage },
		{ path: '/:NotFound(.*)', component: NotFound },
	],
})
