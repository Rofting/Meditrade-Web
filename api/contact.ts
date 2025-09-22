import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY as string)

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

    const { name, email, message, website } = (req.body ?? {}) as {
        name?: string; email?: string; message?: string; website?: string
    }

    if (website) return res.status(200).json({ ok: true }) // honeypot
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })

    const from = process.env.CONTACT_FROM ?? 'web@tudominio.es'
    const to   = process.env.CONTACT_TO   ?? 'info@tudominio.es'

    const html = `
    <h2>Nuevo mensaje</h2>
    <p><b>Nombre:</b> ${esc(name)}</p>
    <p><b>Email:</b> ${esc(email)}</p>
    <p><b>Mensaje:</b><br>${esc(message).replace(/\n/g,'<br>')}</p>
  `

    try {
        await resend.emails.send({
            from,
            to,
            subject: `Contacto web: ${name}`,
            replyTo: email,            // ✅ propiedad correcta
            html,
        })
        return res.status(200).json({ ok: true })
    } catch (e) {
        console.error(e)
        return res.status(500).json({ error: 'Mail send failed' })
    }
}

function esc(v: unknown) {
    return String(v ?? '').replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'} as any)[m])
}
