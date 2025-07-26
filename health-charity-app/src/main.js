import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initAuthListener } from './firebase'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

initAuthListener();

app.mount('#app')
