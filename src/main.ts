import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales'

// 导入样式
import './assets/styles/index.css'

const app: VueApp = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app') 