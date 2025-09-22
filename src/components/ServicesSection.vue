<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { defineComponent, h } from 'vue'

type Card = { id: string; title: string; text: string }

const CARDS: Card[] = [
  { id: 'administracion',   title: 'Administración integral',          text: 'Gestión global con un único interlocutor.' },
  { id: 'contabilidad',     title: 'Contabilidad y transparencia',      text: 'Previsiones, liquidaciones y control del gasto.' },
  { id: 'incidencias',      title: 'Incidencias y mantenimiento',       text: 'Registro, prioridad y resolución con trazabilidad.' },
  { id: 'juntas',           title: 'Juntas y comunicación',             text: 'Convocatorias claras y actas accionables.' },
  { id: 'juridico',         title: 'Asesoría jurídica',                 text: 'Prevención de conflictos y normativa.' },
  { id: 'proveedores',      title: 'Proveedores y contratos',           text: 'Selección objetiva, negociación y KPIs.' },
  { id: 'obras',            title: 'Obras y rehabilitación',            text: 'Eficiencia, accesibilidad y revalorización.' },
  { id: 'oficina-virtual',  title: 'Oficina virtual y documentación',   text: 'Transparencia real 24/7.' },
]

/* Iconos mini (mismo set que en la página) */
const MiniIcon = defineComponent({
  name: 'MiniIcon',
  props: { name: { type: String, required: true }, size: { type: Number, default: 16 } },
  setup(props) {
    const s = props.size
    const base = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' } as any
    return () => {
      switch (props.name) {
        case 'administracion': return h('svg', base, [ h('rect',{x:4,y:5,width:16,height:16,rx:2}), h('path',{d:'M9 5V3h6v2'}), h('rect',{x:9,y:3,width:6,height:4,rx:1}) ])
        case 'contabilidad':   return h('svg', base, [ h('rect',{x:4,y:3,width:16,height:18,rx:2}), h('rect',{x:8,y:6,width:8,height:3,rx:1}), ...[[8,11],[12,11],[16,11],[8,15],[12,15],[16,15]].map(([x,y])=>h('rect',{x,y,width:2,height:2,rx:.5})) ])
        case 'incidencias':    return h('svg', base, [ h('path',{d:'M12 3l10 18H2L12 3z'}), h('line',{x1:12,y1:9,x2:12,y2:14}), h('circle',{cx:12,cy:17,r:1}) ])
        case 'juntas':         return h('svg', base, [ h('circle',{cx:9,cy:8,r:3}), h('circle',{cx:15,cy:9,r:3}), h('path',{d:'M3 19a6 6 0 0 1 12 0'}), h('path',{d:'M9 19a6 6 0 0 1 12 0'}) ])
        case 'juridico':       return h('svg', base, [ h('path',{d:'M12 3v4'}), h('path',{d:'M5 7h14'}), h('path',{d:'M7 7l-4 6h8l-4-6z'}), h('path',{d:'M17 7l-4 6h8l-4-6z'}), h('path',{d:'M12 13v8'}) ])
        case 'proveedores':    return h('svg', base, [ h('path',{d:'M3 12l4-4 5 5 5-5 4 4'}), h('path',{d:'M8 16l4-4'}), h('path',{d:'M12 16l4-4'}) ])
        case 'obras':          return h('svg', base, [ h('rect',{x:12,y:3,width:8,height:4,rx:1}), h('path',{d:'M12 7l-8 8'}), h('rect',{x:3,y:15,width:2,height:6,rx:.5}) ])
        case 'oficina-virtual':return h('svg', base, [ h('rect',{x:3,y:4,width:18,height:12,rx:2}), h('path',{d:'M8 20h8M12 16v4'}) ])
        default:               return h('svg', base, [ h('circle',{cx:12,cy:12,r:9}) ])
      }
    }
  }
})
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="container-default">
      <header class="max-w-3xl">
        <h2 class="h-title text-3xl md:text-4xl font-bold">Servicios</h2>
        <p class="mt-3 text-[var(--color-text)]/80">Soluciones reales para comunidades de propietarios en Zaragoza.</p>
      </header>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
            v-for="c in CARDS"
            :key="c.id"
            :to="{ path: '/services', hash: '#' + c.id }"
            class="group card block rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-600)]"
        >
          <div class="flex items-start gap-3">
            <span class="inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[var(--color-accent-600)]/10 text-[var(--color-accent-600)]">
              <MiniIcon :name="c.id" :size="20" />
            </span>
            <div>
              <h3 class="text-lg font-semibold">{{ c.title }}</h3>
              <p class="mt-1 text-[var(--color-text)]/70">{{ c.text }}</p>
              <span
                  class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-600)] group-hover:underline"
              >
                Ver más detalles
                <svg viewBox="0 0 24 24" class="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* utilidades */
</style>

