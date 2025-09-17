<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const BRAND_RED = '#E1353B'
const BASE = import.meta.env.BASE_URL || '/'

// Enlaces oficiales (de tu HTML anterior)
const PLAY_URL   = 'https://play.google.com/store/apps/details?id=com.iesa.tuComunidadVecinos&pcampaignid=web_share'
const APPLE_URL  = 'https://apps.apple.com/es/app/tucomunidapp/id1485583697'

// Si tienes portal propio para vecinos, pon aquí el URL:
const PORTAL_LOGIN_URL = ''     // p.ej.: 'https://tuportal.com/login'
const PORTAL_SIGNUP_URL = ''    // p.ej.: 'https://tuportal.com/signup'

// FAQ (del HTML anterior, modernizado a acordeón)
type Faq = { q: string; a: string; toContact?: boolean }
const faqs: Faq[] = [
  {
    q: '¿Qué hace un administrador de fincas?',
    a: 'Se encarga de gestionar el buen régimen de la comunidad: contratos y arrendamientos, reparaciones, control de gastos, y asesoramiento en decisiones y desarrollo de la propiedad.',
  },
  {
    q: '¿Qué gastos están incluidos en las cuotas?',
    a: 'Suelen cubrir mantenimiento de zonas comunes, limpieza, suministros (agua, luz de comunidad), seguros y aportaciones a fondos, entre otros.',
  },
  {
    q: '¿Qué sucede si quiero hacer reformas en mi vivienda?',
    a: 'Si afectan a elementos comunes, deberás solicitar autorización a la comunidad y, en su caso, presentar proyecto.',
  },
  {
    q: '¿Cómo gestiono las quejas o incidencias?',
    a: 'Usa los canales establecidos (plataforma y contacto directo). Para incidencias urgentes o consultas, escríbenos desde la sección de contacto.',
    toContact: true,
  },
]
const open = ref<number | null>(0)
const toggle = (i: number) => (open.value = open.value === i ? null : i)
</script>

<template>
  <main :style="{ '--brand-red': BRAND_RED }">
    <!-- Hero -->
    <section class="bg-neutral-50">
      <div class="container-default py-12 md:py-16">
        <h1 class="text-4xl md:text-5xl font-bold text-[var(--brand-red)]">Propietarios</h1>
        <p class="mt-3 max-w-3xl text-neutral-700">
          Comunicación ágil entre administradores y vecinos a través de la plataforma <strong>TUCOMUNIDAD</strong>
          y un apartado de <strong>preguntas frecuentes</strong> para resolver tus dudas habituales.
        </p>
      </div>
    </section>

    <!-- Intro -->
    <section class="container-default">
      <div class="grid gap-8 md:grid-cols-[auto_1fr] items-start">
        <img :src="`${BASE}images/exclamacion.webp`" alt="" class="h-20 w-auto md:h-24" />
        <p class="text-neutral-700">
          La oficina virtual está disponible las 24h (también festivos). Desde allí puedes avisar de cambios de
          domiciliación, enviar mensajes privados o reportar incidencias. Publicamos convocatorias, actas y liquidaciones,
          y podrás consultar el estado de tus recibos y saldo.
        </p>
      </div>
      <div class="mt-8 h-px w-full bg-neutral-200"></div>
    </section>

    <!-- Descarga App -->
    <section class="container-default py-12 md:py-16">
      <h2 class="text-2xl md:text-3xl font-bold">Descargar la App</h2>
      <p class="mt-3 text-neutral-700">Accede a TUCOMUNIDAD desde tu móvil.</p>

      <div class="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <!-- Botones descarga + QR -->
        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-4">
              <img :src="`${BASE}images/google-play.webp`" alt="Google Play" class="h-10 w-auto" />
              <a :href="PLAY_URL" target="_blank" rel="noopener" class="rounded-xl bg-[var(--brand-red)] px-4 py-2 text-white font-semibold hover:opacity-90">
                Descargar en Google&nbsp;Play
              </a>
            </div>
            <img :src="`${BASE}images/qr-android.webp`" alt="QR Android" class="mt-4 h-28 w-auto" />
          </div>

          <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div class="flex items-center gap-4">
              <img :src="`${BASE}images/apple.webp`" alt="App Store" class="h-10 w-auto" />
              <a :href="APPLE_URL" target="_blank" rel="noopener" class="rounded-xl bg-[var(--brand-red)] px-4 py-2 text-white font-semibold hover:opacity-90">
                Descargar en App&nbsp;Store
              </a>
            </div>
            <img :src="`${BASE}images/qr-apple.webp`" alt="QR Apple" class="mt-4 h-28 w-auto" />
          </div>
        </div>

        <!-- Mockup teléfono -->
        <div class="flex justify-center">
          <img :src="`${BASE}images/telefono1.webp`" alt="App en el teléfono" class="max-w-xs w-full" />
        </div>
      </div>
    </section>

    <!-- Acceso al portal -->
    <section class="container-default py-6 md:py-10">
      <div class="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div class="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
          <img :src="`${BASE}images/ordenador.webp`" alt="" class="h-24 w-auto" />
          <div>
            <h3 class="text-xl font-semibold">Iniciar sesión o registrarse</h3>
            <p class="mt-2 text-neutral-700">Si aún no tienes clave de acceso, solicítala. Si ya la tienes, entra al portal.</p>
            <div class="mt-4 flex flex-wrap gap-3">
              <a
                  :href="PORTAL_LOGIN_URL || '#'"
                  :class="['rounded-xl px-4 py-2 font-semibold transition',
                         PORTAL_LOGIN_URL ? 'bg-neutral-900 text-white hover:opacity-90' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed']"
                  target="_blank" rel="noopener"
              >
                Iniciar sesión
              </a>
              <a
                  :href="PORTAL_SIGNUP_URL || '#'"
                  :class="['rounded-xl px-4 py-2 font-semibold transition',
                         PORTAL_SIGNUP_URL ? 'border border-neutral-300 hover:bg-neutral-50' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed']"
                  target="_blank" rel="noopener"
              >
                Registrarse
              </a>
              <RouterLink to="/contact" class="rounded-xl border border-neutral-300 px-4 py-2 font-semibold hover:bg-neutral-50">
                Solicitar acceso
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="container-default py-12 md:py-16">
      <h2 class="text-2xl md:text-3xl font-bold">Preguntas frecuentes</h2>
      <div class="mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
        <div v-for="(f, i) in faqs" :key="i" class="group">
          <button
              class="flex w-full items-center justify-between px-5 py-4 text-left"
              @click="toggle(i)"
              :aria-expanded="open === i ? 'true' : 'false'"
          >
            <div class="flex items-center gap-3">
              <img :src="`${BASE}images/interrogacion.webp`" alt="" class="h-6 w-6" />
              <span class="font-medium">{{ f.q }}</span>
            </div>
            <span class="ml-6 inline-flex h-7 w-7 items-center justify-center rounded-md border border-neutral-300 text-neutral-600 transition group-hover:border-neutral-400">
              <span class="block h-[2px] w-3 bg-current"></span>
              <span class="block h-3 w-[2px] bg-current transition" :class="open === i ? 'opacity-0 scale-y-0' : 'opacity-100'"></span>
            </span>
          </button>
          <div v-show="open === i" class="px-5 pb-5 text-neutral-700">
            <p>{{ f.a }}</p>
            <div v-if="f.toContact" class="mt-3">
              <RouterLink to="/contact" class="inline-flex items-center rounded-xl bg-[var(--brand-red)] px-4 py-2 text-white font-semibold hover:opacity-90">
                Gestión de incidencias
              </RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 text-center">
        <RouterLink to="/contact" class="inline-flex items-center rounded-xl border border-neutral-300 px-5 py-3 font-semibold hover:bg-neutral-50">
          Otras preguntas
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* sin css extra */
</style>
