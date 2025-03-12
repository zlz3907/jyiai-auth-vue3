import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales'

// 导入样式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/styles/index.scss'

const app: VueApp = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app') 