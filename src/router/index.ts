import { createRouter, createWebHistory } from 'vue-router'

// Code-splitting: carga bajo demanda
const HomePage      = () => import('../pages/HomePage.vue')
const ServicesPage  = () => import('../pages/ServicesPage.vue')
const AboutUsPage   = () => import('../pages/AboutUsPage.vue')
const ContactPage   = () => import('../pages/ContactPage.vue')
const PresupuestoPage = () => import('../pages/PresupuestoPage.vue')
const PropietariosPage = () => import('../pages/PropietariosPage.vue')
const LegalPage = () => import('../pages/LegalPage.vue')
const PrivacidadPage = () => import('../pages/PrivacidadPage.vue')
const BlogListPage = () => import('../pages/BlogListPage.vue')
const BlogPostPage = () => import('../pages/BlogPostPage.vue')

const routes = [
    { path: '/', name: 'Home', component: HomePage, meta: { title: 'Meditrade del Ebro – Administración de Fincas' } },
    { path: '/services', name: 'Services', component: ServicesPage, meta: { title: 'Servicios – Meditrade del Ebro' } },
    { path: '/about', name: 'About', component: AboutUsPage, meta: { title: 'Conócenos – Meditrade del Ebro' } },
    { path: '/propietarios', name: 'Propietarios', component: PropietariosPage, meta: { title: 'Propietarios – Meditrade del Ebro' } },
    { path: '/presupuesto', name: 'Presupuesto', component: PresupuestoPage, meta: { title: 'Presupuesto – Meditrade del Ebro' } },
    { path: '/privacidad', name: 'Privacidad', component: PrivacidadPage, meta: { title: 'Política de Privacidad – Meditrade del Ebro' } },
    { path: '/blog', name: 'Blog', component: BlogListPage, meta: { title: 'Blog – Meditrade del Ebro' } },
    { path: '/blog/:slug', name: 'BlogPost', component: BlogPostPage, meta: { title: 'Blog – Meditrade del Ebro' } },
    { path: '/legal', name: 'Legal', component: LegalPage, meta: { title: 'Aviso Legal – Meditrade del Ebro' } },
    { path: '/contact', name: 'Contact', component: ContactPage, meta: { title: 'Contacto – Meditrade del Ebro' } },

    // Redirecciones "legacy" por si entran con .html
    { path: '/services.html',    redirect: '/services' },
    { path: '/presupuesto.html',     redirect: '/presupuesto' },
    { path: '/propietarios.html', redirect: '/propietarios' },
    { path: '/about-us.html',    redirect: '/about' },
    { path: '/contact.html',     redirect: '/contact' },
    { path: '/privacidad.html', redirect: '/privacidad' },
    { path: '/legal.html', redirect: '/legal' },
    { path: '/inicio.html',      redirect: '/' },
    { path: '/blog.html', redirect: '/blog' },
    { path: '/blog-1.html', redirect: '/blog/trucos-comunidad' },
    { path: '/blog-2.html', redirect: '/blog/ruido-vecino-que-hacer' },
    { path: '/blog-3.html', redirect: '/blog/ideas-mejorar-comunidad-barato' },
    { path: '/blog-4.html', redirect: '/blog/renovar-edificio-financiacion' },

    // Catch-all a Home (opcional)
    { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    // Desplazamiento suave: respeta back/forward, hashes y compensa header fijo (~96px)
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) {
            return { el: to.hash, top: 96, behavior: 'smooth' }
        }
        return { top: 0, behavior: 'smooth' }
    },
})

// Título por ruta (simple)
router.afterEach((to) => {
    const title = (to.meta?.title as string) || 'Meditrade del Ebro'
    document.title = title
})

export default router
