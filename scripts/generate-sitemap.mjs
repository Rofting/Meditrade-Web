import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE = process.env.SITE_ORIGIN || 'https://www.meditrade.es'

// Rutas estáticas de la SPA
const staticRoutes = [
    '/', '/services', '/about', '/contact', '/presupuesto',
    '/propietarios', '/privacidad', '/legal', '/blog'
]

// Extrae slugs de src/content/blog.ts (regex simple)
const blogSrc = readFileSync(resolve('src/content/blog.ts'), 'utf8')
const slugs = Array.from(blogSrc.matchAll(/slug:\s*'([^']+)'/g)).map(m => m[1])

// Construye XML
const urls = [
    ...staticRoutes.map(p => loc(p)),
    ...slugs.map(s => loc(`/blog/${s}`)),
].join('')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

// Escribe en /public
const outDir = resolve('public')
if (!existsSync(outDir)) mkdirSync(outDir)
writeFileSync(resolve(outDir, 'sitemap.xml'), xml.trim() + '\n', 'utf8')

console.log(`✅ sitemap.xml con ${staticRoutes.length + slugs.length} URLs`)

function loc(path) {
    const lastmod = new Date().toISOString()
    return `  <url>
    <loc>${SITE}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority(path)}</priority>
  </url>\n`
}
function priority(p) {
    if (p === '/') return '1.0'
    if (p.startsWith('/blog/')) return '0.6'
    return '0.8'
}
