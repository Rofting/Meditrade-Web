import { createRouter, createWebHistory } from 'vue-router'

// Code-splitting: carga bajo demanda de la página
const HomePage = () => import('../pages/HomePage.vue')
const ServicesPage = () => import('../pages/ServicesPage.vue')
const AboutUsPage = () => import('../pages/AboutUsPage.vue')

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/services', name: 'Services', component: ServicesPage, meta: { title: 'Servicios – Meditrade' } },
    { path: '/about', name: 'About', component: AboutUsPage, meta: { title: 'Conócenos – Meditrade del Ebro' } }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router