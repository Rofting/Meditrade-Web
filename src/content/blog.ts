import {defineComponent} from "vue";
import PresupuestoPage from "@/pages/PresupuestoPage.vue";

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
      <p>Las reuniones son una herramienta fundamental para la gestión de comunidades, pero a menudo pueden ser improductivas. Aquí te comparto algún consejo para que cada reunión cumpla su propósito.</p>
      <h3>1. Establecer el objetivo</h3>
      <p>Antes de cada reunión, comparte un documento que incluya los temas a tratar, esto ayuda a que todos puedan saber de una forma sencilla de lo que se va ha hablar y mantener el enfoque, cada reunión tiene que tener un objetivo claro, ya sea informar, debatir o tomar decisiones.</p>
      <h3>2. Fomentar la participación</h3>
      <p>Asegúrate de que todos los vecinos se sientan bienvenidos y establece un espacio para que cada propietario pueda compartir su perspectiva sobre los temas tratados.</p>
      <h3>3. Seguimiento post-reunión</h3>
      <p>Envía un resumen de lo discutido y las acciones acordadas a todos los vecinos además de hacer una evaluación preguntando a los participantes su opinión sobre la reunión y que creen que podrían mejorar.</p>
      <h2>Apoyo de la comunidad</h2>
      <p>El apoyo y el fomento de la comunidad es fundamental para crear un entorno agradable y de colaboración. Aquí te presentamos algunas ideas para organizar eventos sociales y formar grupos que ayudarán a involucrar a los propietarios y fortalecer los lazos entre vecinos.</p>
      <h3>1. Cenas comunitarias</h3>
      <p>Organizar alguna cena a lo largo del tiempo donde los vecinos puedan compartir platos y disfrutar de un momento juntos, se puede dar un toque a las cenas como tematizarlas.</p>
      <h3>2. Torneos Deportivos</h3>
      <p>Organizar eventos de fútbol, baloncesto, pádel, etc. Asegúrate de incluir actividades para todas las edades y añadir algún premio simbólico eso motivara a los vecinos a participar.</p>
      <h2>Conclusión</h2>
      <p>Gestionar una comunidad no es tarea fácil, pero con una buena planificación y el uso de herramientas adecuadas, se pueden crear entornos agradables y colaborativos. Compartir esos trucos con tus vecinos y animarlos a participar en mejorar la comunidad.</p>
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
      <h2>Vivir en una comunidad tiene sus ventajas, pero también es un desafío, como por ejempló lidiar con un ruido excesivo de un vecino. en Meditrade del Ebro, entendemos que la convivencia es esencial para la calidad de vida, Aquí te damos algunos consejos sobre cómo abordar el problema.</h2>
      
      <h2>1. Identificar de dónde viene el ruido</h2>
      <p>Antes de hacer cualquier cosa, es importante saber de dónde viene el ruido, si es música alta o herramientas o otro tipo de sonido, saber que lo provoca y si es en un momento puntual o persiste a lo largo de los días.</p>
      <h2>2. Habla primero con el vecino</h2>
      <p>En muchas ocasiones, los vecinos no se dan cuenta del ruido que hacen y que pueden estar causando molestia, para tratar el tema de manera amistosa el primer paso es escoger el momento ideal para hablar y explicarle como el ruido te molesta en la vida diaria, manteniendo siempre un tono de voz respetuoso y abierto al diálogo.</p>
      <h2>3. Establece límites razonables</h2>
      <p>Es necesario establecer límites sobre el ruido que se puede tolerar, especialmente en según qué horarios, ya que muchos lugares tiene regulaciones sobre el ruido, así que infórmate sobre las normas de convivencia en la comunidad y si es posible discute los límites con tus vecinos y llegar a un acuerdo mutuo.</p>
      <h2>4. Elementos de aislamiento</h2>
      <p>Acústico Si el ruido sigue y afecta a tu calidad de vida, considera la posibilidad de invertir en algún elemento de aislamiento acústico. Alfombras, paneles acústicos y cortinas gruesas pueden ayudar a reducir el ruido en tu hogar.</p>
      <h2>5. Conoce tus derechos</h2>
      <p>Infórmate sobre las leyes locales relacionadas con el ruido, muchas comunidades tienen regularizaciones sobre niveles de ruido y en que horarios están permitidos. Conocer tus derechos te dará más confianza para afrontar el problema.</p>
      <h2>6. Fomenta la comunicación en la comunidad</h2>
      <p>Ayudar a un ambiente de comunicación abierta en la comunidad puede ayudar a prevenir futuros problemas de ruidos, organizar reuniones o eventos sociales donde los vecinos puedan conocerse mejor y hablar de temas de la convivencia.</p>
      <h2>7. Habla con tu Administrador de la Comunidad</h2>
      <p>Si hablar directamente con tu vecino no ha funcionado, considera hablar con el administrador de la comunidad ellos pueden mediar en la situación y asegurarse de que se cumplan las normas de convivencia. Presenta una queja de manera formal y documentada del incidente del ruido.</p>
      <h2>8. Vía legal (último recurso)</h2>
      <p>Si el problema a pesar de todos estos pasos no se ha solucionado, puedes considerar tomar acciones legales, sin embargo esto debe ser el ultimo recurso porque puede dañar la relaciona con tu vecino y afectar a la convivencia.</p>
      
      <h2>Conclusión</h2>
      <p>Aguantar el ruido excesivo de un vecino puede ser muy frustrante, pero si se es respetuoso y comunicativo es posible solucionar el problema, recuerda que lo principal es la convivencia tranquila y disfrutar de la vida en comunidad. En Meditrade del Ebro te animamos a tratar el tema de forma paciente y comprensiva.</p>
     
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
      <h4>En Meditrade del Ebro, creemos que las pequeñas acciones pueden tener un gran impacto en la vida de la comunidad, mejorar el entorno donde convivimos no siempre requiere grandes inversiones, normalmente las mejores soluciones son sencillas y económicas, aquí te recopilamos alguna de las ideas para transformar tu comunidad sin que implique gran gasto de dinero.</h4>
      <h2>1. Organizar actividades comunitarias</h2>
      <p>Aumentar la interacción entre los vecinos es esencial para un ambiente más acogedor, organizar talleres o eventos deportivos no solo mejora el entorno sino que fortalece los lazos.</p>
      <h2>2. Crea espacios verdes</h2>
      <p>Crear pequeños jardines comunitarios, donde todos ayudan a su crecimiento y mantenimiento pueden ser un aspecto maravilloso para tu comunidad, involucrar a los vecinos en el cuidado de los espacios. Esto no solo embellece la comunidad sino que también promueve la colaboración y el sentido de pertenencia.</p>
      <h2>3. Un tablón de anuncios</h2>
      <p>Instalar un tablón de anuncios donde los propietarios puedan compartir información sobre necesidades, eventos o recomendaciones de algún tipo, una buena comunicación es esencial para el bienestar comunitario.</p>
      <h2>4. Sustituye la iluminación por LED</h2>
      <p>Cambiar las bombillas tradicionales por luces LED en áreas comunes puede suponer un gran ahorro en la factura de la electricidad, aunque la inversión inicial puede ser mayor, los beneficios a largo plazo son evidentes.</p>
      <img src="/images/leds.webp" alt="">
      <h2>5. Promueve el reciclaje</h2>
      <p>Fomentar el reciclaje y la sostenibilidad es una excelente manera de mejorar la comunidad, instala contenedores visibles, organizar alguna charla sobre la importancia de promover un ambiente más limpio.</p>
      <h2>6. Crea un grupo de comunicación</h2>
      <p>Establecer un grupo de WhatsApp o alguna red social para la comunidad facilita la comunicación rápida, esto permite coordinar actividades, resolver problemas y mantener a todos informados.</p>
      <img src="/images/team3.webp" alt="">
      <h2>7. Decorar areas comunes</h2>
      <p>Animar a los vecinos a decorar las áreas comunes durante festividades o eventos especiales puede mejorar el ambiente, la decoración festiva crea una atmósfera alegre y que beneficia a todos.</p>
      <h2>8. Realiza encuestas de satisfacción</h2>
      <p>Realiza encuestas periódicamente de forma presencial o por alguna red social y conoce las opiniones y sugerencias que los vecinos puedan decirte eso ayuda a identificar áreas para mejorar, involucra a todos en la toma de decisiones es crucial para el desarrollo de la comunidad.</p>
      <h2>Conclusión</h2>
      <p>Implementar pequeñas mejorar, puede ser fácil y puedes transformar tu comunidad en un lugar más acogedor y unido, todo sin necesidad de grandes inversiones. Estamos aquí para ayudarte a gestionar y mejorar tu comunidad de manera eficiente y económica.</p>
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

export default defineComponent({
    components: {PresupuestoPage}
})
