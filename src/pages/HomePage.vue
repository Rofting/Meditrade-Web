<!-- src/pages/HomePage.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSlider from '../components/HeroSlider.vue'
import ServicesSection from '../components/ServicesSection.vue'
import AboutUsSection from '../components/AboutUsSection.vue'
import WhyUsSection from '../components/WhyUsSection.vue'
import VideoSection from '../components/VideoSection.vue'
import CallToActionSection from '../components/CallToActionSection.vue'
import { preloadImage } from '@/utils/preload'

// Copys por slide (1:1 con las imágenes del slider)
const copies = [
  {
    pre: 'Gestión de comunidades con',
    hl: 'claridad y servicio',
    sub: 'Administración de fincas en Zaragoza: agilidad, transparencia y cercanía.',
  },
  {
    pre: 'Mantenimiento y contratos con',
    hl: 'control y ahorro',
    sub: 'Negociamos con proveedores, controlamos gastos y resolvemos incidencias.',
  },
  {
    pre: 'Portal de propietarios con',
    hl: 'transparencia 24/7',
    sub: 'Actas, recibos y comunicación clara en un solo lugar.',
  },
]
const current = ref(0)

onMounted(() => {
  // Precarga la primera imagen (ajusta si tu primer slide es otro)
  preloadImage('/images/edificio4.webp', 'high')
})
</script>

<template>
  <!-- Hero -->
  <section class="relative min-h-[80dvh] flex items-center overflow-hidden">
    <HeroSlider @change="i => current = i" />

    <!-- Overlay: oscurece el lado derecho para leer mejor -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/65 via-black/20 to-transparent z-10"></div>

    <!-- TEXTO a la DERECHA casi pegado al borde -->
    <!-- OJO: NO usamos .container-default para poder llegar al borde de la ventana -->
    <div class="relative z-10 w-full px-0">
      <div class="flex justify-end">
        <div
            class="w-full max-w-[56rem] text-right
                 pr-3 sm:pr-5 md:pr-8 lg:pr-12 xl:pr-16 2xl:pr-20
                 mr-0
                 "
            v-reveal="'left'"
        >
          <Transition name="copy" mode="out-in">
            <div :key="current">
              <h1 class="text-4xl/tight md:text-5xl font-bold text-white">
                {{ copies[current].pre }}
                <span class="text-[var(--color-brand-600)]">{{ copies[current].hl }}</span>
              </h1>
              <p class="mt-4 text-white/90">
                {{ copies[current].sub }}
              </p>

              <div class="mt-6 flex justify-end gap-3">
                <a
                    v-prefetch="'/presupuesto'"
                    href="/presupuesto"
                    class="rounded-xl bg-[var(--color-brand-600)] px-5 py-3 font-semibold text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-600)]"
                >
                  Solicitar presupuesto
                </a>
                <a
                    v-prefetch="'/services'"
                    href="/services"
                    class="rounded-xl border border-white/30 px-5 py-3 font-semibold text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-600)]"
                >
                  Ver servicios
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>

  <!-- Resto de secciones -->
  <div id="servicios" class="py-20 md:py-28">
    <div class="container-default" v-reveal>
      <ServicesSection />
    </div>
  </div>

  <div id="nosotros" class="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900/40">
    <div class="container-default" v-reveal="'up'">
      <AboutUsSection />
    </div>
  </div>

  <div id="por-que" class="py-20 md:py-28">
    <div class="container-default reveal-stagger">
      <div v-reveal="'right'">
        <WhyUsSection />
      </div>
    </div>
  </div>

  <div class="py-20 md:py-28 bg-neutral-50 dark:bg-neutral-900/40">
    <div class="container-default" v-reveal="'up'">
      <VideoSection />
    </div>
  </div>

  <div id="contacto" class="py-20 md:py-28">
    <div class="container-default" v-reveal>
      <CallToActionSection />
    </div>
  </div>
</template>

<style scoped>
/* Transición del bloque de copy (fade + slide) */
.copy-enter-active { transition: opacity .45s cubic-bezier(.2,.7,.3,1), transform .45s cubic-bezier(.2,.7,.3,1); }
.copy-leave-active { transition: opacity .35s ease, transform .35s ease; }
.copy-enter-from   { opacity: 0; transform: translateX(24px) scale(.98); }
.copy-leave-to     { opacity: 0; transform: translateX(-8px) scale(.98); }
</style>
