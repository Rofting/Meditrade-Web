import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import { initColorMode } from '@/utils/colorMode'
import { reveal } from '@/directives/reveal'
import { prefetchRoute } from '@/directives/prefetchRoute'
import { initAnalytics } from '@/utils/analytics'

import * as Sentry from '@sentry/vue'

initColorMode()

const app = createApp(App)
app.use(router)
app.directive('reveal', reveal)
app.directive('prefetch', prefetchRoute)

// --- SENTRY (solo si hay DSN) ---
const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
if (SENTRY_DSN) {
    Sentry.init({
        app,
        dsn: SENTRY_DSN,
        // Performance + navegación SPA
        integrations: [Sentry.browserTracingIntegration({ router })],
        tracesSampleRate: 0.1, // 10% de muestreo (ajusta si quieres)
        environment: import.meta.env.MODE
    })
}

app.mount('#app')

// --- Analytics con consentimiento ---
initAnalytics(router, import.meta.env.VITE_PLAUSIBLE_DOMAIN || location.hostname)

// --- PWA: registra Service Worker ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {})
    })
}
