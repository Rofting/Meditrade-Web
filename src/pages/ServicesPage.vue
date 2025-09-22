<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, defineComponent, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type Service = {
  id: string
  title: string
  summary: string
  body: string[]
  image: string // ruta webp en /public/images/services
}

/* --------- Datos --------- */
const SERVICES: Service[] = [
  {
    id: 'administracion',
    title: 'Administración integral',
    summary: 'Gestión completa de la comunidad con un único interlocutor y procesos estandarizados.',
    body: [
      'Secretaría y administración diaria: custodia de documentación y atención a propietarios y proveedores.',
      'Planificación anual: calendario de actuaciones, mantenimiento preventivo y seguimiento.',
      'KPIs de gestión: tiempos de resolución, comparativas de gasto y evolución por partidas.',
    ],
    image: '/images/services/administracion.png',
  },
  {
    id: 'contabilidad',
    title: 'Contabilidad y transparencia',
    summary: 'Cuentas claras y accesibles 24/7: previsiones, liquidaciones y control del gasto real.',
    body: [
      'Presupuestos anuales con escenarios (base, conservador, ambicioso).',
      'Cuotas, derramas y morosidad: emisión, seguimiento y recuperación amistosa.',
      'Informes trimestrales: ejecución vs presupuesto, gráficos y detalle por proveedor.',
    ],
    image: '/images/services/contabilidad.png',
  },
  {
    id: 'incidencias',
    title: 'Incidencias y mantenimiento',
    summary: 'Resolución ágil con control de calidad y trazabilidad de cada parte.',
    body: [
      'Canales 365 días: registro, priorización y notificación en cada cambio de estado.',
      'Mantenimiento correctivo y preventivo: checklist y revisiones periódicas.',
      'Comparativa de presupuestos y fotos “antes/después” en reparaciones relevantes.',
    ],
    image: '/images/services/incidencias.png',
  },
  {
    id: 'juntas',
    title: 'Juntas y comunicación',
    summary: 'Convocatorias claras, actas útiles y comunicación proactiva a propietarios.',
    body: [
      'Convocatoria y documentación previa: orden del día y anexos (presupuestos, informes).',
      'Actas accionables: acuerdos, responsables y fechas objetivo.',
      'Tablón digital, email y avisos en el portal para mantener informada a la comunidad.',
    ],
    image: '/images/services/juntas.png',
  },
  {
    id: 'juridico',
    title: 'Asesoría jurídica',
    summary: 'Prevención y respuesta en conflictos, estatutos y cumplimiento normativo.',
    body: [
      'Revisión de estatutos y normativa (seguridad, accesibilidad, protección de datos).',
      'Mediación y reclamaciones: ruta amistosa antes de la vía legal.',
      'Coordinación con abogados externos cuando procede.',
    ],
    image: '/images/services/juridico.webp',
  },
  {
    id: 'proveedores',
    title: 'Proveedores y contratos',
    summary: 'Selección objetiva, negociación y desempeño medido con indicadores.',
    body: [
      'RFP/RFQ y comparación homogénea de propuestas (precio, alcance, SLA).',
      'Negociación de condiciones: revisiones, cláusulas de salida y penalizaciones.',
      'Evaluación periódica y plan de mejora con cada proveedor clave.',
    ],
    image: '/images/services/proveedores.svg',
  },
  {
    id: 'obras',
    title: 'Obras y rehabilitación',
    summary: 'Proyectos con retorno: eficiencia, accesibilidad y revalorización del edificio.',
    body: [
      'Memoria técnica, licencias y coordinación de gremios.',
      'Subvenciones y financiación: asesoramiento y tramitación.',
      'Control de plazos, hitos de pago y cierre con documentación “as built”.',
    ],
    image: '/images/services/obras.webp',
  },
  {
    id: 'oficina-virtual',
    title: 'Oficina virtual y documentación',
    summary: 'Transparencia real: documentación y estados accesibles cuando los necesitas.',
    body: [
      'Portal 24/7: actas, liquidaciones, presupuestos y seguimientos.',
      'Notificaciones de novedades relevantes y archivo histórico ordenado.',
      'Exportación de datos y copias de seguridad periódicas.',
    ],
    image: '/images/services/oficina-virtual.webp',
  },
]

/* --------- Iconos (inline SVG, colores corporativos) --------- */
const ServiceIcon = defineComponent({
  name: 'ServiceIcon',
  props: { name: { type: String, required: true }, size: { type: Number, default: 24 } },
  setup(props) {
    return () => {
      const s = props.size
      const base = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' } as any
      switch (props.name) {
        case 'administracion': // clipboard
          return h('svg', base, [
            h('rect', { x: 4, y: 5, width: 16, height: 16, rx: 2 }),
            h('path', { d: 'M9 5V3h6v2' }),
            h('rect', { x: 9, y: 3, width: 6, height: 4, rx: 1 }),
          ])
        case 'contabilidad': // calculator
          return h('svg', base, [
            h('rect', { x: 4, y: 3, width: 16, height: 18, rx: 2 }),
            h('rect', { x: 8, y: 6, width: 8, height: 3, rx: 1 }),
            ...[ [8,11],[12,11],[16,11],[8,15],[12,15],[16,15] ].map(([x,y]) => h('rect', { x, y, width: 2, height: 2, rx: .5 })),
          ])
        case 'incidencias': // warning
          return h('svg', base, [
            h('path', { d: 'M12 3l10 18H2L12 3z' }),
            h('line', { x1: 12, y1: 9, x2: 12, y2: 14 }),
            h('circle', { cx: 12, cy: 17, r: 1 }),
          ])
        case 'juntas': // users
          return h('svg', base, [
            h('circle', { cx: 9, cy: 8, r: 3 }),
            h('circle', { cx: 15, cy: 9, r: 3 }),
            h('path', { d: 'M3 19a6 6 0 0 1 12 0' }),
            h('path', { d: 'M9 19a6 6 0 0 1 12 0' }),
          ])
        case 'juridico': // scales
          return h('svg', base, [
            h('path', { d: 'M12 3v4' }),
            h('path', { d: 'M5 7h14' }),
            h('path', { d: 'M7 7l-4 6h8l-4-6z' }),
            h('path', { d: 'M17 7l-4 6h8l-4-6z' }),
            h('path', { d: 'M12 13v8' }),
          ])
        case 'proveedores': // handshake simplificado
          return h('svg', base, [
            h('path', { d: 'M3 12l4-4 5 5 5-5 4 4' }),
            h('path', { d: 'M8 16l4-4' }),
            h('path', { d: 'M12 16l4-4' }),
          ])
        case 'obras': // hammer
          return h('svg', base, [
            h('rect', { x: 12, y: 3, width: 8, height: 4, rx: 1 }),
            h('path', { d: 'M12 7l-8 8' }),
            h('rect', { x: 3, y: 15, width: 2, height: 6, rx: .5 }),
          ])
        case 'oficina-virtual': // monitor
          return h('svg', base, [
            h('rect', { x: 3, y: 4, width: 18, height: 12, rx: 2 }),
            h('path', { d: 'M8 20h8M12 16v4' }),
          ])
        default:
          return h('svg', base, [ h('circle', { cx: 12, cy: 12, r: 9 }) ])
      }
    }
  }
})

/* --------- Router / estado --------- */
const route = useRoute()
const router = useRouter()

const activeId = ref<string | null>(null)
const openId   = ref<string | null>(null)

async function goTo(id: string) {
  openId.value = id
  await nextTick()
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top: y, behavior: 'smooth' })
  router.replace({ hash: `#${id}` })
}

onMounted(() => {
  const hash = (route.hash || '').replace('#', '')
  if (hash && SERVICES.some(s => s.id === hash)) {
    openId.value = hash
    setTimeout(() => goTo(hash), 50)
  } else {
    activeId.value = SERVICES[0].id
  }
  setupObserver()
})

onBeforeUnmount(() => { io?.disconnect() })

/* --------- Scroll-spy --------- */
let io: IntersectionObserver | null = null
function setupObserver() {
  io?.disconnect()
  io = new IntersectionObserver((entries) => {
    const vis = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0]
    const id = vis?.target?.id
    if (id) activeId.value = id
  }, { root: null, rootMargin: '-120px 0px -60% 0px', threshold: [0, .2, .5, 1] })
  SERVICES.forEach(s => {
    const el = document.getElementById(s.id)
    if (el) io!.observe(el)
  })
}

/* --------- Toggle + animación --------- */
function toggle(id: string) { openId.value = openId.value === id ? null : id }

function onEnter(el: Element) {
  const e = el as HTMLElement
  e.style.height = '0px'; e.style.opacity = '0'
  e.style.transition = 'height 260ms ease, opacity 200ms ease'
  requestAnimationFrame(() => { e.style.height = e.scrollHeight + 'px'; e.style.opacity = '1' })
}
function onAfterEnter(el: Element) { (el as HTMLElement).style.height = 'auto' }
function onLeave(el: Element) {
  const e = el as HTMLElement
  e.style.height = e.scrollHeight + 'px'; e.style.opacity = '1'
  e.style.transition = 'height 220ms ease, opacity 160ms ease'
  requestAnimationFrame(() => { e.style.height = '0px'; e.style.opacity = '0' })
}
</script>

<template>
  <main>
    <!-- Hero -->
    <section class="bg-neutral-50">
      <div class="container-default py-12 md:py-16">
        <h1 class="h-title text-4xl md:text-5xl font-bold">
          Nuestros <span class="text-[var(--color-brand-600)]">servicios</span>
        </h1>
        <p class="mt-3 max-w-3xl text-[var(--color-text)]/80">
          Gestión integral con foco en agilidad, ahorro y transparencia. Usa el índice o abre el detalle que necesites.
        </p>
      </div>
    </section>

    <!-- Contenido -->
    <section class="container-default py-10">
      <div class="grid gap-10 lg:grid-cols-[280px_1fr]">
        <!-- TOC -->
        <aside class="top-24 hidden self-start lg:sticky lg:block">
          <nav aria-label="Índice de servicios" class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
            <ul class="space-y-1">
              <li v-for="s in SERVICES" :key="s.id">
                <button
                    class="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition hover:bg-black/5"
                    :class="activeId===s.id ? 'text-[var(--color-brand-600)]' : 'text-[var(--color-text)]'"
                    @click="goTo(s.id)"
                >
                  <span class="flex items-center gap-2 truncate">
                    <span class="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[var(--color-accent-600)]/10 text-[var(--color-accent-600)]">
                      <ServiceIcon :name="s.id" :size="14" />
                    </span>
                    <span class="truncate">{{ s.title }}</span>
                  </span>
                  <span class="ml-3 h-1.5 w-1.5 rounded-full" :class="activeId===s.id ? 'bg-[var(--color-brand-600)]' : 'bg-[var(--color-border)]'"></span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        <!-- Bloques -->
        <div class="space-y-6">
          <section
              v-for="s in SERVICES"
              :id="s.id"
              :key="s.id"
              class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]"
          >
            <header class="flex items-start justify-between gap-4 p-5">
              <div class="flex items-start gap-3">
                <span class="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[var(--color-accent-600)]/10 text-[var(--color-accent-600)]">
                  <ServiceIcon :name="s.id" :size="20" />
                </span>
                <div>
                  <h2 class="text-xl font-semibold">{{ s.title }}</h2>
                  <p class="mt-1 text-[var(--color-text)]/70">{{ s.summary }}</p>
                </div>
              </div>

              <!-- Único botón: flecha (toggle) con colores corporativos -->
              <button
                  :aria-expanded="openId===s.id ? 'true' : 'false'"
                  :aria-controls="`panel-${s.id}`"
                  class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-600)] text-white transition hover:opacity-90"
                  @click="toggle(s.id)"
              >
                <svg viewBox="0 0 24 24" class="h-5 w-5 transition-transform" :class="openId===s.id ? 'rotate-180' : ''" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </header>

            <!-- Panel -->
            <transition @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
              <div v-show="openId===s.id" :id="`panel-${s.id}`" role="region" :aria-labelledby="s.id" class="overflow-hidden px-5 pb-6">
                <!-- Media + bullets -->
                <div class="grid items-center gap-6 md:grid-cols-2">
                  <ul class="order-2 md:order-1 grid gap-3">
                    <li v-for="(p,i) in s.body" :key="i" class="flex items-start gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3">
                      <span class="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[var(--color-accent-600)]/10 text-[var(--color-accent-600)]">
                        <svg viewBox="0 0 24 24" class="h-3.5 w-3.5"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </span>
                      <p class="text-[var(--color-text)]/80">{{ p }}</p>
                    </li>
                  </ul>

                  <figure class="order-1 md:order-2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
                    <div class="aspect-[4/3] w-full">
                      <picture>
                        <source :srcset="s.image" type="image/webp" />
                        <img :src="s.image" :alt="`Imagen de ${s.title}`" class="h-full w-full object-cover" loading="lazy" decoding="async" />
                      </picture>
                    </div>
                  </figure>
                </div>
              </div>
            </transition>
          </section>

          <!-- CTA final único -->
          <div class="pt-4">
            <router-link
                to="/presupuesto"
                class="inline-flex items-center gap-2 rounded-xl bg-[var(--color-brand-600)] px-5 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Solicitar presupuesto
              <svg viewBox="0 0 24 24" class="h-4 w-4" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* utilidades */
</style>
