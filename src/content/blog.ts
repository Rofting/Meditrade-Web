export type BlogPost = {
    slug: string
    title: string
    excerpt: string
    cover: string
    date: string
    tags: string[]
    body: string
}

export const posts: BlogPost[] = [
    {
        slug: 'trucos-comunidad',
        title: 'Trucos para llevar mi comunidad',
        excerpt: 'Consejos fáciles y útiles para gestionar una comunidad de vecinos sin morir en el intento.',
        cover: 'images/trucos.webp',
        date: '2025-08-20',
        tags: ['Convivencia', 'Consejos'],
        body: `
      <h2>Comunicación clara y abierta</h2>
      <p>La base de una comunidad sana es la comunicación. Crea canales claros (grupo, tablón, boletín)
      y mantén a todos informados de decisiones y reuniones.</p>
      <h2>Reuniones efectivas</h2>
      <p>Define objetivos, fomenta participación y envía un resumen con acuerdos y responsables.</p>
      <h3>1. Establecer el objetivo</h3>
      <p>Comparte el orden del día para mantener el foco.</p>
      <h3>2. Fomentar la participación</h3>
      <p>Da espacio a todos los propietarios para aportar su punto de vista.</p>
      <h3>3. Seguimiento post-reunión</h3>
      <p>Envía un resumen y planifica próximos pasos.</p>
      <h2>Apoyo de la comunidad</h2>
      <p>Organiza actividades: cenas comunitarias, torneos y grupos de colaboración.</p>
      <h2>Conclusión</h2>
      <p>Con planificación y herramientas adecuadas, la comunidad funciona mejor y con menos fricción.</p>
    `,
    },
    {
        slug: 'ruido-vecino-que-hacer',
        title: '¿Qué hago si mi vecino hace mucho ruido?',
        excerpt: 'Pasos prácticos para afrontar y resolver problemas de ruidos en la comunidad.',
        cover: 'images/ruido.webp',
        date: '2025-08-05',
        tags: ['Convivencia', 'Normativa'],
        body: `
      <h2>1. Identifica el origen</h2>
      <p>Qué tipo de ruido, cuándo sucede y si es puntual o persistente.</p>
      <h2>2. Habla primero con el vecino</h2>
      <p>Con respeto y en buen momento. Muchas veces no es consciente.</p>
      <h2>3. Establece límites razonables</h2>
      <p>Consulta normas de convivencia y horarios.</p>
      <h2>4. Medidas de aislamiento</h2>
      <p>Alfombras, cortinas o paneles acústicos ayudan.</p>
      <h2>5. Conoce tus derechos</h2>
      <p>Infórmate de ordenanzas locales.</p>
      <h2>6. Fomenta la comunicación</h2>
      <p>Un buen clima evita futuros conflictos.</p>
      <h2>7. Habla con administración</h2>
      <p>Mediación y cumplimiento de normas.</p>
      <h2>8. Vía legal (último recurso)</h2>
      <p>Solo si lo anterior falla.</p>
      <h2>Conclusión</h2>
      <p>Con diálogo y orden se puede resolver la mayoría de casos.</p>
    `,
    },
    {
        slug: 'ideas-mejorar-comunidad-barato',
        title: 'Ideas para mejorar la comunidad sin gastar mucho',
        excerpt: 'Pequeñas mejoras con gran impacto: convivencia, sostenibilidad y ahorro.',
        cover: 'images/ideas.webp',
        date: '2025-07-25',
        tags: ['Ahorro', 'Sostenibilidad'],
        body: `
      <h2>1. Actividades comunitarias</h2>
      <p>Talleres, eventos o jornadas vecinales fortalecen lazos.</p>
      <h2>2. Pequeños espacios verdes</h2>
      <p>Jardines comunitarios y participación rotatoria.</p>
      <h2>3. Tablón de anuncios</h2>
      <p>Información útil y comunicación ágil.</p>
      <h2>4. Iluminación LED</h2>
      <p>Ahorro significativo en zonas comunes.</p>
      <h2>5. Reciclaje y sostenibilidad</h2>
      <p>Contenedores visibles y campañas informativas.</p>
      <h2>6. Grupo de comunicación</h2>
      <p>WhatsApp u otra herramienta para avisos.</p>
      <h2>7. Decoración por temporadas</h2>
      <p>Mejora el ambiente en fechas señaladas.</p>
      <h2>8. Encuestas periódicas</h2>
      <p>Detecta mejoras y prioriza acciones.</p>
      <h2>Conclusión</h2>
      <p>Pequeños cambios = gran calidad de vida sin grandes presupuestos.</p>
    `,
    },
    {
        slug: 'renovar-edificio-financiacion',
        title: 'Cómo conseguir dinero para renovar tu edificio',
        excerpt: 'Subvenciones, financiación y estrategias reales para rehabilitar con cabeza.',
        cover: 'images/cuentas.webp',
        date: '2025-07-10',
        tags: ['Financiación', 'Rehabilitación'],
        body: `
      <h2>1. Subvenciones y ayudas</h2>
      <p>Programas de rehabilitación y eficiencia energética.</p>
      <h2>2. Financiación bancaria</h2>
      <p>Compara entidades y productos específicos.</p>
      <h2>3. Inversor privado / crowdfunding</h2>
      <p>Opciones para proyectos ambiciosos con retorno.</p>
      <h2>4. Cooperativa de propietarios</h2>
      <p>Recursos agrupados y mejores condiciones.</p>
      <h2>5. Programas de eficiencia</h2>
      <p>Asesoría técnica + financiación de mejoras.</p>
      <h2>6. Ahorros a largo plazo</h2>
      <p>LED, aislamiento, fotovoltaica: retorno real.</p>
      <h2>7. Asesor profesional</h2>
      <p>Arquitecto especializado para plan y ayudas.</p>
      <h2>8. Patrocinios puntuales</h2>
      <p>Colaboraciones locales con visibilidad.</p>
      <h2>Conclusión</h2>
      <p>Planifica la financiación y prioriza medidas de retorno rápido.</p>
    `,
    },
]

export function getPostBySlug(slug: string) {
    return posts.find(p => p.slug === slug)
}
