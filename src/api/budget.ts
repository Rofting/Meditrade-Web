import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
    const body = req.body || {}
    if (body.website) return res.status(200).json({ ok: true })

    if (!body?.comunidad?.nombre || !body?.solicitante?.email) {
        return res.status(400).json({ error: 'Missing fields' })
    }
    const from = process.env.CONTACT_FROM || 'web@tudominio.es'
    const to   = process.env.CONTACT_TO   || 'info@tudominio.es'

    const html = `
    <h2>Solicitud de presupuesto</h2>
    <p><b>Comunidad:</b> ${esc(body.comunidad?.nombre)}</p>
    <p><b>Email comunidad:</b> ${esc(body.comunidad?.email)}</p>
    <p><b>Solicitante:</b> ${esc(body.solicitante?.nombre)} — ${esc(body.solicitante?.email)}</p>
    <hr>
    <pre style="font-family:ui-monospace,monospace">${esc(JSON.stringify(body,null,2))}</pre>
  `
    try {
        await resend.emails.send({ from, to, subject: `Presupuesto – ${body.comunidad?.nombre || ''}`, replyTo: body.solicitante?.email, html })
        return res.status(200).json({ ok: true })
    } catch (e) {
        return res.status(500).json({ error: 'Mail send failed' })
    }
}
function esc(v:any){return String(v??'').replace(/[&<>"']/g,(m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' } as any)[m])}
