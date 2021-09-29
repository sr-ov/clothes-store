import { createApp } from 'vue'
import vClickOutside from 'click-outside-vue3'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import components from '@/components'

const app = createApp(App)

components.forEach((component) => {
	app.component(component.name, component)
})

app.use(store).use(router).use(vClickOutside).use(ElementPlus).mount('#app')
