import { createStore } from 'vuex'

import userModule from '@/store/userModule'
import cartModule from '@/store/cartModule'
import goodsModule from '@/store/goodsModule'
import orderModule from '@/store/orderModule'

export default createStore({
	modules: {
		user: userModule,
		cart: cartModule,
		goods: goodsModule,
		order: orderModule,
	},
})
