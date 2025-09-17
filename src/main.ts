import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // Importa el router

// 1. Crea la instancia de la aplicación
const app = createApp(App)

// 2. USA el router en la instancia 'app' (no en 'App')
app.use(router)

// 3. Monta la instancia 'app'
app.mount('#app')