// /api/budget.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

type Body = {
    comunidad: {
        nombre: string; postal: string; direccion: string; email: string;
        viviendas: number | null; garaje: number | null; ascensores: number | null;
    };
    solicitante: {
        nombre: string; telefono1: string; telefono2?: string; email: string;
        cargo: 'presidente'|'vicepresidente'|'comision'|'propietario'|'';
    };
    empleados: { porteros:number; jardineros:number; limpiadores:number; conserjes:number; socorristas:number; };
    caracteristicas: {
        calefaccion:'si'|'no'|''; agua:'si'|'no'|''; contadores:'si'|'no'|'';
        presion:'si'|'no'|''; piscina:'si'|'no'|''; instalaciones:'si'|'no'|'';
        videovigilancia:'si'|'no'|''; otras?: string;
    };
    anotaciones?: string;
    preferencia: 'correo-ordinario'|'correo-electronico'|'cita-previa'|'';
    privacidad: boolean;
    website?: string; // honeypot
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
    const b = (req.body || {}) as Partial<Body>

    // honeypot
    if (b.website) return res.status(200).json({ ok: true })

    // validación mínima de backend (anti bypass)
    if (!b.comunidad?.nombre || !validEmail(b.comunidad?.email)
        || !b.solicitante?.nombre || !validEmail(b.solicitante?.email)
        || !b.solicitante?.telefono1 || !b.privacidad
    ) {
        return res.status(400).json({ error: 'Datos inválidos o incompletos.' })
    }

    const from = process.env.BUDGET_FROM || 'web@meditrade.es'
    const to   = process.env.BUDGET_TO   || 'info@meditrade.es'

    const plain = toPlain(b)
    const htmlAdmin = toHtmlAdmin(b)
    const htmlUser  = toHtmlUser(b)

    try {
        // 1) al despacho
        await resend.emails.send({
            from, to, subject: `Nuevo presupuesto: ${b.comunidad?.nombre ?? ''} (${b.solicitante?.nombre ?? ''})`,
            replyTo: b.solicitante?.email, text: plain, html: htmlAdmin
        })
        // 2) auto-reply al solicitante
        await resend.emails.send({
            from,
            to: b.solicitante!.email!,
            subject: 'Hemos recibido tu solicitud de presupuesto',
            html: htmlUser
        })
        return res.status(200).json({ ok: true })
    } catch (e) {
        return res.status(500).json({ error: 'No se pudo enviar el correo' })
    }
}

function validEmail(v?: string) { return !!v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }
function esc(v:any){return String(v??'').replace(/[&<>"']/g,(m)=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' } as any)[m])}

function toPlain(b: Partial<Body>) {
    return `
COMUNIDAD
- Nombre: ${b.comunidad?.nombre}
- CP: ${b.comunidad?.postal}
- Dirección: ${b.comunidad?.direccion}
- Email: ${b.comunidad?.email}
- Viviendas: ${b.comunidad?.viviendas}
- Garaje: ${b.comunidad?.garaje}
- Ascensores: ${b.comunidad?.ascensores}

SOLICITANTE
- Nombre: ${b.solicitante?.nombre}
- Tel 1: ${b.solicitante?.telefono1}
- Tel 2: ${b.solicitante?.telefono2}
- Email: ${b.solicitante?.email}
- Cargo: ${b.solicitante?.cargo}

EMPLEADOS
- Porteros: ${b.empleados?.porteros} / Jardineros: ${b.empleados?.jardineros} / Limpiadores: ${b.empleados?.limpiadores}
- Conserjes: ${b.empleados?.conserjes} / Socorristas: ${b.empleados?.socorristas}

CARACTERÍSTICAS
- Calefacción: ${b.caracteristicas?.calefaccion} / Agua: ${b.caracteristicas?.agua}
- Contadores: ${b.caracteristicas?.contadores} / Presión: ${b.caracteristicas?.presion}
- Piscina: ${b.caracteristicas?.piscina} / Instalaciones: ${b.caracteristicas?.instalaciones}
- Videovigilancia: ${b.caracteristicas?.videovigilancia}
- Otras: ${b.caracteristicas?.otras}

PREFERENCIA: ${b.preferencia}
ANOTACIONES:
${b.anotaciones ?? ''}
`.trim()
}

function toHtmlAdmin(b: Partial<Body>) {
    const row = (k:string,v:any)=>`<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;"><b>${k}</b></td><td style="padding:6px 10px;border-bottom:1px solid #eee;">${esc(v)}</td></tr>`
    return `
  <h2>Solicitud de presupuesto</h2>
  <table style="border-collapse:collapse;border:1px solid #eee;">
    ${row('Comunidad', b.comunidad?.nombre)}
    ${row('CP', b.comunidad?.postal)}
    ${row('Dirección', b.comunidad?.direccion)}
    ${row('Email comunidad', b.comunidad?.email)}
    ${row('Viviendas', b.comunidad?.viviendas)}
    ${row('Garaje', b.comunidad?.garaje)}
    ${row('Ascensores', b.comunidad?.ascensores)}
    ${row('Solicitante', b.solicitante?.nombre)}
    ${row('Teléfono 1', b.solicitante?.telefono1)}
    ${row('Teléfono 2', b.solicitante?.telefono2)}
    ${row('Email solicitante', b.solicitante?.email)}
    ${row('Cargo', b.solicitante?.cargo)}
    ${row('Empleados', `Porteros ${b.empleados?.porteros}, Jardineros ${b.empleados?.jardineros}, Limpiadores ${b.empleados?.limpiadores}, Conserjes ${b.empleados?.conserjes}, Socorristas ${b.empleados?.socorristas}`)}
    ${row('Características', `Calefacción ${b.caracteristicas?.calefaccion}, Agua ${b.caracteristicas?.agua}, Contadores ${b.caracteristicas?.contadores}, Presión ${b.caracteristicas?.presion}, Piscina ${b.caracteristicas?.piscina}, Instalaciones ${b.caracteristicas?.instalaciones}, Videovigilancia ${b.caracteristicas?.videovigilancia}`)}
    ${row('Otras', b.caracteristicas?.otras ?? '')}
    ${row('Preferencia', b.preferencia)}
  </table>
  <h3>Anotaciones</h3>
  <p>${(esc(b.anotaciones)).replace(/\n/g,'<br>')}</p>
  `
}

function toHtmlUser(b: Partial<Body>) {
    return `
  <h2>¡Gracias por tu solicitud!</h2>
  <p>Hemos recibido la petición de presupuesto para <b>${esc(b.comunidad?.nombre)}</b>.
  Nuestro equipo se pondrá en contacto contigo en breve.</p>
  <p><b>Resumen:</b></p>
  <ul>
    <li>Comunidad: ${esc(b.comunidad?.nombre)}</li>
    <li>Dirección: ${esc(b.comunidad?.direccion)} (${esc(b.comunidad?.postal)})</li>
    <li>Preferencia de envío: ${esc(b.preferencia)}</li>
  </ul>
  <p style="margin-top:12px;color:#555;">Si este correo no lo solicitaste tú, ignóralo.</p>
  `
}
