import sharp from 'sharp'
import fs from 'fs/promises'
import path from 'path'

const src = process.argv[2]
if (!src) {
    console.error('Uso: node scripts/make-icons.mjs ruta/a/tu-logo.(png|svg|webp)')
    process.exit(1)
}

const outDir = 'public/icons'
await fs.mkdir(outDir, { recursive: true })

async function make(size, name, contentScale = 1) {
    const inner = Math.round(size * contentScale) // tamaño del logo dentro del lienzo
    const left = Math.round((size - inner) / 2)
    const top = left

    const bg = { r: 0, g: 0, b: 0, alpha: 0 } // fondo transparente
    const logo = await sharp(src).resize(inner, inner, { fit: 'contain' }).toBuffer()
    const canvas = sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    const out = await canvas.composite([{ input: logo, left, top }]).png().toBuffer()
    await fs.writeFile(path.join(outDir, name), out)
}

await make(192, 'icon-192.png', 1.0)
await make(512, 'icon-512.png', 1.0)
await make(512, 'maskable-512.png', 0.76) // deja ~12% de margen por lado (seguro para “maskable”)

console.log('✓ Iconos generados en public/icons/')