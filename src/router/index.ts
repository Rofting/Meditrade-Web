import { createRouter, createWebHistory } from 'vue-router'
import { setSeo } from '@/utils/seo'
import { setJsonLd, breadcrumbSchema } from '@/utils/ldjson'

// Lazy pages
const HomePage         = () => import('../pages/HomePage.vue')
const ServicesPage     = () => import('../pages/ServicesPage.vue')
const AboutUsPage      = () => import('../pages/AboutUsPage.vue')
const ContactPage      = () => import('../pages/ContactPage.vue')
const PresupuestoPage  = () => import('../pages/PresupuestoPage.vue')
const PropietariosPage = () => import('../pages/PropietariosPage.vue')
const PrivacidadPage   = () => import('../pages/PrivacidadPage.vue')
const LegalPage        = () => import('../pages/LegalPage.vue')
const BlogListPage     = () => import('../pages/BlogListPage.vue')
const BlogPostPage     = () => import('../pages/BlogPostPage.vue')
const NotFoundPage = () => import('../pages/NotFoundPage.vue')
const ErrorPage    = () => import('../pages/ErrorPage.vue')

const routes = [
    { path: '/', name: 'Home', component: HomePage, meta: {
            title: 'Administración de fincas en Zaragoza',
            description: 'Gestión profesional de comunidades: control de gastos, proveedores, incidencias y transparencia total.',
            image: '/images/og-default.jpg'
        }},
    { path: '/services', name: 'Services', component: ServicesPage, meta: {
            title: 'Servicios',
            description: 'Administración integral, contabilidad, incidencias, juntas, asesoría legal y más.',
            image: '/images/og-default.jpg'
        }},
    { path: '/about', name: 'About', component: AboutUsPage, meta: {
            title: 'Conócenos',
            description: 'Equipo cercano y transparente. Experiencia en comunidades de Zaragoza.',
            image: '/images/og-default.jpg'
        }},
    { path: '/contact', name: 'Contact', component: ContactPage, meta: {
            title: 'Contacto',
            description: 'Escríbenos y te responderemos con rapidez.',
            image: '/images/og-default.jpg'
        }},
    { path: '/presupuesto', name: 'Presupuesto', component: PresupuestoPage, meta: {
            title: 'Presupuesto',
            description: 'Solicita un presupuesto ajustado a las necesidades de tu comunidad.',
            image: '/images/og-default.jpg'
        }},
    { path: '/propietarios', name: 'Propietarios', component: PropietariosPage, meta: {
            title: 'Propietarios',
            description: 'Oficina virtual 24/7, incidencias, actas, liquidaciones y recibos.',
            image: '/images/og-default.jpg'
        }},
    { path: '/privacidad', name: 'Privacidad', component: PrivacidadPage, meta: {
            title: 'Política de Privacidad',
            description: 'Cómo tratamos tus datos y qué derechos tienes.',
            image: '/images/og-default.jpg'
        }},
    { path: '/legal', name: 'Legal', component: LegalPage, meta: {
            title: 'Aviso Legal',
            description: 'Condiciones de uso y datos del responsable.',
            image: '/images/og-default.jpg'
        }},
    { path: '/blog', name: 'Blog', component: BlogListPage, meta: {
            title: 'Blog',
            description: 'Ideas y consejos para mejorar tu comunidad.',
            image: '/images/og-default.jpg'
        }},
    { path: '/blog/:slug', name: 'BlogPost', component: BlogPostPage, meta: {
            // El detalle se sobrescribe dentro de la página con setSeo(type: 'article')
            title: 'Artículo',
            description: 'Contenido del blog',
            image: '/images/og-default.jpg'
        }},
    { path: '/500', name: 'Error', component: ErrorPage, meta: {
            title: 'Error del servidor',
            description: 'Se produjo un error procesando tu solicitud.',
            image: '/images/og-default.jpg'
        }},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage, meta: {
            title: 'Página no encontrada',
            description: 'La URL solicitada no existe.',
            image: '/images/og-default.jpg'
        }},

    // Redirects desde .html antiguos
    { path: '/inicio.html',        redirect: '/' },
    { path: '/services.html',      redirect: '/services' },
    { path: '/about-us.html',      redirect: '/about' },
    { path: '/propietarios.html',  redirect: '/propietarios' },
    { path: '/blog.html',          redirect: '/blog' },
    { path: '/blog-1.html',        redirect: '/blog/trucos-comunidad' },
    { path: '/blog-2.html',        redirect: '/blog/ruido-vecino-que-hacer' },
    { path: '/blog-3.html',        redirect: '/blog/ideas-mejorar-comunidad-barato' },
    { path: '/blog-4.html',        redirect: '/blog/renovar-edificio-financiacion' },
    { path: '/privacidad.html',    redirect: '/privacidad' },
    { path: '/legal.html',         redirect: '/legal' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() { return { top: 0 } },
})

// SEO + migas de pan JSON-LD por ruta
router.afterEach((to) => {
    const m = (to.meta || {}) as Record<string, any>
    setSeo({
        title: m.title,
        description: m.description,
        image: m.image,
        type: 'website',
    })

    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const crumbs: Array<{ name: string; url: string }> = [{ name: 'Inicio', url: `${origin}/` }]

    if (to.path.startsWith('/services'))     crumbs.push({ name: 'Servicios',    url: `${origin}/services` })
    else if (to.path.startsWith('/about'))   crumbs.push({ name: 'Conócenos',    url: `${origin}/about` })
    else if (to.path.startsWith('/contact')) crumbs.push({ name: 'Contacto',     url: `${origin}/contact` })
    else if (to.path.startsWith('/presupuesto')) crumbs.push({ name: 'Presupuesto',  url: `${origin}/presupuesto` })
    else if (to.path.startsWith('/propietarios')) crumbs.push({ name: 'Propietarios', url: `${origin}/propietarios` })
    else if (to.path.startsWith('/privacidad'))   crumbs.push({ name: 'Privacidad',   url: `${origin}/privacidad` })
    else if (to.path.startsWith('/legal'))        crumbs.push({ name: 'Aviso Legal',  url: `${origin}/legal` })
    else if (to.path === '/blog')                 crumbs.push({ name: 'Blog',         url: `${origin}/blog` })

    // El detalle del blog establece sus propias migas (con el título del artículo)
    if (!to.path.startsWith('/blog/')) {
        setJsonLd('breadcrumb', breadcrumbSchema(crumbs))
    }
})

export default router
