<script setup lang="ts">
import { useScrollAnimation } from '../composables/useScrollAnimation'

// Colores de marca (CSS vars para Tailwind)
const BRAND_RED = '#E1353B'
const BASE = import.meta.env.BASE_URL || '/'

const services = [
  {
    title: 'Gestión',
    desc: 'Proveedores, mantenimiento, seguros, bancos y organismos oficiales (Art. 20).',
    icon: '🧭',
  },
  {
    title: 'Informes',
    desc: 'Balance, detalle de gastos, conceptos y saldos por propiedad.',
    icon: '📊',
  },
  {
    title: 'Servicios correspondientes',
    desc: 'Todos los servicios propios de las obligaciones del Administrador.',
    icon: '🧩',
  },
  {
    title: 'Informe económico a Junta',
    desc: 'Entrega del Informe Económico a la Junta cuando lo solicite.',
    icon: '📑',
  },
  {
    title: 'Emisión y cobro de recibos',
    desc: 'Gestión completa de cuotas comunitarias.',
    icon: '💳',
  },
  {
    title: 'Presupuesto anual',
    desc: 'Elaboración y seguimiento del presupuesto de gastos.',
    icon: '🗓️',
  },
  {
    title: 'Asistencia a Juntas',
    desc: 'Soporte a reuniones y acuerdos de la comunidad.',
    icon: '🤝',
  },
  {
    title: 'Conservación y urgencias',
    desc: 'Medidas y reparaciones urgentes, con comunicación inmediata.',
    icon: '🛠️',
  },
]
const { target, animationClasses } = useScrollAnimation({ threshold: 0.15 })
</script>

<template>
  <section ref="target" class="container-default" :style="{ '--brand-red': BRAND_RED }">
    <header class="max-w-2xl">
      <h2 class="text-3xl md:text-4xl font-bold text-[var(--brand-red)]">Servicios</h2>
      <p class="mt-3 text-neutral-600">
        Administración eficiente y transparente para comunidades. Gestión integral y cumplimiento legal.
      </p>
    </header>

    <div :class="['mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3', animationClasses]">
      <article
          v-for="(s, i) in services"
          :key="i"
          class="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md"
      >
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-red)]/10 text-[var(--brand-red)] text-xl">
          <span aria-hidden="true">{{ s.icon }}</span>
        </div>
        <h3 class="mt-4 font-semibold text-neutral-900">{{ s.title }}</h3>
        <p class="mt-2 text-sm text-neutral-600">{{ s.desc }}</p>
        <RouterLink to="/services" class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-red)]">
          Ver detalles
          <svg viewBox="0 0 24 24" class="h-4 w-4" style="fill: currentColor" aria-hidden="true">
            <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
          </svg>
        </RouterLink>
      </article>
    </div>
  </section>
</template>

<style scoped>
/* sin css extra */
</style>
