export type SeoInput = {
    title?: string
    description?: string
    image?: string          // absoluta o ruta de /public
    type?: 'website' | 'article'
    noindex?: boolean
    canonical?: string      // absoluta; si no, usa la URL actual
}

const SITE_NAME = 'Meditrade del Ebro'

export function setSeo(input: SeoInput = {}) {
    if (typeof document === 'undefined') return

    const origin = window.location.origin
    const url = input.canonical || window.location.href
    const fullTitle = input.title ? `${input.title} – ${SITE_NAME}` : SITE_NAME
    const desc =
        input.description ??
        'Administración de fincas y comunidades en Zaragoza con servicio, agilidad y transparencia.'
    const type = input.type ?? 'website'
    const img = input.image ? absolutize(input.image, origin) : undefined

    // <title>
    document.title = fullTitle

    // Metas estándar
    setMeta('description', desc)
    setMeta('robots', input.noindex ? 'noindex, nofollow' : 'index, follow')

    // Open Graph
    setProp('og:title', fullTitle)
    setProp('og:description', desc)
    setProp('og:url', url)
    setProp('og:site_name', SITE_NAME)
    setProp('og:type', type)
    if (img) setProp('og:image', img)

    // Twitter
    setName('twitter:card', img ? 'summary_large_image' : 'summary')
    setName('twitter:title', fullTitle)
    setName('twitter:description', desc)
    if (img) setName('twitter:image', img)

    // Canonical
    setCanonical(url)
}

/* ---------- helpers internos ---------- */
function setCanonical(href: string) {
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!link) {
        link = document.createElement('link')
        link.rel = 'canonical'
        document.head.appendChild(link)
    }
    link.href = href
}

function setMeta(name: string, content: string) {
    setTag('meta', 'name', name, content)
}
function setName(name: string, content: string) {
    setTag('meta', 'name', name, content)
}
function setProp(prop: string, content: string) {
    setTag('meta', 'property', prop, content)
}

function setTag(tag: 'meta' | 'link', attr: 'name' | 'property' | 'rel', key: string, value: string) {
    let el = document.head.querySelector(`${tag}[${attr}="${key}"]`) as
        | HTMLMetaElement
        | HTMLLinkElement
        | null
    if (!el) {
        el = document.createElement(tag)
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }
    if (tag === 'meta') (el as HTMLMetaElement).setAttribute('content', value)
    else (el as HTMLLinkElement).setAttribute('href', value)
}

function absolutize(path: string, origin: string) {
    if (!path) return path
    if (/^https?:\/\//i.test(path)) return path
    if (path.startsWith('/')) return origin + path
    return origin + '/' + path.replace(/^\.\//, '')
}
