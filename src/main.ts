import { createApp } from 'vue'
import { createPinia } from 'pinia'
import type { App as VueApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import toast from './plugins/toast'

// 导入样式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import './assets/styles/index.scss'
import './assets/main.css'

const app: VueApp = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(toast)

app.mount('#app') 