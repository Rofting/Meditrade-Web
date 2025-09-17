<script setup lang="ts">
import { ref } from 'vue'
const BRAND_RED = '#E1353B'
const BASE = import.meta.env.BASE_URL || '/'

type Item = { title: string; content: string }
const items: Item[] = [
  { title: 'Gestión',
    content: 'Gestiones con proveedores, mantenimiento, seguros y comunidades vecinas, así como con entidades bancarias y organismos oficiales, conforme a los apartados a, c, d y f del Art. 20.' },
  { title: 'Informes',
    content: 'Informe Económico del Ejercicio: Balance, Detalle de Gastos, Listado por Conceptos, Reparto individual de Gastos y Saldos por Propiedad.' },
  { title: 'Servicios correspondientes',
    content: 'Servicios propios de las obligaciones del Administrador, de acuerdo con sus responsabilidades.' },
  { title: 'Entrega de Informe Económico',
    content: 'Entrega del Informe Económico a la Junta de Gobierno cuando se solicite.' },
  { title: 'Emisión y Gestión de cobro',
    content: 'Emisión y gestión de cobro de los recibos de cuotas comunitarias.' },
  { title: 'Presupuesto anual',
    content: 'Elaboración del presupuesto anual de gastos y seguimiento de los mismos.' },
  { title: 'Asistencia a Juntas',
    content: 'Asistencia, seguimiento de acuerdos y gestión de cobros impagados.' },
]

const open = ref<number | null>(0) // abre el primero por defecto
function toggle(i: number) { open.value = open.value === i ? null : i }
</script>

<template>
  <main :style="{ '--brand-red': BRAND_RED }">
    <!-- Hero pequeño -->
    <section class="relative overflow-hidden">
      <div class="container-default py-14 md:py-20">
        <h1 class="text-4xl md:text-5xl font-bold text-[var(--brand-red)]">Servicios</h1>
        <p class="mt-3 max-w-3xl text-neutral-600">
          Ofrecemos administración eficiente y completa para comunidades: gestión profesional y cumplimiento de todas las obligaciones legales.
        </p>
      </div>
    </section>

    <!-- Intro + icono exclamación -->
    <section class="container-default">
      <div class="grid gap-8 md:grid-cols-[auto_1fr] items-start">
        <img
            :src="`${BASE}images/exclamacion.png`"
            alt="Información importante"
            class="h-20 w-auto md:h-24"
        />
        <p class="text-neutral-700">
          Velamos por el buen régimen de la comunidad, instalaciones y servicios; atendemos conservación y urgencias;
          ejecutamos acuerdos de obras y gestionamos pagos/cobros; actuamos como secretaría cuando procede y
          custodiamos la documentación de la comunidad.
        </p>
      </div>
      <div class="mt-8 h-px w-full bg-neutral-200"></div>
    </section>

    <!-- Funciones del Administrador -->
    <section class="container-default py-12 md:py-16">
      <h2 class="text-2xl md:text-3xl font-bold">Funciones del Administrador</h2>
      <ul class="mt-6 grid gap-3 sm:grid-cols-2">
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
          <span>Buen régimen de la finca e instalaciones; advertencias y apercibimientos cuando proceda.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
          <span>Plan de gastos previsibles y propuesta de medios para afrontarlos.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
          <span>Conservación y mantenimiento; reparaciones urgentes con comunicación inmediata.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
          <span>Ejecución de acuerdos, pagos y cobros correspondientes.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
          <span>Secretaría de la Junta (cuando proceda) y custodia de documentación.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--brand-red)]"></span>
          <span>Otras atribuciones conferidas por la Junta.</span>
        </li>
      </ul>
    </section>

    <!-- Desplegables (Administración de fincas) -->
    <section class="container-default py-4 md:py-8">
      <h2 class="text-2xl md:text-3xl font-bold">Administración de fincas</h2>
      <div class="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
        <div
            v-for="(it, i) in items"
            :key="i"
            class="group"
        >
          <button
              class="flex w-full items-center justify-between px-5 py-4 text-left"
              @click="toggle(i)"
              :aria-expanded="open === i ? 'true' : 'false'"
          >
            <span class="font-medium">{{ it.title }}</span>
            <span
                class="ml-6 inline-flex h-7 w-7 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition group-hover:border-neutral-400"
            >
              <span class="block h-[2px] w-3 bg-current"></span>
              <span
                  class="block h-3 w-[2px] bg-current transition"
                  :class="open === i ? 'opacity-0 scale-y-0' : 'opacity-100'"
              ></span>
            </span>
          </button>
          <div v-show="open === i" class="px-5 pb-5 text-neutral-700">
            {{ it.content }}
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="container-default py-12">
      <a
          href="/presupuesto"
          class="inline-flex items-center justify-center rounded-xl bg-[var(--brand-red)] px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        PIDE TU PRESUPUESTO GRATIS
      </a>
    </section>

    <!-- Ahorro y tranquilidad -->
    <section class="container-default py-12 md:py-20">
      <h2 class="text-2xl md:text-3xl font-bold">Ahorro y tranquilidad para tu comunidad</h2>
      <p class="mt-3 max-w-3xl text-neutral-700">
        Dos pilares fundamentales de nuestra gestión. Transparencia, prevención y eficiencia para que todo funcione.
      </p>

      <div class="mt-8 grid gap-8 md:grid-cols-2">
        <!-- AHORRO -->
        <article class="rounded-2xl border border-neutral-200 bg-white p-6">
          <div class="flex items-center gap-4">
            <img :src="`${BASE}images/cerdo.png`" alt="Ahorro" class="h-12 w-auto" />
            <h3 class="text-xl font-semibold">Ahorro</h3>
          </div>
          <ul class="mt-4 space-y-2 text-neutral-700">
            <li><span class="font-medium">Optimización de presupuestos:</span> análisis detallado de ingresos y gastos.</li>
            <li><span class="font-medium">Negociación con proveedores:</span> mejor precio sin perder calidad.</li>
            <li><span class="font-medium">Control de gastos:</span> ajuste periódico de contratos.</li>
            <li><span class="font-medium">Ahorro energético:</span> propuestas de eficiencia para reducir costes.</li>
          </ul>
        </article>

        <!-- TRANQUILIDAD -->
        <article class="rounded-2xl border border-neutral-200 bg-white p-6">
          <div class="flex items-center gap-4">
            <img :src="`${BASE}images/buda.png`" alt="Tranquilidad" class="h-12 w-auto" />
            <h3 class="text-xl font-semibold">Tranquilidad</h3>
          </div>
          <ul class="mt-4 space-y-2 text-neutral-700">
            <li><span class="font-medium">Gestión transparente:</span> acceso online a contabilidad e informes.</li>
            <li><span class="font-medium">Prevención de problemas:</span> mantenimiento preventivo.</li>
            <li><span class="font-medium">Solución de conflictos:</span> actuación rápida y discreta.</li>
            <li><span class="font-medium">Seguridad jurídica:</span> cumplimiento normativo total.</li>
          </ul>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* sin css extra */
</style>
