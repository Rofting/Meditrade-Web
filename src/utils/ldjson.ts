// Pequeño helper para inyectar/actualizar JSON-LD en <head>
export function setJsonLd(id: string, data: Record<string, any>) {
    if (typeof document === 'undefined') return
    const scriptId = `ldjson-${id}`
    let el = document.getElementById(scriptId) as HTMLScriptElement | null
    const payload = withContext(data)
    if (!el) {
        el = document.createElement('script')
        el.type = 'application/ld+json'
        el.id = scriptId
        document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(payload)
}
export function removeJsonLd(id: string) {
    if (typeof document === 'undefined') return
    document.getElementById(`ldjson-${id}`)?.remove()
}
function withContext(obj: Record<string, any>) {
    return obj['@context'] ? obj : { '@context': 'https://schema.org', ...obj }
}

/* ==== Generadores de esquemas ==== */
export function orgSchema() {
    return {
        '@type': 'Organization',
        name: 'Meditrade del Ebro S.L.',
        url: 'https://www.meditrade.es',
        logo: 'https://www.meditrade.es/images/logo-web1.png',
        sameAs: [
            'https://es.linkedin.com/company/meditrade-del-ebro-sl',
            'https://www.instagram.com/meditradeebro/'
        ]
    }
}
export function localBusinessSchema() {
    return {
        '@type': 'LocalBusiness',
        name: 'Meditrade del Ebro S.L.',
        url: 'https://www.meditrade.es',
        email: 'meditrade@meditrade.es',
        telephone: '+34 976 79 43 20',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Paseo de la Independencia, 8, 6º E',
            addressLocality: 'Zaragoza',
            postalCode: '50004',
            addressCountry: 'ES',
            addressRegion: 'Zaragoza'
        },
        image: 'https://www.meditrade.es/images/og-default.jpg'
    }
}
export function websiteSchema() {
    return {
        '@type': 'WebSite',
        name: 'Meditrade del Ebro',
        url: 'https://www.meditrade.es',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.meditrade.es/blog?q={search_term_string}',
            'query-input': 'required name=search_term_string'
        }
    }
}
export function breadcrumbSchema(items: Array<{name: string; url: string}>) {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.name,
            item: it.url
        }))
    }
}
export function articleSchema(p: {
    title: string; description: string; url: string; image?: string; date?: string;
}) {
    return {
        '@type': 'Article',
        headline: p.title,
        description: p.description,
        image: p.image,
        mainEntityOfPage: { '@type': 'WebPage', '@id': p.url },
        author: { '@type': 'Organization', name: 'Meditrade del Ebro S.L.' },
        publisher: {
            '@type': 'Organization',
            name: 'Meditrade del Ebro S.L.',
            logo: { '@type': 'ImageObject', url: 'https://www.meditrade.es/images/logo-web1.png' }
        },
        datePublished: p.date || undefined,
        dateModified: p.date || undefined
    }
}
