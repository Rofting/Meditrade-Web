<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, EffectFade, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const modules = [Pagination, Autoplay, EffectFade, A11y]
const BASE = import.meta.env.BASE_URL || '/'

// color de marca (rojo)
const BRAND_RED = '#E1353B'

// Slides (cambia textos si quieres)
const slides = [
  {
    src: `${BASE}images/edificio4.webp`,
    alt: 'Comunidad de propietarios',
    title: 'Administración de fincas sin complicaciones',
    text: 'Gestión integral, cuentas claras y respuesta rápida para tu comunidad.',
    cta: { label: 'Ver servicios', to: '/services' },
  },
  {
    src: `${BASE}images/escritorio1.webp`,
    alt: 'Gestión y mantenimiento',
    title: 'Mantenimiento y proveedores, bajo control',
    text: 'Negociamos contratos, controlamos gastos y resolvemos incidencias.',
    cta: { label: 'Pedir presupuesto', to: '/presupuesto' },
  },
  {
    src: `${BASE}images/edificio2.1.webp`,
    alt: 'Junta de propietarios',
    title: 'Transparencia en cada decisión',
    text: 'Informes claros y comunicación directa con la administración.',
    cta: { label: 'Contactar', to: '/#contacto' },
  },
]

// reduce motion
const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
const autoplay = prefersReduced ? false : { delay: 5000, disableOnInteraction: false }
const effect = 'fade'

function go(to: string) {
  if (to.startsWith('/#')) {
    const id = to.split('#')[1]
    history.replaceState(null, '', `#${id}`)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.location.href = to
  }
}
</script>

<template>
  <div class="absolute inset-0 z-0 w-full h-full" :style="{ '--brand-red': BRAND_RED }">
    <Swiper
        :modules="modules"
        :loop="true"
        :pagination="{ clickable: true }"
        :a11y="{ enabled: true }"
        :autoplay="autoplay"
        :effect="effect"
        class="w-full h-full"
    >
      <SwiperSlide v-for="(s, i) in slides" :key="i">
        <div class="relative w-full h-full">
          <img :src="s.src" :alt="s.alt" class="w-full h-full object-cover" loading="eager" decoding="async" />

          <div class="pointer-events-none absolute inset-0">
            <!-- aclarado lateral derecho ocupando 50% -->
            <div class="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-white/75 via-white/25 to-transparent"></div>
            <!-- sombreado inferior suave -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>

          <div class="absolute inset-0 z-20">
            <div class="container-default h-full">
              <div class="flex h-full items-center justify-end">
                <div
                    class="w-full text-center md:text-right
               md:w-8/12 lg:w-7/12 xl:w-6/12 2xl:w-5/12
               pr-0 md:pr-0 xl:mr-[-24px] 2xl:mr-[-56px]"
                >
                  <h2 class="text-3xl md:text-5xl font-bold leading-tight text-[var(--brand-red)]">
                    {{ s.title }}
                  </h2>
                  <p class="mt-4 text-base md:text-lg text-neutral-800 md:text-neutral-900/80">
                    {{ s.text }}
                  </p>
                  <div class="mt-6 flex gap-3 justify-center md:justify-end">
                    <button
                        v-if="s.cta"
                        @click="go(s.cta.to)"
                        class="rounded-xl bg-[var(--brand-red)] px-5 py-3 font-semibold text-white hover:opacity-90 transition"
                    >
                      {{ s.cta.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
:global(.swiper-pagination-bullet){ width:10px; height:10px; opacity:.5; }
:global(.swiper-pagination-bullet-active){ opacity:1; }
</style>
