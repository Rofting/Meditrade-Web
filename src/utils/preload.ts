export function preloadImage(href: string, fetchPriority: 'high'|'low' = 'high') {
    if (typeof document === 'undefined' || !href) return
    // Evita duplicados
    const exists = Array.from(document.head.querySelectorAll('link[rel="preload"]'))
        .some(l => (l as HTMLLinkElement).href.includes(href))
    if (exists) return
    const l = document.createElement('link')
    l.rel = 'preload'
    l.as = 'image'
    l.href = href
    ;(l as any).fetchpriority = fetchPriority // hint
    document.head.appendChild(l)
}

export function preconnect(origin: string) {
    if (typeof document === 'undefined') return
    if (!origin) return
    const l = document.createElement('link')
    l.rel = 'preconnect'
    l.href = origin
    l.crossOrigin = ''
    document.head.appendChild(l)
}
